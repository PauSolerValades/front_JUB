
describe('Users endpoints', () => {
    before(() => {
        cy.create_job_seeker();
        cy.login_job_seeker();
        cy.saveLocalStorage();
      });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
      });

    context('GET /users', () => {
        it('should return the logged user id and password', () => {
            let token = localStorage.getItem('token');
            cy.log(token);
            cy.api_request({
                method: 'GET',
                url: '/users',
                headers: {
                    authorization: 'Bearer ' + token, // consume the token
                  },
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(200);
                    expect(response.body.id).to.not.be.null;
                    expect(response.body.email).to.eq('jobseeker@email.com')
            });
        });
    });

    context('GET /users', () => {
        it('should return an error when the token is not valid', () => {
            cy.log('sending invalid token');
            cy.api_request({
                method: 'GET',
                url: '/users',
                headers: {
                    authorization: 'Bearer ' + 'invalid token', // consume the token
                  },
                failOnStatusCode: false
            })
                .should((response) => {
                    cy.log(JSON.stringify(response.body));
                    expect(response.status).to.eq(401);
                    expect(response.body.detail).to.eq("Could not validate credentials")
            });
        });
    });
});