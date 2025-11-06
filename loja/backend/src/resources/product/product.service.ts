// Arquivo src/resources/product/product.service.ts
import { PrismaClient, Product } from '@prisma/client';
import { ProdCreateDto } from './product.types';

const prisma = new PrismaClient();

export async function createProduct(
  product: ProdCreateDto
): Promise<Product> {
  return await prisma.product.create({ data: product });
}

export async function alreadyExists(
  name: string
): Promise<boolean> {
  const existingProduct = await prisma.product.findUnique({
    where: { name },
  });
  return existingProduct !== null;
}
