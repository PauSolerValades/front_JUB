describe('Jobseeker endpoint', () => {
    before(() => {
        cy.create_job_seeker();
        cy.create_employer();
        cy.login_job_seeker();
        cy.saveLocalStorage();
      });
      
    beforeEach(function () {
        cy.restoreLocalStorage();
        cy.fixture('job_seeker').then((job_seeker_data) => {
            this.job_seeker = job_seeker_data;
          })
      });

    context('GET /jobseeker', () => {
        it('should return the information of the logged jobseeker', function () {
            let token = localStorage.getItem('token');
            cy.api_request({
                method: 'GET',
                url: '/jobseeker',
                headers: {
                    authorization: 'Bearer ' + token, // consume the token
                  },
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(200);
                    expect(response.body.academicForms).to.not.be.null;
                    expect(response.body.pastJobs).to.not.be.null;
                    expect(response.body.languages).to.not.be.null;
                    expect(response.body.skills).to.not.be.null;
                    expect(response.body.basicData).to.not.be.null;
            });
        });
    });

    context('GET /jobseeker', () => {
        it('should return an error if authenticated user is not of type job_seeker', function () {
            cy.login_employer_return_token().then((token) => {
                cy.api_request({
                    method: 'GET',
                    url: '/jobseeker',
                    failOnStatusCode: false,
                    headers: {
                        authorization: 'Bearer ' + token, // consume the token
                        }
                })
                    .should((response) => {
                        cy.log(JSON.stringify(response.body));
                        expect(response.status).to.eq(400);
                        expect(response.body.detail).to.eq('Target user is not of type job seeker')
                });
            });
        });
    });
});