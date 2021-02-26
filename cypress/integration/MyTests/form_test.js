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
    
    // usernameErr().should('be.visible')
    // emailErr().should('be.visible')
    // passwordErr().should('be.visible')
    // passwordConfErr().should('be.visible')
    // tosErr().should('be.visible')
  })

  it('check submit button disabled', () => {
    submitButton().should('be.disabled')
  })

  it('check username input and errors', () => {
    usernameInput()
      .should('have.value', '')
      .type('A')
      .should('have.value', 'A')
    
    //expect(usernameErr()).to.contain('Username min length = 3')
    // cy.contains('Username min length = 3').should('be.visible')

    usernameErr().contains('Username min length = 3').should('be.visible')

    usernameInput()
      .clear()
      .should('have.value', '')

    usernameErr().contains('Username is required').should('be.visible')

    usernameInput()
      .type('1234567890aoeuidhtnssaa')
      .should('have.value', '1234567890aoeuidhtnssaa')

    usernameErr().contains('Username max length = 20').should('be.visible')
  })

})