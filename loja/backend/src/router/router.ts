import { Router } from 'express';

import authRouter from '../resources/auth/auth.router';
import languageRouter from '../resources/language/language.router';
import productRouter from '../resources/product/product.router';
import userRouter from '../resources/user/user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/language', languageRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;
