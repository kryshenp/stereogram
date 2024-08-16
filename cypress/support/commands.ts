Cypress.Commands.add("moveSliderToPosition", (positionPercentual: number): void => {
  cy.get(".full-width-range").invoke("attr", "max").then(sliderWidth => {
    const numWidth = Number(sliderWidth);
    const displacement = Math.ceil(numWidth * positionPercentual / 100);

    expect(numWidth).to.be.gt(0);
    cy.get(".full-width-range")
      .invoke("val", displacement).trigger("input").trigger("change");
    cy.contains("Displacement").find("span").should("have.text", `${displacement}px`);
  });
});
