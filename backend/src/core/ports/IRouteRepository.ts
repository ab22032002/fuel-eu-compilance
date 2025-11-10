import { Route } from "../../../generated/prisma";

export interface IRouteRepository {
  getAllRoutes(): Promise<Route[]>;
  getBaselineRoute(): Promise<Route | null>;
  setBaseline(routeId: string): Promise<void>;
}

