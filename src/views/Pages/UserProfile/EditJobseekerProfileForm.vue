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
              label="Full name"
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
              label="Address"
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

      <hr class="my-4">
      <!-- Disponibility -->
      <h6 class="heading-small text-muted mb-4">Disponibility</h6>
      <div class="pl-lg-4">
        <b-form-select
            v-model="basicData.disponibility" :options="options"
            required>
        </b-form-select>
      </div>
    </b-form>
    <b-row align-v="center" slot="footer" >
      <b-row>
        <b-col>
          <b-card no-body class="card-profile">
            <b-card-header>
              <div class="d-flex justify-content-between">
                <h5 class="h3"> Academic formation</h5>
                <a href="#" class="btn btn-sm btn-info mr-4" @click="addFormation()">Add</a>
              </div>
            </b-card-header>

            <b-card-body>
              <div v-for="(academic) in academicForms" :key="academic.degree">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="h4" style="display: inline-block">{{ academic.degree }}</h5>
                      <a href="#" class="btn btn-sm btn-danger mr-4" @click="deleteFormation(academic.degree)">Delete</a>
                    </div>
                    <h5 class="h5">{{ academic.institution }}</h5>
                    <h5 class="h5">{{ academic.year }}</h5>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="card-profile">
            <b-card-header>
              <div class="d-flex justify-content-between">
                <h5 class="h3"> Past jobs</h5>
                <a href="#" class="btn btn-sm btn-info mr-4" @click="addJob()">Add</a>
              </div>
            </b-card-header>

            <b-card-body>
              <div v-for="(j) in pastJobs" :key="j.job">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="h4" style="display: inline-block">{{ j.job }}</h5>
                      <a href="#" class="btn btn-sm btn-danger mr-4" @click="deleteJob(j.job)">Delete</a>
                    </div>
                    <h5 class="h5">{{ j.place }}</h5>
                    <h5 class="h5">{{ j.year }}</h5>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="card-profile">
            <b-card-header>
              <div class="d-flex justify-content-between">
                <h5 class="h3"> Language</h5>
                <a href="#" class="btn btn-sm btn-info mr-4" @click="addLanguage()">Add</a>
              </div>
            </b-card-header>

            <b-card-body>
              <div v-for="(l) in languages" :key="l.language">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="h4" style="display: inline-block">{{ l.language }}</h5>
                      <a href="#" class="btn btn-sm btn-danger mr-4" @click="deleteLanguage(l.language)">Delete</a>
                    </div>
                    <h5 class="h5">{{ l.grade }}</h5>
                    <h5 class="h5">{{ l.year }}</h5>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="card-profile">
            <b-card-header>
              <div class="d-flex justify-content-between">
                <h5 class="h3"> Skills</h5>
                <a href="#" class="btn btn-sm btn-info mr-4" @click="addKnowledge()">Add</a>
              </div>
            </b-card-header>

            <b-card-body>
              <div v-for="(k) in skills" :key="k">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 class="h4" style="display: inline-block">{{ k }}</h5>
                      <a href="#" class="btn btn-sm btn-danger mr-4" @click="deleteKnowledge(k)">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <button type="submit" class="btn btn-primary" v-on:click="putData">Submit</button>
    </b-row>
    <b-modal id="formation-modal"
               ref="addFormationModal"
               hide-footer
               title="Add academic formation">
        <b-form @reset="onResetFormation" @submit="onSubmitFormation">
          <b-form-group id="input-group-1" label="Degree:" label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="addFormationData.degree"
                placeholder="Enter degree"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Institution:" label-for="input-2">
            <b-form-input
                id="institution"
                v-model="addFormationData.institution"
                placeholder="Enter institution"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Year" label-for="input-3">
            <b-form-input
                id="year"
                v-model="addFormationData.year"
                placeholder="Enter year"
                required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" @click="$bvModal.hide('formation-modal')">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-modal>
    <b-modal id="job-modal"
             ref="addJobModal"
             hide-footer
             title="Add past jobs">
      <b-form @reset="onResetJob" @submit="onSubmitJob">
        <b-form-group id="input-group-1" label="Job:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="addJobData.job"
              placeholder="Enter job"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Company:" label-for="input-2">
          <b-form-input
              id="place"
              v-model="addJobData.place"
              placeholder="Enter company"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Year" label-for="input-3">
          <b-form-input
              id="year"
              v-model="addJobData.year"
              placeholder="Enter year"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="$bvModal.hide('job-modal')">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal id="language-modal"
             ref="addLanguageModal"
             hide-footer
             title="Add languages">
      <b-form @reset="onResetLanguage" @submit="onSubmitLanguage">
        <b-form-group id="input-group-1" label="Language:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="addLanguageData.language"
              placeholder="Enter language"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Grade:" label-for="input-2">
          <b-form-input
              id="place"
              v-model="addLanguageData.grade"
              placeholder="Enter grade"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Year" label-for="input-3">
          <b-form-input
              id="year"
              v-model="addLanguageData.year"
              placeholder="Enter year"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="$bvModal.hide('language-modal')">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal id="knowledge-modal"
             ref="addKnowledgeModal"
             hide-footer
             title="Add fields of knowledge">
      <b-form @reset="onResetKnowledge" @submit="onSubmitKnowledge">
        <b-form-group id="input-group-1" label="Skill:" label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="knowledgeData"
              placeholder="Enter a field of knowledge"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="$bvModal.hide('knowledge-modal')">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </card>



