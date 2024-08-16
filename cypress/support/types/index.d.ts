declare namespace Cypress {
  interface Chainable {
    /**
     * @param positionPercentual - percentual value of filter overlap - from 0 to 100
     * @example - cy.moveSliderToPosition(50); to move filter to the middle of the image
     */
    moveSliderToPosition(positionPercentual: number): void;
  }
}
