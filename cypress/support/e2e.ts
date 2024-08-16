import {addMatchImageSnapshotCommand} from "@simonsmith/cypress-image-snapshot/command";
import "./commands";

addMatchImageSnapshotCommand({
  failureThreshold: 0, // threshold for entire image
  failureThresholdType: "percent", // percent of image or number of pixels
  customDiffConfig: {threshold: 0}, // threshold for each pixel
  capture: "viewport", // capture viewport in screenshot
  e2eSpecDir: "cypress/e2e/",
});
