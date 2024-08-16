import { customToleranceForCI } from "./helpers";


describe("Stereogram solver", () => {
  const presets = ["shark", "atomium"];
  const sliderPositions = [1, 33, 66, 99 ];

  beforeEach(() => {
    cy.visit("/");
  });

  presets.forEach(preset => {
    context(`Preset: ${preset}`, () => {
      sliderPositions.forEach(sliderPosition => {
        it(`Verify graphics with ${sliderPosition}% stereo filter overlap`, () => {
          cy.get("#preset-select").should("have.value", "shark.jpg");

          // set custom preset image
          cy.get("img").invoke("attr", "src").then((initialImageSrc) => {
            if (preset !== "shark") {
              cy.get("#preset-select").select(`${preset}.jpg`, {force: true});
              cy.get("#preset-select").should("have.value", `${preset}.jpg`);
              cy.get("img").invoke("attr", "src").should("not.eq", initialImageSrc);
            }
          }).then(() => {
            cy.get(".full-width-range").invoke("attr", "max").then(width => {
              expect(Number(width)).to.be.gt(0);
              cy.get("img").matchImageSnapshot(`${preset}_original`); // verify source image
              cy.moveSliderToPosition(sliderPosition);

              // verify filtered image
              cy.get("canvas").matchImageSnapshot(`${preset}_${sliderPosition}`, customToleranceForCI(0.12));
            });
          });
        });
      });
    });
  });

  context("Custom uploaded file", () => {
    sliderPositions.forEach(sliderPosition => {
      it(`Verify graphics with ${sliderPosition}% stereo filter overlap`, () => {
        cy.get("#image-upload").selectFile("cypress/fixtures/lynch_weather_report.png");
        cy.get("#image-upload").invoke("val").should("match", /lynch_weather_report.png$/);
        cy.get("#preset-select").should("have.value", null);
        cy.get("img").matchImageSnapshot(`lynch_weather_report_original`);
        cy.moveSliderToPosition(sliderPosition);

        // verify filtered image
        cy.get("canvas").matchImageSnapshot(`lynch_weather_report_${sliderPosition}`, customToleranceForCI(0.052));

      });
    });
  });

  it("Example of failing snapshot check", () => {
    cy.get("#preset-select").should("have.value", "shark.jpg");
    cy.get("img").invoke("attr", "src").then((initialImageSrc) => {
      cy.get("#preset-select").select(`planet.jpg`, {force: true});
      cy.get("#preset-select").should("have.value", `planet.jpg`);
      cy.get("img").invoke("attr", "src").should("not.eq", initialImageSrc);
    });
    cy.moveSliderToPosition(50);

    /**
     * verify filtered image
     * observe the snapshot benchmark vs result comparison image file at
     * ../../stereogramSolverInMultipleTests.spec.ts/__diff_output__/planet_100_should_fail.diff.png
     */
    cy.get("img").matchImageSnapshot(`planet_100_should_fail`);
  });

  it("Example of custom setup of tolerance to difference", () => {
    cy.get("#preset-select").should("have.value", "shark.jpg");
    cy.get("img").invoke("attr", "src").then((initialImageSrc) => {
      cy.get("#preset-select").select(`planet.jpg`, {force: true});
      cy.get("#preset-select").should("have.value", `planet.jpg`);
      cy.get("img").invoke("attr", "src").should("not.eq", initialImageSrc);
    });
    cy.moveSliderToPosition(50);

    /**
     * verify filtered image
     * the step with custom tolerance would pass even if we had difference between rendered graphics and benchmark image
     * the difference of 2816px equal to 1.07421875% will be tolerated
     */
    cy.get("img").matchImageSnapshot(`planet_100_should_fail`, {failureThreshold: 0.0108});
  });
});
