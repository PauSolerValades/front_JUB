describe('Jobs endpoint', () => {
  before(() => {
    cy.create_employer();
    cy.create_job_seeker();
    cy.login_employer();
    cy.saveLocalStorage();
  });
  
  beforeEach(function () {
      cy.restoreLocalStorage();
      cy.fixture('jobs').then((data) => {
          this.job = data.job1;
        })
    });

  context('POST /jobs', () => {
    it('should return the id and all the fields of the posted job', function () {
        let token = localStorage.getItem('token');
        cy.api_request({
            method: 'POST',
            url: '/jobs',
            body: this.job,
            headers: {
                authorization: 'Bearer ' + token, // consume the token
              },
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.eq(200);
                expect(response.body.id).to.not.be.null
                expect(response.body.position).to.eq(this.job.position)
                expect(response.body.workday).to.eq(this.job.workday)
                expect(response.body.name_business).to.eq(this.job.name_business)
                expect(response.body.location).to.eq(this.job.location)
                expect(response.body.start_date).to.eq(this.job.start_date)
                expect(response.body.finish_date).to.eq(this.job.finish_date)
                expect(response.body.sector).to.eq(this.job.sector)
                expect(response.body.description).to.eq(this.job.description)
        });
    });
  });

  context('POST /jobs', () => {
    it('should not allow posting a job if the logged user is not an employer', function () {
        cy.login_job_seeker_return_token().then((token) => {
            cy.api_request({
                method: 'POST',
                url: '/jobs',
                body: this.job,
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