/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/auth/new');
  });

  it('Test: valid/invalid name', () => {
    // without name
    cy.get('#name').clear().blur()
      .get('#name_error').should('have.html', 'Obrigatório');

    // with name
    cy.get('#name').clear().type('example name').blur()
      .get('#name_error').should('be.empty');
  });

  it('Test: valid/invalid username', () => {
    // without data
    cy.get('#username').clear().blur()
      .get('#username_error').should('have.html', 'Obrigatório');

    // with data
    cy.get('#username').clear().type('example name').blur()
      .get('#username_error').should('be.empty');
  });

  it('Test: valid/invalid password', () => {
    // without data
    cy.get('#password').clear().blur()
      .get('#password_error').should('have.html', 'Obrigatório');

    // with data
    cy.get('#password').clear().type('123').blur()
      .get('#password_error').should('be.empty');
  });

  it('Test: valid/invalid password confirmation', () => {
    // without data
    cy.get('#password').clear().type('123').blur();

    cy.get('#password_confirmation').clear().blur()
      .get('#password_confirmation_error').should('have.html', 'Senhas não conferem');

    // with data
    cy.get('#password_confirmation').clear().type('123').blur()
      .get('#password_confirmation_error').should('be.empty');
  });

  it('Test: Show/Hide password', () => {
    // without data
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('#password').clear().type('SHOW PASSWORD').blur();
    cy.get('#password_confirmation').clear().type('SHOW PASSWORD').blur();
    cy.get('#btn-show-password').click();
    cy.get('#password').should('have.attr', 'type', 'text');
  });

});
