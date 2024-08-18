import * as webpack from "@cypress/webpack-preprocessor";
import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin";
import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://piellardj.github.io/stereogram-solver/",
		chromeWebSecurity: false,
		specPattern: ["cypress/e2e/**/*.spec.ts"],
		viewportHeight: 679,
		viewportWidth: 1728,
		setupNodeEvents(on, config) {
			const options = {
				webpackOptions: require("./webpack.cypress"),
				watchOptions: {},
			};
			require("cypress-mochawesome-reporter/plugin")(on);
			addMatchImageSnapshotPlugin(on);
			on("file:preprocessor", webpack(options));

			return config;
		},
	},
	reporter: "cypress-mochawesome-reporter",
	reporterOptions: {
		html: false,
		json: true,
		overwrite: false,
		reportDir: "cypress/reports",
	},
});
