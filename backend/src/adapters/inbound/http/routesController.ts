import { Router, Request, Response } from "express";
import { RouteRepository } from "../../outbound/postgres/RouteRepository";
import { ComparisonService } from "../../../core/application/ComputeComparison";

const router = Router();
const routeRepo = new RouteRepository();
const comparisonService = new ComparisonService();

router.get("/routes", async (_req: Request, res: Response) => {
  const routes = await routeRepo.getAllRoutes();
  res.json(routes);
});

router.post("/routes/:id/baseline", async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    return res.status(400).json({ error: "Route ID is required." });
  }

  await routeRepo.setBaseline(id);
  res.json({ message: `Route ${id} set as baseline.` });
});


router.get("/routes/comparison", async (_req: Request, res: Response) => {
  try {
    const comparison = await comparisonService.compareRoutes();
    res.json(comparison);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// export default router;
module.exports = router;


