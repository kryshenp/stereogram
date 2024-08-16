Cypress.Commands.add("moveSliderToPosition", (positionPercentual: number): void => {
	if (positionPercentual < 0 || positionPercentual > 100) {
		throw new Error("Slider position must be between 0 and 100.");
	}

	cy.get(".full-width-range").invoke("attr", "max").then(sliderWidth => {
		const numWidth = Number(sliderWidth);
		const displacement = Math.ceil(numWidth * positionPercentual / 100);

		expect(numWidth).to.be.gt(0);
		cy.get(".full-width-range")
			.invoke("val", displacement).trigger("input").trigger("change");
		cy.contains("Displacement").find("span").should("have.text", `${displacement}px`);
	});
});
