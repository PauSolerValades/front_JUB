<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create account</h1>
              <p class="text-lead text-white">Use these forms to create your new account!</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Create your account</small>
              </div>
              <b-form role="form">
                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-email-83"
                            placeholder="Email"
                            name="Email"
                            required
                            v-model="email"
                            data-test-id="emailInput">
                </base-input>

                <base-input alternative
                            class="mb-3"
                            prepend-icon="ni ni-lock-circle-open"
                            placeholder="password"
                            type="password"
                            name="Password"
                            required
                            v-model="password"
                            data-test-id="passwordInput">
                </base-input>
                <base-input>
                  <b-form-select
                      v-model="selected" 
                      :options="options"
                      required
                      data-test-id="userTypeInput">
                  </b-form-select>
                </base-input>
                <div class="text-center">
                  <b-button type="submit" variant="primary" class="mt-4" @click="onSubmit" data-test-id="createAccountButton">Create account</b-button>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {

  computed: mapState({
    token: state => state.token,
    logged: state => state.logged,
    isJs: state => state.isJS,
  }),
  /**
   * Sets all the data used
   * @returns {{is_admin: boolean, find_match: boolean, password: string, logged: boolean, addUserForm: {password: string, email: string}, prova: string, options: [{text: string, value: null}, {text: string, value: string}, {text: string, value: string}], isForm: boolean, email: string, selected: null, token: string}}
   */
  data() {
    return {
      email: '',
      password: '',
      prova: '',
      is_admin: false,
      find_match: false,
      isForm: true,
      addUserForm: {
        email: '',
        password: ''
      },
      selected: null,
      options: [
        {value: null, text: 'Select an account type'},
        {value: 'employer', text: 'Employer'},
        {value: 'job_seeker', text: 'Job Seeker'},
      ]
    }
  },
  methods: {
    /**
     * changes view to the login component
     */
    getLogin() {
      this.$router.replace({path: '/login'})
    },
    /**
     * changes view to the home page component
     */
    getHome() {
      this.$router.replace({path: '/'})
    },
    /**
     * registers user
     * @param evt
     */
    onSubmit(evt) {

      evt.preventDefault()
      const path = 'http://localhost:8080/users'
      const parameters = {
        email: this.email,
        password: this.password,
        type: this.selected
      }
      axios.post(path, parameters)
          .then((res) => {
            console.log(res.data.id)

            this.$router.replace({
              name: 'login'
            })
          })
          .catch((error) => {
            // eslint-disable-next-line
            alert('User already exists')
            console.error(error)
          })

    }
  }
}
</script>
<style></style>
