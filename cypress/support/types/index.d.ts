declare namespace Cypress {
  interface Chainable {
    /**
     * Moves the slider to the specified percentage position.
     *
     * @param positionPercentual - Percentage value of filter overlap, ranging from 0 to 100.
     * @example - cy.moveSliderToPosition(50); // Moves the filter slider to the middle of the image.
     */
    moveSliderToPosition(positionPercentual: number): void;
  }
}
