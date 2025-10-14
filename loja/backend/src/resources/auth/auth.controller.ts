import { Request, Response } from 'express';

import { authenticateUser, createUser, findUserByEmail } from './auth.service';
import { LoginDto, SignUpDto } from './auth.type';

const toPublicUser = (user: { password: string } & Record<string, unknown>) => {
  const { password, ...rest } = user;
  return rest;
};

const signup = async (req: Request, res: Response) => {
  const payload = req.body as SignUpDto;

  try {
    const existingUser = await findUserByEmail(payload.email);
    if (existingUser) {
      return res.status(409).json({ msg: 'Email informado já está em uso.' });
    }

    const newUser = await createUser(payload);
    return res.status(201).json(toPublicUser(newUser));
  } catch (error) {
    return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
};

const login = async (req: Request, res: Response) => {
  const credentials = req.body as LoginDto;

  try {
    const user = await authenticateUser(credentials);
    if (!user) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    return res.status(200).json(toPublicUser(user));
  } catch (error) {
    return res.status(500).json({ msg: 'Erro interno do servidor' });
  }
};

const logout = async (_req: Request, res: Response) => {
  return res.status(204).send();
};

export default {
  signup,
  login,
  logout
};
