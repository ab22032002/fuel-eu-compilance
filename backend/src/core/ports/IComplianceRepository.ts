export interface IComplianceRepository {
  computeCB(
    targetIntensity: number,
    actualIntensity: number,
    fuelConsumption: number,
    conversionFactor: number
  ): number;
}
