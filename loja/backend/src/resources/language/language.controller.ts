import { Request, Response } from 'express';

const changeLanguage = (req: Request, res: Response) => {
  const lang = (req.body?.lang ?? req.query.lang) as string | undefined;

  if (!lang) {
    return res.status(400).json({ msg: 'Parâmetro lang é obrigatório' });
  }

  res.cookie('lang', lang);
  return res.json({ lang });
};

export default { changeLanguage };
