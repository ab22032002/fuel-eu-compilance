import { PrismaClient } from "../../../../generated/prisma";
import { IRouteRepository } from "../../../core/ports/IRouteRepository";

const prisma = new PrismaClient();

export class RouteRepository implements IRouteRepository {
  async getAllRoutes() {
    return prisma.route.findMany();
  }

  async getBaselineRoute() {
    return prisma.route.findFirst({ where: { is_baseline: true } });
  }

  async setBaseline(routeId: string): Promise<void> {
  if (!routeId) throw new Error("Route ID is required.");
  await prisma.route.updateMany({ data: { is_baseline: false } });
  await prisma.route.update({
    where: { route_id: routeId },
    data: { is_baseline: true },
  });
  }
}
