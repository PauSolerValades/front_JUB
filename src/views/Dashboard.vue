<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col lg="7" md="10">
          <h1 class="display-2 text-white" data-test-id="MyHomePageTitle">Home Page</h1>
          <p class="text-white mt-0 mb-5">This is your Home page. Start your journey here!</p>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7" >
      <b-row class = "justify-content-center">
        <jobseeker-jobs-form></jobseeker-jobs-form>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import {mapState} from "vuex";
  export default {
    computed: mapState({
      token: state => state.token,
      logged: state => state.logged,
      isJs: state => state.isJS,
    }),
    components: {

    },
    data() {
      return {

      };
    },
    methods: {

    },

  };
</script>
<style></style>
