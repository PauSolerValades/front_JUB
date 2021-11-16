let fakeUser;

describe('Users endpoints', () => {
  beforeEach(() => {
    cy.task('freshUser').then((user) => {
      fakeUser = user;
    });
  });

context('POST /users', () => {
    it('Should return the id and email of the new user when the type is job seeker', () => {
        fakeUser.type = "job_seeker";
        cy.log(JSON.stringify(fakeUser))
        cy.api_request({
            method: 'POST',
            url: '/users',
            body: fakeUser
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null
                expect(response.body.email).to.eq(fakeUser.email)
            });
        });
  });

  context('POST /users', () => {
    it('Should return the id and email of the new user when the type is employer', () => {
        fakeUser.type = "employer";
        cy.log(JSON.stringify(fakeUser))
        cy.api_request({
            method: 'POST',
            url: '/users',
            body: fakeUser
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null
                expect(response.body.email).to.eq(fakeUser.email)
            });
        });
  });

  context('POST /users', () => {
    it('should return an error when the email is already registered', () => {
        cy.api_request({
            method: 'POST',
            url: '/users',
            body: {'email': 'jobseeker@email.com',
            'password': 'whatever',
            'type': 'job_seeker'},
            failOnStatusCode: false
        })
            .should((response) => {
              cy.log(JSON.stringify(response.body));
              expect(response.status).to.eq(400);
              expect(response.body.detail).to.eq("Email already registered")
            });
        });
    });

context('POST /users', () => {
  it('should return an error when the email does not have the required format', () => {
      cy.api_request({
          method: 'POST',
          url: '/users',
          body: {'email': 'jobseekeremail.com',
          'password': 'whatever',
          'type': 'job_seeker'},
          failOnStatusCode: false
      })
          .should((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(400);
            expect(response.body.detail).to.eq("Invalid email format")
          });
      });
  });

  context('POST /users', () => {
    it('should return an error when the user type is not valid', () => {
        fakeUser.type = "nurse";
        cy.log(JSON.stringify(fakeUser))
        cy.api_request({
            method: 'POST',
            url: '/users',
            body: fakeUser,
            failOnStatusCode: false
        })
            .should((response) => {
              cy.log(JSON.stringify(response.body));
              expect(response.status).to.eq(400);
              expect(response.body.detail).to.eq("Invalid user type")
            });
        });
    });

  context('POST /users', () => {
    it('should return an error when the request body does not include the user type', () => {
        cy.api_request({
            method: 'POST',
            url: '/users',
            body: {'email': 'jobseekeremail.com',
            'password': 'whatever'},
            failOnStatusCode: false
        })
            .should((response) => {
              cy.log(JSON.stringify(response.body));
              expect(response.status).to.eq(422);
            });
        });
    });
});