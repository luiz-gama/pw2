import prisma from '../../utils/prismaClient';
import { CreateProductInput, UpdateProductInput } from './product.types';

export const listProducts = () => {
  return prisma.product.findMany();
};

export const productExistsByName = (name: string) => {
  return prisma.product.findUnique({ where: { name } });
};

export const createProduct = (product: CreateProductInput) => {
  return prisma.product.create({ data: product });
};

export const getProductById = (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

export const updateProductById = (id: string, data: UpdateProductInput) => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProductById = (id: string) => {
  return prisma.product.delete({ where: { id } });
};
