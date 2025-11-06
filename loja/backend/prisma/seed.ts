import { PrismaClient } from '@prisma/client';

import { UserTypes } from '../src/resources/userType/userType.constants';

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.upsert({
    where: { id: UserTypes.ADMIN },
    update: {},
    create: { id: UserTypes.ADMIN, label: 'admin' }
  });

  await prisma.userType.upsert({
    where: { id: UserTypes.CLIENT },
    update: {},
    create: { id: UserTypes.CLIENT, label: 'client' }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    throw error;
  });
