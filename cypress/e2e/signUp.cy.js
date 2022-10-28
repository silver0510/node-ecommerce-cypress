describe('Sign Up', () => {
  var signUpURL = '/user/signup'
  beforeEach(() => {
    cy.visit(signUpURL)
    cy.fixture('signUp.json').as('signUpData')
  })
  context('Required fields', () => {
    it('Check the required fields by not filling any data', function () {
      cy.get('h1').should('contain', 'Sign Up Page')
      cy.get('[type="submit"]').click()
      cy.contains('Please fill out this field.').should('exist')
    })
    it('Check user should Register by filling all the required fields', function () {
      cy.task('signup:prepare', this.signUpData.email)
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.email)
      cy.getByID('password').type(this.signUpData.password)
      cy.getByID('password2').type(this.signUpData.password)
      cy.get('[type="submit"]').click()
      cy.get('.dropdown-toggle').should('contain', this.signUpData.name)
    })
  })
})