/**
 *
 * The "dockerized" solution still shows a small difference between the snapshot generated locally and the image on CI.
 * The difference is in the rendering of the bottom row of pixels, which may be caused
 * by the ARM architecture of the local Apple M1 machine and the x86_64 (64-bit) architecture of the remote GHA machine.
 * TODO: Find a way to generate snapshots that do not require customToleranceForCI.
 *
 * @param toleranceInPercent percentual value of tolerated difference
 * @returns failureThreshold option for matchImageSnapshot
 */
export const customToleranceForCI = (toleranceInPercent: number) => Cypress.env("GHA") ? { failureThreshold: toleranceInPercent / 100 } : {};
