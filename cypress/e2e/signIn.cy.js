describe('Sign In', () => {
  var signInURL = '/user/signin'
  before(function () {
    cy.fixture('signIn.json').as('signInData').then(signInData => {
      cy.task('makeTestAccount', signInData)
    })
  })

  beforeEach(function () {
    cy.visit(signInURL)
  })
  context('Required fields', () => {
    it('Check the required fields by not filling any data', function () {
      cy.get('h1').should('contain', 'Sign In Page')
      cy.get('[type="submit"]').click()
      cy.contains('Invalid email')
      cy.getByID('email').type(this.signInData.email)
      cy.get('[type="submit"]').click()
      cy.contains('Invalid password')
    })
  })
  context('User Login', () => {
    it('Check the sign in feature when the email is not correct', function () {
      cy.getByID('email').type('123_' + this.signInData.email)
      cy.getByID('password').type(this.signInData.password)
      cy.get('[type="submit"]').click()
      cy.contains("User doesn't exist")
    })
    it('Check When passing a correct email and invalid password', function () {
      cy.getByID('email').type(this.signInData.email)
      cy.getByID('password').type(this.signInData.password + '_123')
      cy.get('[type="submit"]').click()
      cy.contains("Wrong password")
    })
    it('Check when pass correct email and password', function () {
      cy.getByID('email').type(this.signInData.email)
      cy.getByID('password').type(this.signInData.password)
      cy.get('[type="submit"]').click()
      cy.contains("Test User")
    })
  })

})