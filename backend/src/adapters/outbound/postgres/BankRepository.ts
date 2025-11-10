import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export class BankRepository {
  async addEntry(ship_id: string, year: number, amount_gco2eq: number) {
    return prisma.bankEntry.create({
      data: { ship_id, year, amount_gco2eq },
    });
  }

  async getAll() {
    return prisma.bankEntry.findMany();
  }
}
