import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_PRISMA_URL!,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;

export default prisma;
