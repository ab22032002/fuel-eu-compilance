import express, { Request, Response } from "express";
import { ComplianceService } from "../../../core/application/ComputeCB";
import { BankRepository } from "../../outbound/postgres/BankRepository";
import { PoolRepository } from "../../outbound/postgres/PoolRepository";

const router = express.Router();
const complianceService = new ComplianceService();
const bankRepo = new BankRepository();
const poolRepo = new PoolRepository();

// 🔹 Calculate Compliance Balance and store in Bank
router.post("/cb/calculate", async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing. Use JSON format." });
  }

  const { ship_id, year, actualIntensity, fuelConsumption } = req.body;
  if (!ship_id || !year || !actualIntensity || !fuelConsumption)
    return res.status(400).json({ error: "Missing parameters." });

  const cb = complianceService.computeShipCB(actualIntensity, fuelConsumption);
  const entry = await bankRepo.addEntry(ship_id, year, cb);

  res.json({ message: "CB calculated and stored", cb, entry });
});


// 🔹 List Bank Entries
router.get("/bank/list", async (_req: Request, res: Response) => {
  try {
    const data = await bankRepo.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bank entries" });
  }
});

// 🔹 Create Pool (share CBs)
router.post("/pool/create", async (req: Request, res: Response) => {
  try {
    const { year, members } = req.body;
    if (!year || !Array.isArray(members))
      return res.status(400).json({ error: "Invalid payload" });

    const pool = await poolRepo.createPool(year, members);
    res.json({ message: "Pool created", pool });
  } catch (err) {
    res.status(500).json({ error: "Failed to create pool" });
  }
});

// 🔹 List Pools
router.get("/pool/list", async (_req: Request, res: Response) => {
  try {
    const pools = await poolRepo.listPools();
    res.json(pools);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pools" });
  }
});

module.exports = router;
