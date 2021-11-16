<template>
  <div class="app" style="background-color: #CAEFF1;  min-height: 100vh">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">JUB</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-on:click="getHome">Home</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div>
      <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
        <div class="container text-center">
          <div class="col-bm-4 mb-3" style="display: flex; justify-content: center">
            <div class="page-header mb-4">
              <h1 class="page-heading">Log in</h1>
            </div>
          </div>
          <div class="container text-center" style="max-width: 50%">
            <b-row>
              <b-col><label class="col-sm-2 col-form-label" for="inputEmail">Email</label></b-col>
              <b-col>
                <div class="mb-3">
                  <div class="col-sm-15">
                    <input id="inputEmail" v-model="email" autofocus
                           class="form-control" placeholder="Email" required type="email">
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col><label class="col-sm-2 col-form-label" for="inputPassword">Password</label></b-col>
              <b-col>
                <div class="mb-3">
                  <div>
                    <input id="inputPassword" v-model="password" class="form-control"
                           placeholder="Password" required type="password">
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div>
            <div class="container text-center">
              <button class="btn btn-primary mt-2" type="button" @click="checkLogin()">LOG IN</button>
            </div>
            <div class="container text-center">
              <button class="btn btn-success mt-2" type="button" @click="showForm()">CREATE ACCOUNT</button>
            </div>
          </div>
        </div>
        <b-modal id="user-modal"
                 ref="addUserModal"
                 hide-footer
                 title="Create account">
          <b-form v-if="isForm" @reset="onReset" @submit="onSubmit">
            <b-form-group id="input-group-1" label="Email:" label-for="input-1">
              <b-form-input
                  id="input-1"
                  v-model="addUserForm.email"
                  placeholder="Enter email"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                  id="text-password"
                  v-model="addUserForm.password"
                  aria-describedby="password-help-block"
                  placeholder="Enter password"
                  required
                  type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Account type:" label-for="input-3">
              <b-form-select
                  v-model="selected" :options="options"
                  required>
              </b-form-select>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
    <footer class="footer bg-white shadow align-self-end py-3 px-xl-5 w-100 fixed-bottom">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 text-center text-md-start fw-bold">
            <p class="mb-2 mb-md-0 fw-bold">JUB © 2021</p>
          </div>
        </div>
      </div>
    </footer>
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
            if (res.data.type == 'job_seeker'){
              let info = {token: res.data.token, isJS: true}
              this.$store.commit('login', info)
            }
            else{
              let info = {token: res.data.token, isJS: false}
              this.$store.commit('login', info)
            }
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
      const path = `http://localhost:8080/users/`
      axios.get(path, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            /*
            this.is_admin = true
            if (res.data.account.is_admin === 0) {
              this.is_admin = false
            }
             */

            console.log(res.data.id)

            this.$router.replace({
              name: 'HomePage',
              params: {email: this.email}
            })
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

<style scoped>

</style>
