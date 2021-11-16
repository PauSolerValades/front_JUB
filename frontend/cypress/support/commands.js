// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-localstorage-commands"

Cypress.Commands.add('api_request', (params) => {
  params.url = Cypress.config('apiUrl') + params.url;
  cy.request(params)
});

Cypress.Commands.add('login_job_seeker', () => { 
  cy.api_request({
    method: 'POST',
    url: '/login',
    body: {'email': 'jobseeker@email.com',
          'password': 'jub'}
  })
  .then(response => {
    cy.setLocalStorage("token", response.body.token);
  })
});

Cypress.Commands.add('login_employer', () => { 
  cy.api_request({
    method: 'POST',
    url: '/login',
    body: {'email': 'employer@email.com',
          'password': 'jub'}
  })
  .then(response => {
    cy.setLocalStorage("token", response.body.token);
  })
});

Cypress.Commands.add('login_employer_return_token', () => {
  return cy.api_request({
    method: 'POST',
    url: '/login',
    body: {'email': 'employer@email.com',
          'password': 'jub'}
  })
    .its("body.token");
});

Cypress.Commands.add('login_job_seeker_return_token', () => {
  return cy.api_request({
    method: 'POST',
    url: '/login',
    body: {'email': 'jobseeker@email.com',
          'password': 'jub'}
  })
    .its("body.token");
});

Cypress.Commands.add('create_job_seeker', () => {
    cy.api_request({
      method: 'POST',
      url: '/users',
      body: {'email': 'jobseeker@email.com',
            'password': 'jub',
            'type': 'job_seeker'},
      failOnStatusCode: false
    })
});

Cypress.Commands.add('create_employer', () => {
  cy.api_request({
    method: 'POST',
    url: '/users',
    body: {'email': 'employer@email.com',
          'password': 'jub',
          'type': 'employer'},
    failOnStatusCode: false
  })
});