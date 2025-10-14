import { NextFunction, Request, Response } from 'express';

const createLangCookie = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies?.lang) {
    res.cookie('lang', 'pt-BR');
  }

  next();
};

export default createLangCookie;
