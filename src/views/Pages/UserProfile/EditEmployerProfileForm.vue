<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Edit profile </h3>
      </b-col>
    </b-row>

    <b-form>
      <h6 class="heading-small text-muted mb-4">User information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Company name"
              placeholder="Name"
              v-model="basicData.name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="email@email.com"
              v-model="basicData.user_email"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Contact information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col md="12">
            <base-input
              type="text"
              label="Location"
              placeholder="Home Address"
              v-model="basicData.address"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>

      <hr class="my-4">
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About us</h6>
      <div class="pl-lg-4">
        <b-form-group label="Description" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" v-model="basicData.description"  id="about-form-textaria" ></b-form-textarea>
        </b-form-group>
      </div>
    </b-form>

    <b-row align-v="center" slot="footer" >
      <button type="submit" class="btn btn-primary" v-on:click="putData">Submit</button>
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
   * @returns {{logged: boolean, prova: string, basicData: {address: string, name: string, description: string, user_email: string}, addBasicData: {address: string, name: string, description: string, email: string}, token}}
   */
  data() {
    return {
      basicData: {name: '', user_email: '', address: '', description: ''},
      prova: '',
      addBasicData: {
        name: '',
        email: '',
        address: '',
        description: '',
      }
    }
  },

  methods: {
    /**
     * changes view to the log in component
     */
    getLogin() {
      this.$router.replace({path: '/login'})
    },
    /**
     * changes view to the log in component and initializes token and logged
     */
    getLogout() {
      this.$store.commit('logout')
      this.$router.replace({path: '/login'})
    },
    /**
     * changes view to the home page component
     */
    getHome() {
      this.$router.replace({path: '/'})
    },
    /**
     * changes view to the employer profile component
     */
    getProfile() {
      this.$router.go()
    },
    /**
     * gets data from db
     */
    getData() {

      const path = 'http://0.0.0.0:8080/employer'
      axios.get(path, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            this.basicData.name = res.data.name
            this.basicData.user_email = res.data.user_email
            this.basicData.address = res.data.address
            this.basicData.description = res.data.description
            this.logged = true
          })
          .catch((error) => {
            console.error(error)
            this.$store.commit('logout')
            this.$router.replace({
              name: 'login'
            })
          })
    },
    /**
     * adds data to db
     */
    putData(evt) {
      evt.preventDefault()
      axios.put('http://0.0.0.0:8080/employer', this.basicData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            this.prova = res.data.token
            alert('Profile correctly edited')
            this.getData()
          })
          .catch((error) => {
            console.error(error)
            alert('Error.')
          })
    },
    getImage() {
      //TODO axios.get
    },
    setImage(/*name*/) {
      //TODO endpoint image
    },
  },
  /**
   * initializes data
   */
  created() {
    this.getData()
    this.getImage()
  }
};
</script>
<style></style>
