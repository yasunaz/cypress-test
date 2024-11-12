const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1980,
  viewportHeight: 1080,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
