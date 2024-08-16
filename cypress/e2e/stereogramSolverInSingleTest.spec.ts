import { customToleranceForCI } from "./helpers";


describe("Stereogram solver", () => {
  beforeEach(() => {
    cy.visit("https://piellardj.github.io/stereogram-solver/");
  });

  it("Check default and custom images with filter overlaps", () => {
    const presets = ["thumbsup", "planet", "dolphins", "atomium", "shark"];
    const sliderPositions = [0, 25, 50, 75, 100];

    cy.get("#preset-select").should("have.value", "shark.jpg");

    // check preset images stereograms with filter displacement of 0, 25, 50, 75 and 100 percent
    presets.forEach(preset => {
      cy.get("img").invoke("attr", "src").then((initialImageSrc) => {
        cy.get("#preset-select").select(`${preset}.jpg`, {force: true});
        cy.get("#preset-select").should("have.value", `${preset}.jpg`);
        cy.get("img").invoke("attr", "src").should("not.eq", initialImageSrc); // need to wait for image size to reflect image change
      }).then(() => {
        cy.get(".full-width-range").invoke("attr", "max").then(width => {
          expect(Number(width)).to.be.gt(0);
          cy.get("img").matchImageSnapshot(`${preset}_original`);

          sliderPositions.forEach(sliderPosition => {
            cy.moveSliderToPosition(sliderPosition);
            cy.get("canvas").matchImageSnapshot(`${preset}_${sliderPosition}`, customToleranceForCI(0.12));
          });
        });
      });
    });

    // check custom images stereograms with filter displacement of 0, 25, 50, 75 and 100 percent
    cy.get("#image-upload").selectFile("cypress/fixtures/lynch_weather_report.png");
    cy.get("#image-upload").invoke("val").should("match", /lynch_weather_report.png$/);
    cy.get("#preset-select").should("have.value", null);
    cy.get("img").matchImageSnapshot(`lynch_weather_report_original`);

    sliderPositions.forEach(sliderPosition => {
      cy.moveSliderToPosition(sliderPosition);
      cy.get("canvas").matchImageSnapshot(`lynch_weather_report_${sliderPosition}`, customToleranceForCI(0.12));
    });
  });
});
