import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const ReasonPhrases = {
  CONFLICT: 'Conflict',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
} as const;

import { createProduct, alreadyExists } from './product.service';
import { ProdCreateDto, ProdUpdateDto } from './product.types';

const prisma = new PrismaClient();

/**
 * Tratamento centralizado de erros do Prisma + fallback genérico
 */
function handlePrismaError(err: unknown, res: Response) {
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Validation Error',
      message: 'Os dados fornecidos são inválidos.',
      details: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Database Error',
      message: err.message,
      code: err.code,
    });
  }

  console.error('Erro não tratado em product.controller:', err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: 'Erro interno do servidor. Tente novamente mais tarde.',
  });
}

/**
 * GET /products
 * Lista todos os produtos
 */
async function index(req: Request, res: Response): Promise<void> {
  try {
    const products = await prisma.product.findMany();
    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    handlePrismaError(err, res);
  }
}

/**
 * GET /products/:id
 * Busca um produto por ID (string)
 */
async function read(req: Request, res: Response): Promise<void> {
  const id = req.params.id; // agora é string

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'ID é obrigatório.' });
    return;
  }

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Produto não encontrado.' });
      return;
    }

    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    handlePrismaError(err, res);
  }
}

/**
 * POST /products
 * Cria um novo produto
 */
async function create(req: Request, res: Response): Promise<void> {
  const newProduct = req.body as ProdCreateDto;

  try {
    const exists = await alreadyExists(newProduct.name);
    if (exists) {
      res.status(StatusCodes.CONFLICT).json({
        error: ReasonPhrases.CONFLICT,
        message: 'Produto já existe.',
      });
      return;
    }

    const product = await createProduct(newProduct);
    res.status(StatusCodes.CREATED).json(product);
  } catch (err) {
    handlePrismaError(err, res);
  }
}

/**
 * PUT /products/:id
 * Atualiza um produto existente
 */
async function update(req: Request, res: Response): Promise<void> {
  const id = req.params.id; // string

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'ID é obrigatório.' });
    return;
  }

  const data = req.body as ProdUpdateDto;

  try {
    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    res.status(StatusCodes.OK).json(updated);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      // P2025 = registro não encontrado para update/delete
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Produto não encontrado.' });
      return;
    }

    handlePrismaError(err, res);
  }
}

/**
 * DELETE /products/:id
 * Remove um produto
 */
async function remove(req: Request, res: Response): Promise<void> {
  const id = req.params.id; // string

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'ID é obrigatório.' });
    return;
  }

  try {
    await prisma.product.delete({ where: { id } });
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Produto não encontrado.' });
      return;
    }

    handlePrismaError(err, res);
  }
}

/**
 * Export default compatível com o router:
 * import productController from './product.controller';
 */
const productController = {
  index,
  read,
  create,
  update,
  remove,
};

export default productController;
