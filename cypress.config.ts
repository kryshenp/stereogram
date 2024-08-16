import { defineConfig } from "cypress";
import * as webpack from "@cypress/webpack-preprocessor";
import {addMatchImageSnapshotPlugin} from "cypress-image-snapshot/plugin";

// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({

  e2e: {
    baseUrl: "https://piellardj.github.io/stereogram-solver/",
    chromeWebSecurity: false,
    specPattern: ["cypress/e2e/**/*.spec.ts"],
    viewportHeight: 679,
    viewportWidth: 1728,
    setupNodeEvents(on, config) {
      const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require("./webpack.cypress"),
        watchOptions: {},
      };
      addMatchImageSnapshotPlugin(on, config);
      on("file:preprocessor", webpack(options));

      return config;
    },
  },
});
