import { NextFunction, Request, Response } from 'express';

export type ValidatorResult = { error?: unknown };
export type Validator = (payload: unknown) => Promise<ValidatorResult> | ValidatorResult;

const validate = (validator: Validator) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await validator(req.body);
      if (result?.error) {
        return res.status(422).json({ error: result.error });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Validation failed' });
    }
  };
};

export default validate;
