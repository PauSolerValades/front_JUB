<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Your Offer</h3>
      </b-col>
    </b-row>

    <b-form>
      <!-- Role -->
      <h6 class="heading-small text-muted mb-4">Role</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="12">
            <base-input
              name="Position"
              type="text"
              label="Position"
              placeholder="Position"
              v-model="basicData.position"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              name="Company"
              type="text"
              label="Company"
              placeholder="Name"
              v-model="basicData.name_business"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              name="Sector"
              type="text"
              label="Sector"
              placeholder="Sector"
              v-model="basicData.sector"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Time and Place -->
      <h6 class="heading-small text-muted mb-4">Time and Place</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="4">
            <base-input
              name="Work Shift"
              label="Work Shift"
            >
              <b-form-select
                  v-model="selected" :options="options"
                  required>
              </b-form-select>
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              name="Start Date"
              type="text"
              label="Start Date"
              placeholder="Start Date"
              v-model="basicData.start_date"
            >
            </base-input>
          </b-col>
           <b-col lg="4">
            <base-input
              name="End Date"
              type="text"
              label="End Date"
              placeholder="End Date"
              v-model="basicData.finish_date"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <div class="pl-lg-4">
        <b-row>
          <b-col md="12">
            <base-input
              name="Location"
              type="text"
              label="Location"
              placeholder="Location"
              v-model="basicData.location"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <hr class="my-4">

      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About the role</h6>
      <div class="pl-lg-4">
        <b-form-group label="Description" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea name="Description" rows="4" v-model="basicData.description"  id="about-form-textaria" placeholder="Tell us about the offer"></b-form-textarea>
        </b-form-group>
      </div>

    </b-form>

    <b-row align-v="center" slot="footer" >
      <button type="submit" class="btn btn-primary" v-on:click="postData">Create Job Offer</button>
    </b-row>

  </card>
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
        basicData: {
          position: '',
          name_business: '',
          sector: '',
          location: '',
          workday: this.selected,
          start_date: '',
          finish_date: '',
          description: '',
        },
        addBasicData: {
         position: 'Technical Solutions Engineer',
          name_business: 'Criteo',
          sector: 'Digital Marketing',
          location: 'Carrer dels Almogàvers 135, Barcelona, 08018, Spain',
          workday: 'Part-Time',
          start_date: '19-04-2021',
          finish_date: '19-10-2021',
          description: 'As a member of our Technical Solutions Engineer team in Barcelona, youll be the bridge between our business and technology, a key player on the development of EMEA team optimizing cross channel products on a wide range of ecommerce clients.',
        },
       clearBasicData: {
        position: '',
        name_business: '',
        sector: '',
        location: '',
        workday: this.selected,
        start_date: '',
        finish_date: '',
        description: '',
       },
      selected: null,
      options: [
        {value: null, text: 'Select the desired work shift'},
        {value: 'Part-Time', text: 'Part-Time'},
        {value: 'Full-Time', text: 'Full-Time'},
      ],
      prova: '',
    }
  },

  methods: {
    /**
     * adds data to db
     */
    postData(evt) {
      evt.preventDefault()
      this.basicData.workday = this.selected
      axios.post('http://localhost:8080/jobs', this.basicData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        this.clearData()
        alert('Job offer correctly added')
      })
      .catch((error) => {
        console.error(error)
        alert(error)
      })
    },
    /**
     * clear basic data
     */
    clearData() {
      this.basicData = this.clearBasicData
      this.selected = null;
    }
  },
};
</script>
<style></style>
