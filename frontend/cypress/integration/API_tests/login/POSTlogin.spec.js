describe('Login endpoint', () => {
  before(() => {
      cy.create_job_seeker();
    });

  context('POST /login', () => {
      it('should return a token', () => {
          cy.api_request({
              method: 'POST',
              url: '/login',
              body: {'email': 'jobseeker@email.com',
                    'password': 'jub'}
          })
          .then((response) => {
            cy.log(JSON.stringify(response.body)); //log the response body
          })
          .should((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.token).to.not.be.null;
              expect(response.body.token_type).to.eq('bearer');
          });
      });
  });

  context('POST /login', () => {
    it('should return an error when credentials are incorrect', () => {
        cy.api_request({
            method: 'POST',
            url: '/login',
            body: {'email': 'jobseeker@email.com',
                  'password': 'wrong password'},
            failOnStatusCode: false
        })
        .then((response) => {
          cy.log(JSON.stringify(response.body)); //log the response body
        })
        .should((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.detail).to.eq("Incorrect username or password")
        });
    });
  });
});