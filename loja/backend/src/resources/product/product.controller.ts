import { Request, Response } from 'express';

import {
  createProduct,
  deleteProductById,
  getProductById,
  listProducts,
  productExistsByName,
  updateProductById
} from './product.service';
import { CreateProductInput, UpdateProductInput } from './product.types';

const ensureValidPayload = (payload: CreateProductInput | UpdateProductInput) => {
  const { name, price, stock } = payload;

  if (payload === undefined) return 'Payload ausente';

  if (name !== undefined && name.trim().length < 2) {
    return 'Nome do produto deve conter ao menos 2 caracteres';
  }

  if (price !== undefined && (typeof price !== 'number' || Number.isNaN(price) || price < 0)) {
    return 'Preço deve ser um número maior ou igual a 0';
  }

  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    return 'Estoque deve ser um número inteiro maior ou igual a 0';
  }

  return null;
};

const index = async (_req: Request, res: Response) => {
  const products = await listProducts();
  return res.json(products);
};

const create = async (req: Request, res: Response) => {
  const payload = req.body as CreateProductInput;
  const validationError = ensureValidPayload(payload);

  if (validationError) {
    return res.status(400).json({ msg: validationError });
  }

  try {
    const existing = await productExistsByName(payload.name);
    if (existing) {
      return res.status(409).json({ msg: 'Produto já existe' });
    }

    const product = await createProduct(payload);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao criar produto' });
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  return res.json(product);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as UpdateProductInput;
  const validationError = ensureValidPayload(payload);

  if (validationError) {
    return res.status(400).json({ msg: validationError });
  }

  try {
    const updated = await updateProductById(id, payload);
    return res.json(updated);
  } catch (error) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteProductById(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }
};

export default {
  index,
  create,
  read,
  update,
  remove
};
