import { NextFunction, Request, Response } from 'express';

import { UserTypes } from '../resources/userType/userType.constants';

type AllowedTypes = UserTypes | UserTypes[];

const checkAuthorization =
  (allowed: AllowedTypes = UserTypes.ADMIN) =>
  (req: Request, res: Response, next: NextFunction) => {
    const allowedTypes = Array.isArray(allowed) ? allowed : [allowed];
    const userType = req.session?.userType;

    if (!userType || !allowedTypes.includes(userType)) {
      return res.status(403).json({ msg: 'Acesso negado.' });
    }

    return next();
  };

export default checkAuthorization;
