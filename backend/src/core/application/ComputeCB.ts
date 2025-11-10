import { IComplianceRepository } from "../ports/IComplianceRepository";
import { VLSFO_CONVERSION, TARGET_INTENSITY_2025 } from "../domain/constants";

export class ComplianceService implements IComplianceRepository {
  computeCB(
    targetIntensity: number,
    actualIntensity: number,
    fuelConsumption: number,
    conversionFactor: number
  ): number {
    const energy = fuelConsumption * conversionFactor; // MJ
    return (targetIntensity - actualIntensity) * energy; // gCO₂e
  }

  computeShipCB(actualIntensity: number, fuelConsumption: number): number {
    return this.computeCB(
      TARGET_INTENSITY_2025,
      actualIntensity,
      fuelConsumption,
      VLSFO_CONVERSION
    );
  }
}
