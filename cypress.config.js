const { defineConfig } = require("cypress");
const axios = require("axios");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const testDataApiEndpoint = `${config.baseUrl}testData`;
      on("task", {
        async "signup:prepare"(email) {
          const { data } = await axios.post(`${testDataApiEndpoint}/pre_signup`, { email: email })
          return data
        },
      });
    },
  },
});
