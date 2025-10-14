import bcrypt from 'bcryptjs';

import prisma from '../../utils/prismaClient';
import { UserTypes } from '../userType/userType.constants';
import { LoginDto, SignUpDto } from './auth.type';

const SALT_ROUNDS = 10;

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (payload: SignUpDto) => {
  const { password, userTypeId, ...rest } = payload;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
      userTypeId: userTypeId ?? UserTypes.CLIENT
    }
  });
};

export const authenticateUser = async ({ email, password }: LoginDto) => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return null;

  return user;
};

export const checkIsAdmin = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { userTypeId: true }
  });

  return user?.userTypeId === UserTypes.ADMIN;
};
