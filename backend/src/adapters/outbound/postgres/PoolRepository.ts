import { PrismaClient } from "../../../../generated/prisma";
const prisma = new PrismaClient();

export class PoolRepository {
  async createPool(year: number, members: { ship_id: string; cb_before: number; cb_after: number }[]) {
    return prisma.pool.create({
      data: {
        year,
        members: {
          create: members.map(m => ({
            ship_id: m.ship_id,
            cb_before: m.cb_before,
            cb_after: m.cb_after,
          })),
        },
      },
      include: { members: true },
    });
  }

  async listPools() {
    return prisma.pool.findMany({ include: { members: true } });
  }
}
