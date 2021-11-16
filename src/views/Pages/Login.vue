<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Use these forms to log in to your account or to create a new one!</p>
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
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">

            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              required
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="email"
                              data-test-id="emailInput">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              required
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="password"
                              data-test-id="passwordInput">
                  </base-input>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4" data-test-id="loginButton" @click="checkLogin">Sign in</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row align="center" class="mt-3">
            <b-col align="center" cols="6" class="text-right">
              <router-link to="/register" class="text-light" data-test-id="registrationLink"><small>Create new account</small></router-link>
            </b-col>
          </b-row>
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
     * checks if login is correct
     */
    checkLogin() {
      const parameters = {
        email: this.email,
        password: this.password
      }
      const path = `http://localhost:8080/login`
      axios.post(path, parameters)
          .then((res) => {
            let info = {token: res.data.token}
            this.$store.commit('saveToken', info)
            this.getAccount()
            alert('Login correct!')

          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error)
            alert('Email or Password incorrect')
          })
    },
    /**
     *initializes uses session when login
     */
    getAccount() {
      const path = `http://localhost:8080/users`
      axios.get(path, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            if (res.data.type === 'job_seeker'){
              let info = {isJS: true}
              this.$store.commit('login', info)
            }
            else{
              let info = {isJS: false}
              this.$store.commit('login', info)
            }
            this.$router.replace({path: '/dashboard'})
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error)
            alert('User not found')
          })
    },
    /**
     * initializes register form
     */
    initForm() {
      this.addUserForm.email = ''
      this.addUserForm.password = ''
      this.selected = null
      document.getElementById('input-1').value = ''
      document.getElementById('text-password').value = ''
    },
    /**
     * shows register form
     */
    showForm() {
      this.$refs['addUserModal'].show()
    },

    /**
     * registers user
     * @param evt
     */
    onSubmit(evt) {

      evt.preventDefault()
      const path = 'http://localhost:8080/users'
      const parameters = {
        email: this.addUserForm.email,
        password: this.addUserForm.password,
        type: this.selected
      }
      axios.post(path, parameters)
          .catch((error) => {
            // eslint-disable-next-line
            alert('User already exists')
            console.error(error)
          })
      this.$refs.addUserModal.hide()
      this.initForm()

    },
    /**
     * resets register form
     * @param evt
     */
    onReset(evt) {
      evt.preventDefault()
      this.initForm()
    }
  }
}
</script>
