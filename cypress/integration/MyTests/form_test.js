describe('forms tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const usernameInput = () => cy.get('input[name=username]')
  const emailInput = () => cy.get('input[name=email]')
  const passwordInput = () => cy.get('input[name=password]')
  const passwordConfInput = () => cy.get('input[name=passwordConf]')
  const tosButton = () => cy.get('input[name=TOS]')
  const submitButton = () => cy.get('button[type=submit]')

  const usernameErr = () => cy.get('.username')
  const emailErr = () => cy.get('.email')
  const passwordErr = () => cy.get('.password')
  const passwordConfErr = () => cy.get('.passwordConf')
  const tosErr = () => cy.get('.TOS')
  
  it('sanity check ig', () => {
    expect(1 + 1).to.equal(2)
  })

  it('check if correct elements are present', () => {
    usernameInput().should('exist')
    emailInput().should('exist')
    passwordInput().should('exist')
    passwordConfInput().should('exist')
    tosButton().should('exist')
    submitButton().should('exist')
    
    usernameErr().should('not.be.visible')
    emailErr().should('not.be.visible')
    passwordErr().should('not.be.visible')
    passwordConfErr().should('not.be.visible')
    tosErr().should('not.be.visible')
  })

  it('check submit button disabled', () => {
    submitButton().should('be.disabled')
  })

  it('check username input and errors', () => {
    usernameInput()
      .should('have.value', '')
      .type('A')
      .should('have.value', 'A')

    usernameErr().contains('Username min length = 3').should('be.visible')

    usernameInput()
      .clear()
      .should('have.value', '')
      
    usernameErr().contains('Username is required').should('be.visible')
    
    usernameInput()
    .type('DarthPeanut')
    .should('have.value', 'DarthPeanut')
    
    usernameErr().should('not.be.visible')
    
    usernameInput()
      .clear()
      .should('have.value', '')

    usernameInput()
      .type('1234567890aoeuidhtnssaa')
      .should('have.value', '1234567890aoeuidhtnssaa')

    usernameErr().contains('Username max length = 20').should('be.visible')
  })

  it('check email input and erros', () => {
    emailInput()
      .should('have.value', '')
      .type('aoeu')
      .should('have.value', 'aoeu')

    emailErr().contains('Please enter a valid email').should('be.visible')

    emailInput()
      .clear()
      .should('have.value', '')

    emailErr().contains('Email is required')

    emailInput()
      .type('valid@email.com')
      .should('have.value', 'valid@email.com')

    emailErr().should('not.be.visible')
  })

  describe('check password inputs and errors', () => {
    it('check 1', () => {
      passwordErr().should('not.be.visible')
      passwordConfErr().should('not.be.visible')
      passwordInput().should('have.value', '')
      passwordConfInput().should('have.value', '')

      passwordInput()
        .should('have.value', '')
        .type('12345')
        .should('have.value', '12345')

      passwordErr().contains('Password min length = 8').should('be.visible')
      passwordConfErr().contains('The entered passwords do not match').should('be.visible')
    })
    
    it('check 2', () => {
      passwordInput()
        .type('12345678')
        .should('have.value', '12345678')

      passwordErr().contains('Please use excactly one special character').should('be.visible')
      passwordConfErr().contains('The entered passwords do not match').should('be.visible')
    })
    
    it('check 3', () => {
      passwordInput()
        .type('1234567!')
        .should('have.value', '1234567!')

      passwordErr().should('not.be.visible')
      passwordConfErr().contains('The entered passwords do not match').should('be.visible')
      
      passwordConfInput()
      .type('1234567!')
      .should('have.value', '1234567!')
      
      passwordConfErr().should('not.be.visible')
    })
    
    it('check 4', () => {
      passwordConfInput()
        .type('1234567!')
        .should('have.value', '1234567!')

      passwordErr().should('not.be.visible')
      passwordConfErr().contains('The entered passwords do not match').should('be.visible')
      
      passwordInput()
      .type('1234567!')
      .should('have.value', '1234567!')
      
      passwordConfErr().should('not.be.visible')
    })
    
    it('check 5', () => {
      passwordInput()
        .type('1234')
        .should('have.value', '1234')
        .clear()

      passwordErr().contains('Password is required')
    })

  })

  it('terms of service button', () => {
    tosButton().should('not.be.checked')

    tosButton()
      .click()
    
    tosButton().should('be.checked')

    tosButton()
      .click()

    tosErr().contains('You must agree to the Terms of Service').should('be.visible')
  })

  it('submit button works', () => {
    usernameInput()
      .type('DarthPeanut')

    emailInput()
      .type('valid@email.com')

    passwordInput()
      .type('1234567*')

    passwordConfInput()
      .type('1234567*')

    tosButton()
      .click()

    submitButton().should('not.be.disabled')
    submitButton().click()

    usernameInput().should('have.value', '')
    emailInput().should('have.value', '')
    passwordInput().should('have.value', '')
    passwordConfInput().should('have.value', '')
    tosButton().should('not.be.checked')
  })

})
