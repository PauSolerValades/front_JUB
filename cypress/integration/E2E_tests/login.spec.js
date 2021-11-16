describe('User login', function() {
    before(() => {
        cy.create_job_seeker();
      });
  
    it('shoud show a login correct alert after a successful login', function() {
        cy.visit('#/login');
        cy.get('[data-test-id="emailInput"]').first().type('jobseeker@email.com');
        cy.get('[data-test-id="passwordInput"]').first().type('jub');
        cy.get('[data-test-id="loginButton"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Login correct!');
        })
    })

    it('shoud take the user to the dashboard when closing the prompt after a successful login', function() {
        cy.visit('#/login');
        cy.get('[data-test-id="emailInput"]').first().type('jobseeker@email.com');
        cy.get('[data-test-id="passwordInput"]').first().type('jub');
        cy.get('[data-test-id="loginButton"]').click();
        cy.on('window:confirm', () => true);
        cy.location('href').should('contain', '#/dashboard');
    })

    it('shoud show an incorrect login alert if the email or password are not correct', function() {
        cy.visit('#/login');
        cy.get('[data-test-id="emailInput"]').first().type('jobseeker@email.com');
        cy.get('[data-test-id="passwordInput"]').first().type('jub');
        cy.get('[data-test-id="loginButton"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Email or Password incorrect');
        })
    })
})