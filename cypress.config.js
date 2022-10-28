const { defineConfig } = require("cypress");
const axios = require("axios");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const testDataApiEndpoint = `${config.baseUrl}testData`;
      console.log("🚀 ~ file: cypress.config.js ~ line 10 ~ setupNodeEvents ~ testDataApiEndpoint", testDataApiEndpoint)
      on("task", {
        async "signup:prepare"(email) {
          const { data } = await axios.post(`${testDataApiEndpoint}/pre_signup`, { email: email })
          return data
        },
      });
    },
  },
});
