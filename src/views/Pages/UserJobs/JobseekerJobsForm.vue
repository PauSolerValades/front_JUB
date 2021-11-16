<template>
  <div>
    <div class="row" v-for="i in Math.ceil(jobs.length / 2)" :key="i">
    <span v-for="j in jobs.slice((i - 1) * 2, i * 2)" :key="j.description">
      <card class="mb-5 mr-5 ml-5 mt-5">
        <b-row slot="header" >
          <b-col>
            <h3 class="mt-2">Job offer</h3>
          </b-col>
          <b-col>
            <button type="submit" class="btn btn-primary float-right" v-on:click="TODO">Apply</button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1">Position</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobPositionJobseeker">{{j.position}}</p>
              </b-row>
            </div>
          </b-col>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1">Company</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobBussinessJobseeker">{{j.name_business}}</p>
              </b-row>
            </div>
          </b-col>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1">Sector</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobSectorJobseeker">{{j.sector}}</p>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1 mt-3">Location</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobLocationJobseeker">{{j.location}}</p>
              </b-row>
            </div>
          </b-col>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1 mt-3">Horari</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobWorkdayJobseeker">{{j.workday}}</p>
              </b-row>
            </div>
          </b-col>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1 mt-3">Start date</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobStartDateJobseeker">{{j.start_date}}</p>
              </b-row>
            </div>
          </b-col>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1 mt-3">End date</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobEndDateJobseeker">{{j.finish_date}}</p>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="col-md-auto mr-4">
            <h6 class="heading-small text-muted mb-1 mt-3">Description</h6>
            <div class="pl-lg-4">
              <b-row>
                <p data-test-id="jobDescriptionJobseeker">{{j.description}}</p>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </card>
    </span>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
  computed: mapState({
    token: state => state.token,
    logged: state => state.logged,
    isJs: state => state.isJS,
  }),
  /**
   * Sets all the data used
   * @returns {{logged: boolean, prova: string, basicData: {address: string, name: string, description: string, email: string}, addBasicData: {address: string, name: string, description: string, email: string}, token}}
   */
  data() {
    return {
      jobs: [{description: 'JUB', email: 'jub@devs.com', address: 'Barcelona'}, {description: 'JUB2', email: 'jub@devs.com', address: 'Barcelona'}, {description: 'JUB3', email: 'jub@devs.com', address: 'Barcelona'}],
    }
  },
  methods: {
    /**
     * gets data from db
     */
    getData() {
      const path = 'http://localhost:8080/jobs'
      axios.get(path, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            this.jobs = res.data.jobs
          })
          .catch((error) => {
            console.error(error)
            this.$store.commit('logout')
            this.$router.replace({
              name: 'login'
            })
          })
    }
  },
  /**
   * initializes data
   */
  created() {
    this.getData()
  }
};
</script>
<style></style>
