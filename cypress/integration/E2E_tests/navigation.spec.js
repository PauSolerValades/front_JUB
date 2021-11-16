describe('Navigation between login and registration screens', function() {
    it('should go from login to registration page when clicking the register link', function() {
        cy.visit('#/login');
        cy.get('[data-test-id="registrationLink"]').click();
        cy.location('href').should('contain', '#/register');
    })

    it('should go from login to registration page when clicking the create new account link', function() {
        cy.visit('#/login');
        cy.get('[data-test-id="registerTopLink"]').click();
        cy.location('href').should('contain', '#/register');
    })

    it('should go from registration to login page when clicking the login link', function() {
        cy.visit('#/register');
        cy.get('[data-test-id="loginTopLink"]').click();
        cy.location('href').should('contain', '#/login');
    })
})