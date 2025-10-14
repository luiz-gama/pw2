import bcrypt from 'bcryptjs';

import prisma from '../../utils/prismaClient';
import { createUser as createAuthUser } from '../auth/auth.service';
import { CreateUserInput, UpdateUserInput } from './user.type';

const SALT_ROUNDS = 10;

export const listUsers = () => {
  return prisma.user.findMany({
    include: { userType: true }
  });
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { userType: true }
  });
};

export const createUser = (payload: CreateUserInput) => {
  return createAuthUser(payload);
};

export const updateUser = async (id: string, payload: UpdateUserInput) => {
  const { password, ...rest } = payload;
  const data: Record<string, unknown> = { ...rest };

  if (password) {
    data.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  if (Object.keys(data).length === 0) {
    return getUserById(id);
  }

  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = (id: string) => {
  return prisma.user.delete({ where: { id } });
};
