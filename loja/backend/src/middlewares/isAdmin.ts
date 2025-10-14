import { NextFunction, Request, Response } from 'express';

import { checkIsAdmin } from '../resources/auth/auth.service';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userIdHeader = req.headers['x-user-id'];
  const userId = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader;

  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ msg: 'Identificador do usuário ausente' });
  }

  const isUserAdmin = await checkIsAdmin(userId);
  if (!isUserAdmin) {
    return res.status(403).json({ msg: 'Não autorizado' });
  }

  return next();
};

export default isAdmin;
