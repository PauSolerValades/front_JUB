<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 600px; background-image: url(img/theme/job-offers-theme.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-danger opacity-8"></span>
        <!-- Header container -->
        <b-container fluid className="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">My Jobs</h1>
              <p class="text-white mt-0 mb-5">Here you can see the jobs you have posted!</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <b-container fluid class="mt--7" >
      <b-row class = "justify-content-center">
         <employer-my-jobs></employer-my-jobs>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import EmployerMyJobs from './UserJobs/EmployerMyJobs.vue';

export default {
  components: {
    EmployerMyJobs
  }
};
</script>
<style>
</style>
