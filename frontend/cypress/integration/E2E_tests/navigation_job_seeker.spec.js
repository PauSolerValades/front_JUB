describe('Navigation in job seeker account', function() {

    before(() => {
        cy.create_job_seeker();
        cy.login_job_seeker();
        cy.saveLocalStorage();
    })
      
    beforeEach(function () {
        cy.restoreLocalStorage();
        cy.fixture('job_seeker').then((job_seeker_data) => {
            this.job_seeker = job_seeker_data;
        })
    })

    //TODO
    it('should go from dashboard to login page when clicking the logout link', function() {
        cy.visit('#/dashboard');
    })
})