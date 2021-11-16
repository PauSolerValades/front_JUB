<template>
  <div class="app" style="background-color: #CAEFF1;  min-height: 100vh">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">JUB</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-on:click="getHome">Home</b-nav-item>
          <b-nav-item v-if=this.logged href="#" v-on:click="getProfile">Profile</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-if=!this.logged href="#" v-on:click="getLogin">Log in</b-dropdown-item>
            <b-dropdown-item v-else href="#" v-on:click="getLogout">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div>
      <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
        <div class="col-bm-4 mb-3"
             style="display: flex; justify-content: center; margin-right: 100px; margin-left: 100px">
          <div class="page-header mb-4 text-center">
            <h1 class="page-heading">Home Page</h1>
          </div>
        </div>
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
import {mapState} from "vuex";

export default {
  name: 'HomePage',
  computed: mapState({
    token: state => state.token,
    logged: state => state.logged,
    isJs: state => state.isJS,
  }),
  methods: {
    /**
     * changes view to the login component
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

    },
    /**
     * changes view to the employer profile component
     */
    getProfile() {
      if(this.isJs){
        this.$router.replace({path: '/jobseekerProfile'})
      }
      else{
        this.$router.replace({path: '/employerProfile'})
      }
    },
    /**
     * changes view to the job seeker profile component
     */
    getProfile2() {
      this.$router.replace({path: '/jobseekerProfile'})
    }
  },
  /**
   * initializes data
   */
  created() {

  }
}
</script>