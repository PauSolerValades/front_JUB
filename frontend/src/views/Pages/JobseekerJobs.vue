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
              <h1 class="display-2 text-white" data-test-id="MyJobsTitleJobseeker">My Jobs</h1>
              <p class="text-white mt-0 mb-5">This is your jobs page. You can apply for a job here!</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--7" >
      <b-row class = "justify-content-center">
        <jobseeker-jobs-form></jobseeker-jobs-form>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import JobseekerJobsForm from './UserJobs/JobseekerJobsForm.vue';
export default {
  components: {
    JobseekerJobsForm,
  }
};
</script>
<style>
</style>
