/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const faker = require("faker");

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  on("task", {
    freshUser() {
      user = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };
      return user;
    }
  })
  return config
}
