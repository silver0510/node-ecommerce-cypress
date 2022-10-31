describe('Sign Up', () => {
  var signUpURL = '/user/signup'
  beforeEach(function () {
    cy.fixture('signUp.json').as('signUpData')
  })
  beforeEach(function () {
    cy.visit(signUpURL)
  })
  context('Required fields', () => {
    it('Check the required fields by not filling any data', function () {
      cy.get('h1').should('contain', 'Sign Up Page')
      cy.get('[type="submit"]').click()
      cy.contains('Name is required')
      cy.getByID('name').type(this.signUpData.name)
      cy.get('[type="submit"]').click()
      cy.contains('Invalid email')
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.validEmails[0])
      cy.get('[type="submit"]').click()
      cy.contains("Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 32 char long")

    })
    it('Check user should Register by filling all the required fields', function () {
      cy.task('signup:prepare', this.signUpData.validEmails[0])
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.validEmails[0])
      cy.getByID('password').type(this.signUpData.password)
      cy.getByID('password2').type(this.signUpData.password)
      cy.get('[type="submit"]').click()
      cy.get('.dropdown-toggle').should('contain', this.signUpData.name)
    })
  })

  context('Email validation', () => {
    it('Check the Email text field that has an Email address without @ symbol.', function () {
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.wrongEmails[0])
    })
    it('Check the Email text field that has a random string instead of a real email.', function () {
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.wrongEmails[1])
    })
    it('Check the Email text field that has @ symbol written in words. ', function () {
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.wrongEmails[2])
    })
    it('Check the Email text field that has a missing dot in the email address.', function () {
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.wrongEmails[3])
    })

    it('Check the valid emails', function () {
      this.signUpData.validEmails.forEach(validEmail => {
        cy.getByID('name').type(this.signUpData.name)
        cy.getByID('email').type(validEmail)
        cy.get('[type="submit"]').click()
        cy.contains('Invalid email').should('not.exist')
      });
    })
  })

  context('Password validation', () => {
    beforeEach(function () {
      cy.task('signup:prepare', this.signUpData.validEmails[0])
    })
    function checkPassword(signUpData, wrongPassword) {
      cy.getByID('name').type(signUpData.name)
      cy.getByID('email').type(signUpData.validEmails[0])
      cy.getByID('password').type(wrongPassword)
      cy.getByID('password2').type(wrongPassword)
      cy.get('[type="submit"]').click()
      cy.contains('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 32 char long')
    }
    it('Check the password limit when enter value less than min', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[0])
    })
    it('Check the password limit when enter value greater than max', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[1])
    })
    it('Check the password when passing without number', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[2])
    })
    it('Check the password when passing without letter', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[3])
    })
    it('Check the password when passing without special character', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[4])
    })
    it('Check the password when passing without lower case', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[5])
    })
    it('Check the password when passing without upper case', function () {
      checkPassword(this.signUpData, this.signUpData.wrongPasswords[6])
    })
    it('Check the password and confirm password is not match', function () {
      cy.getByID('name').type(this.signUpData.name)
      cy.getByID('email').type(this.signUpData.validEmails[0])
      cy.getByID('password').type(this.signUpData.password)
      cy.getByID('password2').type(this.signUpData.password + 'notmatch')
      cy.get('[type="submit"]').click()
      cy.contains('Passwords must match')
    })
  })
})