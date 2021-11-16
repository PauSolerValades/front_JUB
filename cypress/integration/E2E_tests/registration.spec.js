let fakeUser;

describe('User registration', function() {
    beforeEach(() => {
        cy.task('freshUser').then((user) => {
          fakeUser = user;
        });
    })

    it('shoud take the user to the login page after successful registration as a job_seeker', function() {
        cy.visit('#/register');
        cy.get('[data-test-id="emailInput"]').first().type(fakeUser.email);
        cy.get('[data-test-id="passwordInput"]').first().type('jub');
        cy.get('[data-test-id="userTypeInput"]').children().should('have.length', 3);
        cy.get('[data-test-id="userTypeInput"]').select('job_seeker');
        cy.get('[data-test-id="createAccountButton"]').click()
        cy.location('href').should('contain', '#/login');
    })

    it('shoud show an alert when the user already exists', function() {
        cy.visit('#/register');
        cy.get('[data-test-id="emailInput"]').first().type('jobseeker@email.com');
        cy.get('[data-test-id="passwordInput"]').first().type('jub');
        cy.get('[data-test-id="userTypeInput"]').children().should('have.length', 3);
        cy.get('[data-test-id="userTypeInput"]').select('job_seeker');
        cy.get('[data-test-id="createAccountButton"]').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('User already exists');
        })
    })
})