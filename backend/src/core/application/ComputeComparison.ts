import { Route } from "../../../generated/prisma";
import { RouteRepository } from "../../adapters/outbound/postgres/RouteRepository";
import { TARGET_INTENSITY_2025 } from "../domain/constants";

export class ComparisonService {
  private repo: RouteRepository;

  constructor() {
    this.repo = new RouteRepository();
  }

  async compareRoutes() {
    const baseline = await this.repo.getBaselineRoute();
    if (!baseline) throw new Error("No baseline route set.");

    const routes = await this.repo.getAllRoutes();
    return routes.map((r) => {
      const percentDiff = ((r.ghg_intensity / baseline.ghg_intensity) - 1) * 100;
      const compliant = r.ghg_intensity <= TARGET_INTENSITY_2025;
      return { ...r, percentDiff, compliant };
    });
  }
}
