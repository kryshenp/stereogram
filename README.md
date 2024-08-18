# Stereogram Solver Testing

This repository contains the infrastructure and test suite for the Stereogram Solver application using Cypress Image Snapshot Testing.

The tests can be run locally or remotely on CI. To ensure snapshot integrity when rendering graphic content on different devices, it is recommended to run the tests using Docker.

## Prerequisites

-   Docker must be installed to run tests on your machine.
-   Node.js and npm are required if you need to develop or modify tests in Cypress open mode without Docker.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kryshenp/stereogram.git
    cd stereogram
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Run Tests

### Run Tests in Docker

To run tests using Docker:

```bash
docker run -v $PWD:/e2e -w /e2e cypress/included:latest
```

If you need to update snapshots, run tests with the `updateSnapshots=true` environment variable:

```bash
docker run -v $PWD:/e2e -w /e2e cypress/included:latest \
    npx cypress run --env updateSnapshots=true
```

### Run Tests in Headless Mode Without Docker

```bash
npm run test
```

### Run Tests in Headed Mode Without Docker for Debugging

```bash
npm run open
```

## Cypress Snapshot Configuration Note

Cypress is configured through the [Cypress config file](./cypress.config.ts), which specifies the base URL, viewport size, and other testing parameters. Configurations specific to snapshot capturing are set in the `addMatchImageSnapshotCommand` at the [support file](./cypress/support/e2e.ts). The failure threshold for snapshot differences is set to 0.001%. For example, for an image of size 950 × 950 px, the tolerated difference would be 9 px. Some tests have a custom tolerance set via the `failureThreshold` option passed into the `matchImageSnapshot` command call. For more information and the reasons behind custom options, refer to point 1 of [Notes on Improvements](#notes-on-improvements).

## Applied Tests

The Stereogram Solver app is partly covered by 15 tests that are mainly focused on the app's main feature—the stereogram itself. The test suites cover switching between all preset images and checking the functionality of the stereo-filter application at different slider positions. Additionally, the suites include a test for checking stereogram functionality on a custom uploaded image and a demonstration of a test failure when compared with a benchmark image that was intentionally modified. Finally, the suite includes a test demonstrating the custom pixel tolerance of the matcher.

The suite contains two specs that demonstrate different approaches to test coverage. The “multiple test” suite demonstrates a standard data-driven testing approach, where the same test algorithm is applied to different input data and configurations. The “multiple test” approach can be problematic if the app contains a loader on page visits, and the loading process takes longer than acceptable in a CI pipeline. This problem can be overcome by using the “single test” approach, where the page is visited only once, and a loop iterates through different data and configurations within a single test. The downside of this approach is longer waiting times in case of a test rerun on failure.

## Check Test Results and Artifacts

### Text restults

When running tests in _headless_ mode, the CLI produces a log containing all the main information about the test run, such as the version of Cypress, browser, Node.js, a list of found spec files, a list of tests with marks for failing and passing tests, error log messages from failed test cases, logs with paths of produced screenshots and snapshots, an HTML report, and a summary table with execution times and statuses of tests in each spec.

### Visual Results

When running tests in _headed_ mode, all logs are present in the Cypress Test Runner App log.

Each test run produces screenshots, snapshots, and HTML reports:

-   The `cypress/screenshots` folder contains screenshots captured at the moment of test failure.
-   The `snapshots/<name_of_spec>.spec.ts` folder contains actual snapshots. The `__diff_output__` subfolder contains graphical representations of snapshot comparisons. Example [here](#diff-image-example).
-   The `reports` folder contains an HTML report for the most recent test run.

## Cypress Docker Image

To achieve equality in graphics rendering for snapshot comparison between the local machine and CI, the official [Docker image cypress/included](https://hub.docker.com/r/cypress/included) is used. The image contains all operating system dependencies, Cypress, and some pre-installed browsers.

## CI Pipeline

The repository contains one workflow for GitHub Actions that is triggered on every commit to any branch. The action can also be triggered manually with an input for snapshot updates (default is false).
Check the example of CI run [without](https://github.com/kryshenp/stereogram/actions/runs/10425956757) and [with](https://github.com/kryshenp/stereogram/actions/runs/10423287261) snapshots update.

## CI Artifacts

The CI pipeline produces multiple artifacts that can be useful for analyzing test results. Download and unzip the **artifacts** folder. It should contain 3 subfolders:

-   **screenshots**: Contains screenshots of the viewport for failed tests captured at the moment of test failure.
-   **reports**: Contains an HTML report for the test run.
-   **snapshots**: Contains subfolders with names in the format \`<name_of_spec>.spec.ts\`. Each subfolder should contain the actual version of snapshots used in graphics comparison. If any test in the spec file failed on the snapshot matching step, a subfolder \`**diff_output**\` should be present containing images in the format **\*.diff.png** with a graphical representation of pixel differences between the benchmark snapshot (left side), the snapshot of the actually rendered graphics (right side); the middle image represents the benchmark and captured image overlay with differences marked in red colour.

#### Diff Image Example:

![For example:](cypress/fixtures/snapshot_difference_example.diff.png "Example of detected visual difference")

## Notes on Improvements

Although the solution is functional and meets the requirements of the technical task at a presentable level, it contains several flaws that might be improved:

1.  A custom `failureThreshold` in the `matchImageSnapshot` command was set in several tests because, despite running the tests in a Docker environment, the benchmark snapshots were captured on a local machine while running the tests with the `updateSnapshots=true` option on an Apple M1 machine with ARM architecture. In GHA CI, the machine with Intel or AMD-based x86_64 (64-bit) architecture captures a difference in the rendered bottom pixel row of the image. Even though this difference can be ignored in the scope of this task, it affects 3 to 4 hundred pixels and can be problematic for more precise comparisons. The solution could be to use an ARM-based runner, check different Docker images from Cypress, or attempt to create a custom Docker image where the graphics are rendered correctly. An alternative and less costly solution would be to generate benchmark images in CI and download them from artifacts to the project. The downside of that approach would be the need to manually check the correctness of each generated benchmark image.

_Observe the bottom row in the local vs CI rendering difference example:_
![Difference example:](cypress/fixtures/local_vs_ci_diff_example.jpg)

_Bottom row in detail_
![Difference example:](cypress/fixtures/local_vs_ci_diff_detail.png)

2. When running the tests without using Docker, the benchmark snapshots produced are of a completely different size than those in Docker. These benchmark snapshots wouldn't be consistent with CI-captured snapshots. It is necessary to further configure the environment to eliminate this difference.Moreover, the snapshots produced in the test run without using Docker are saved into the _cypress/snapshots_ folder. In contrast, the Docker solution saves snapshots into the folders mentioned in [Visual results](#visual-results). f the project continues to develop, it will be necessary to unify the benchmark snapshots location folder.

## Author

[Pavlo Kryshenyk](https://github.com/kryshenp) 🫡
