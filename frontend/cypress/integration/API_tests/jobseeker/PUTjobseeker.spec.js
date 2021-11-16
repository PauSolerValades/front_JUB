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

    context('PUT /jobseeker', () => {
        it('should return the updated information', function () {
            let token = localStorage.getItem('token');
            cy.api_request({
                method: 'PUT',
                url: '/jobseeker',
                body: this.job_seeker,
                headers: {
                    authorization: 'Bearer ' + token, // consume the token
                  },
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(200);
                    expect(JSON.stringify(response.body.academicForms)).to.eq(JSON.stringify(this.job_seeker.academic_form_forms))
                    expect(JSON.stringify(response.body.pastJobs)).to.eq(JSON.stringify(this.job_seeker.past_job_forms))
                    expect(JSON.stringify(response.body.languages)).to.eq(JSON.stringify(this.job_seeker.language_forms))
                    expect(JSON.stringify(response.body.skills)).to.eq(JSON.stringify(this.job_seeker.skills))
                    expect(JSON.stringify(response.body.basicData)).to.eq(JSON.stringify(this.job_seeker.job_seeker_form))
            });
        });
    });

    context('PUT /jobseeker', () => {
        it('should return an error if authenticated user is not of type job_seeker', function () {
            cy.login_employer_return_token()
                .then((token) => {
                    cy.api_request({
                        method: 'PUT',
                        url: '/jobseeker',
                        body: this.job_seeker,
                        failOnStatusCode: false,
                        headers: {
                            authorization: 'Bearer ' + token, // consume the token
                        }
                    })
                })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(400);
                    expect(response.body.detail).to.eq('Target user is not of type job seeker')
            });
        });
    });
});