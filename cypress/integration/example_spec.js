describe('Cypress.Promise.all', () => {
  it('works with values', () => {
    Cypress.Promise.all([
      Promise.resolve('a'),
      Promise.resolve('b')
    ]).then(([a, b]) => {
      expect(a).to.equal('a')
      expect(b).to.equal('b')
    })
  })

  it('spreads resolved values', () => {
    Cypress.Promise.all([
      Promise.resolve('a'),
      Promise.resolve('b')
    ]).spread((a, b) => {
      expect(a).to.equal('a')
      expect(b).to.equal('b')
    })
  })

  it('grabs element values', () => {
    cy.visit('https://example.cypress.io/')

    const getNavCommands = () =>
      cy.get('ul.nav')
        .contains('Commands')

    const getNavUtilities = () =>
      cy.get('ul.nav')
        .contains('Utilities')

    // each works by itself
    getNavCommands()
      .should('be.visible')

    getNavUtilities()
      .should('be.visible')

    // lets get both elements
    Cypress.Promise.all([
      getNavCommands(),
      getNavUtilities()
    ]).then(([commands, utilities]) => {
      console.log('got commands', commands.text())
      console.log('got utilities', utilities.text())
      // debugger
      expect(utilities.text()).to.equal('Utilities')
      expect(commands.text()).to.equal('Commands')
    })
  })
})
