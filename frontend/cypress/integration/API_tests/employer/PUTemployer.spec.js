describe('Employer endpoint', () => {
    before(() => {
        cy.create_employer();
        cy.create_job_seeker();
        cy.login_employer();
        cy.saveLocalStorage();
      });
      
    beforeEach(function () {
        cy.restoreLocalStorage();
        cy.fixture('employer').then((employer_data) => {
            this.employer = employer_data.employer_form;
          })
      });

    context('PUT /employer', () => {
        it('should return the updated information', function () {
            let token = localStorage.getItem('token');
            cy.api_request({
                method: 'PUT',
                url: '/employer',
                body: this.employer,
                headers: {
                    authorization: 'Bearer ' + token, // consume the token
                  },
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(200);
                    expect(response.body.name).to.eq(this.employer.name)
            });
        });
    });

    context('PUT /employer', () => {
        it('should return an error if authenticated user is not of type employer', function () {
            cy.login_job_seeker_return_token().then((token) => {
                cy.log(token)
                cy.api_request({
                    method: 'PUT',
                    url: '/employer',
                    body: this.employer,
                    failOnStatusCode: false,
                    headers: {
                        authorization: 'Bearer ' + token, // consume the token
                    }
                })
                    .should((response) => {
                        cy.log(JSON.stringify(response.body));
                        expect(response.status).to.eq(400);
                        expect(response.body.detail).to.eq('Target user is not of type employer')
                });
            });
        });
    });
});