<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'ni ni-chart-pie-35 text-yellow',
          }"
        >
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'My Profile',
                path: this.path,
                icon: 'ni ni-single-02 text-primary'
                }">
        </sidebar-item>

        <sidebar-item
            v-if="!isJs"
            :link="{
                name: 'Create a Job',
                path: 'createjob',
                icon: 'ni ni-fat-add text-green'
                }">
        </sidebar-item>

        <sidebar-item
            :link="{
                name: this.nameJobs,
                path: this.pathJobs,
                icon: 'ni ni-bullet-list-67 text-red'
                }">
        </sidebar-item>


      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';
  import {mapState} from "vuex";

  export default {
    computed: mapState({
      token: state => state.token,
      logged: state => state.logged,
      isJs: state => state.isJS,
    }),
    components: {
      DashboardNavbar,
      ContentFooter,
      // eslint-disable-next-line vue/no-unused-components
      DashboardContent,
      FadeTransition
    },
    data(){
      return {
        path: '',
        path_2: ''
      }
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      }
    },
    created() {
      if (this.isJs) this.path = '/jobseeker', this.pathJobs = '/jobseekerJobs', this.nameJobs = 'All Jobs'
      else this.path = '/employer', this.pathJobs = '/employerJobs', this.nameJobs = 'My Jobs'
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
</style>