</template>
<script>
import axios from 'axios'
import {mapState} from "vuex";

export default {
  name: "JobseekerProfile",
  computed: mapState({
    token: state => state.token,
    logged: state => state.logged,
    isJs: state => state.isJS,
  }),
  /**
   * Sets all the data used
   * @returns {{languages: [{year: string, grade: string, language: string}, {year: string, grade: string, language: string}], prova: string, addJobData: {year: string, place: string, job: string}, basicData: {address: string, name: string, description: string, disponibility: null, user_email: string}, index: number, addLanguageData: {year: string, grade: string, language: string}, pastJobs: [{year: string, place: string, job: string}, {year: string, place: string, job: string}], addFormationData: {institution: string, year: string, degree: string}, addBasicData: {address: string, name: string, description: string, disponibility: string, user_email: string}, token, skills: string[], isFormation: boolean, academicForms: [{institution: string, year: string, degree: string}, {institution: string, year: string, degree: string}], logged: boolean, knowledgeData: string, options: [{text: string, value: null}, {text: string, value: string}, {text: string, value: string}, {text: string, value: string}]}}
   */
  data() {
    return {
      academicForms: [],
      pastJobs: [],
      languages: [],
      skills: [],
      basicData: {
        name: '',
        user_email: '',
        address: '',
        description: '',
        disponibility: null
      },
      isFormation: true,
      index: 0,
      options: [
        {value: null, text: 'Select your disponibility'},
        {value: 'full time', text: 'Full time'},
        {value: 'part time', text: 'Part time'},
        {value: 'weekend', text: 'Weekend'}],
      prova: '',
      addFormationData: {
        degree: '',
        institution: '',
        year: '',
      },
      addJobData: {
        job: '',
        place: '',
        year: '',
      },
      addLanguageData: {
        language: '',
        grade: '',
        year: '',
      },
      knowledgeData: '',
      addBasicData: {
        name: '',
        user_email: '',
        address: '',
        description: '',
        disponibility: '',
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
     * changes view to the job seeker profile component
     */
    getProfile() {
      this.$router.go()
    },
    /**
     * shows formation modal
     */
    addFormation() {
      this.$refs['addFormationModal'].show()
    },
    /**
     * initializes formation modal
     */
    initFormation() {
      this.addFormationData.degree = ''
      this.addFormationData.institution = ''
      this.addFormationData.year = ''

    },
    /**
     * sends formation data to db
     */
    onSubmitFormation(evt) {
      evt.preventDefault()
      this.academicForms.push(this.addFormationData)
      this.putData(evt)
      this.$refs.addFormationModal.hide()
      this.initFormation()
    },

    /**
     * ressets formation modal
     * @param evt
     */
    onResetFormation(evt) {
      evt.preventDefault()
      this.initFormation()
    },
    /**
     * shows job modal
     */
    addJob() {
      this.$refs['addJobModal'].show()
    },
    /**
     * initializes job modal
     */
    initJob() {
      this.addJobData.job = ''
      this.addJobData.place = ''
      this.addJobData.year = ''

    },
    /**
     * sends job data to db
     */
    onSubmitJob(evt) {
      evt.preventDefault()
      this.pastJobs.push(this.addJobData)
      this.putData(evt)
      this.$refs.addJobModal.hide()
      this.initJob()
    },
    /**
     * ressets job modal
     * @param evt
     */
    onResetJob(evt) {
      evt.preventDefault()
      this.initJob()
    },
    /**
     * shows language modal
     */
    addLanguage() {
      this.$refs['addLanguageModal'].show()
    },
    /**
     * initializes language modal
     */
    initLanguage() {
      this.addLanguageData.language = ''
      this.addLanguageData.grade = ''
      this.addLanguageData.year = ''

    },
    /**
     * sends language data to db
     */
    onSubmitLanguage(evt) {
      evt.preventDefault()
      this.languages.push(this.addLanguageData)
      this.putData(evt)
      this.$refs.addLanguageModal.hide()
      this.initLanguage()
    },
    /**
     * ressets language modal
     * @param evt
     */
    onResetLanguage(evt) {
      evt.preventDefault()
      this.initLanguage()
    },
    /**
     * shows skills modal
     */
    addKnowledge() {
      this.$refs['addKnowledgeModal'].show()
    },
    /**
     * initializes skills modal
     */
    initKnowledge() {
      this.knowledgeData = ''
    },
    /**
     * sends skills data to db
     */
    onSubmitKnowledge(evt) {
      evt.preventDefault()
      this.skills.push(this.knowledgeData)
      this.putData(evt)
      this.$refs.addKnowledgeModal.hide()
      this.initKnowledge()
    },
    /**
     * ressets skills modal
     * @param evt
     */
    onResetKnowledge(evt) {
      evt.preventDefault()
      this.initKnowledge()
    },
    /**
     * shows basic data modal
     */
    addBasic() {
      this.$refs['addBasicModal'].show()
    },
    /**
     * gets data from db
     */
    getData() {
      const path = 'http://0.0.0.0:8080/jobseeker'
      axios.get(path, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            this.academicForms = res.data.academicForms
            this.pastJobs = res.data.pastJobs
            this.languages = res.data.languages
            this.skills = []
            res.data.skills.forEach(element => this.skills.push(element.skill_name));
            this.basicData = res.data.basicData
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
     * deletes formation data
     * @param degree
     */
    deleteFormation(degree) {
      while (degree !== this.academicForms[this.index].degree) {
        this.index++
      }
      this.academicForms.splice(this.index, 1)
      this.index = 0
      this.putDataForm()
    },
    /**
     * deletes job data
     * @param j
     */
    deleteJob(j) {
      while (j !== this.pastJobs[this.index].job) {
        this.index++
      }
      this.pastJobs.splice(this.index, 1)
      this.index = 0
      this.putDataForm()
    },
    /**
     * deletes language data
     * @param l
     */
    deleteLanguage(l) {
      while (l !== this.languages[this.index].language) {
        this.index++
      }
      this.languages.splice(this.index, 1)
      this.index = 0
      this.putDataForm()
    },
    /**
     * deletes skills data
     * @param k
     */
    deleteKnowledge(k) {
      while (k !== this.skills[this.index]) {
        this.index++
      }
      this.skills.splice(this.index, 1)
      this.index = 0
      this.putDataForm()
    },
    /**
     * adds data to db
     */
    putData(evt) {
      evt.preventDefault()
      axios.put('http://0.0.0.0:8080/jobseeker', {
        academic_form_forms: this.academicForms,
        past_job_forms: this.pastJobs,
        language_forms: this.languages,
        skills: this.skills,
        job_seeker_form: this.basicData
      }, {
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
    putDataForm() {
      axios.put('http://0.0.0.0:8080/jobseeker', {
        academic_form_forms: this.academicForms,
        past_job_forms: this.pastJobs,
        language_forms: this.languages,
        skills: this.skills,
        job_seeker_form: this.basicData
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      })
          .then((res) => {
            this.prova = res.data.token
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
}
</script>
<style></style>
