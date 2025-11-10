import express, { Request, Response } from "express";
import { ComplianceService } from "../../../core/application/ComputeCB";
import { BankRepository } from "../../outbound/postgres/BankRepository";
import { PoolRepository } from "../../outbound/postgres/PoolRepository";

const router = express.Router();
const complianceService = new ComplianceService();
const bankRepo = new BankRepository();
const poolRepo = new PoolRepository();

router.post("/cb/calculate", async (req: Request, res: Response) => {
  const { ship_id, year, actualIntensity, fuelConsumption } = req.body;

  if (!ship_id || !year || !actualIntensity || !fuelConsumption)
    return res.status(400).json({ error: "Missing parameters" });

  try {
    const cb = complianceService.computeShipCB(actualIntensity, fuelConsumption);
    const entry = await bankRepo.addEntry(ship_id, year, cb);
    res.json({ message: "CB calculated and stored", cb, entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
