import { addMatchImageSnapshotCommand } from "@simonsmith/cypress-image-snapshot/command";
import "./commands";

addMatchImageSnapshotCommand({
	failureThreshold: 0.00001, // threshold for image difference 0.001%
	failureThresholdType: "percent",
	customDiffConfig: { threshold: 0 }, // strict pixel comparison
	capture: "viewport",
	e2eSpecDir: "cypress/e2e/",
});
