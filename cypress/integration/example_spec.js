describe('Cypress.Promise.all', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/')
  })

  it('works with values', () => {
    return Cypress.Promise.all([
      Promise.resolve('a'),
      Promise.resolve('b')
    ]).then(([a, b]) => {
      expect(a).to.equal('a')
      expect(b).to.equal('b')
    })
  })

  it('spreads resolved values', () => {
    return Cypress.Promise.all([
      Promise.resolve('a'),
      Promise.resolve('b')
    ]).spread((a, b) => {
      expect(a).to.equal('a')
      expect(b).to.equal('b')
    })
  })

  const getNavCommands = () =>
    cy.get('ul.nav')
      .contains('Commands')

  const getNavUtilities = () =>
    cy.get('ul.nav')
      .contains('Utilities')

  it('grabs element values', () => {
    // each works by itself
    getNavCommands()
      .should('be.visible')

    getNavUtilities()
      .should('be.visible')

    // lets get both elements
    return all(
      getNavCommands,
      getNavUtilities
    ).then(([commands, utilities]) => {
      console.log('got commands', commands.text())
      console.log('got utilities', utilities.text())
      // debugger
      expect(utilities.text().trim()).to.equal('Utilities')
      expect(commands.text().trim()).to.equal('Commands')
    })
  })

  const all = (...fns) => {
    const results = []

    // maybe handle a case when it is a plain value
    // and just push it directly into the results
    fns.reduce((prev, fn) => {
      fn().then(result => results.push(result))
      return results
    }, results)

    return cy.wrap(results)
  }

  it('wraps multiple cypress commands', () => {
    return all(
      getNavCommands,
      getNavUtilities
    ).spread((commands, utilities) => {
      console.log('got commands', commands.text())
      console.log('got utilities', utilities.text())
    })
  })
})
