import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
