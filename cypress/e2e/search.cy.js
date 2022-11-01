describe('Sign In', () => {
  before(function () {
    cy.fixture('search.json').as('searchData')
  })

  beforeEach(function () {
    cy.visit('/')
  })
  context('Show search results', () => {
    it('The search result is empty', function () {
      cy.get('[name="search"]').type(this.searchData.noResult + '{enter}')
      cy.contains('Add to Shopping Cart').should('not.exist')
    })
    it('The search result page number is only 1', function () {
      cy.get('[name="search"]').type(this.searchData.onlyOnePage + '{enter}')
      cy.get('.page-item').should('have.length', 3)
    })
    it('The search result page number is more than 1', function () {
      cy.get('[name="search"]').type(this.searchData.moreThanOnePage + '{enter}')
      cy.get('.page-item').should('have.length.above', 3)
    })
  })

  context.only('User search', function () {
    it('Check the name of product and the search keyword', function () {
      cy.get('[name="search"]').type(this.searchData.checkKey + '{enter}')
      cy.get('.mt-2.mb-2').each(($title, index, $lis) => {
        cy.wrap($title).contains(this.searchData.checkKey)
      })
    })
  })
})