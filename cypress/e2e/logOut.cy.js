describe('Sign In', () => {
  before(function () {
    cy.fixture('signIn.json').as('signInData').then(signInData => {
      cy.task('makeTestAccount', signInData)
    })
  })

  context('User log out', () => {
    it('Check the log out feature', function () {
      cy.login(this.signInData.email, this.signInData.password)
      cy.get('.dropdown-toggle').click()
      cy.get('[href="/user/logout"]').click()
      cy.contains('Sign In')
    })
  })
})