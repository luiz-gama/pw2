import { Request, Response } from 'express';

import { CreateUserInput, UpdateUserInput } from './user.type';
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser
} from './user.service';

const toPublicUser = (user: { password?: string } & Record<string, unknown>) => {
  const { password, ...rest } = user;
  return rest;
};

const index = async (_req: Request, res: Response) => {
  const users = await listUsers();
  return res.json(users.map(toPublicUser));
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }

  return res.json(toPublicUser(user));
};

const create = async (req: Request, res: Response) => {
  const payload = req.body as CreateUserInput;

  if (!payload.name || !payload.email || !payload.password) {
    return res.status(400).json({ msg: 'Nome, email e senha são obrigatórios' });
  }

  try {
    const newUser = await createUser(payload);
    return res.status(201).json(toPublicUser(newUser));
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao criar usuário' });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as UpdateUserInput;

  try {
    const updatedUser = await updateUser(id, payload);
    return res.json(toPublicUser(updatedUser));
  } catch (error) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }
};

export default {
  index,
  read,
  create,
  update,
  remove
};
