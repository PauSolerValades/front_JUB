<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 600px; background-image: url(img/theme/create-job-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid className="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Create a Job</h1>
              <p class="text-white mt-0 mb-5">Start creating a job offer now!</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="10" class="order-xl-1">
          <employer-create-jobs-form></employer-create-jobs-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import EmployerCreateJobsForm from './UserJobs/EmployerCreateJobsForm.vue';

export default {
  components: {
    EmployerCreateJobsForm,
  }
};
</script>
<style>
</style>
