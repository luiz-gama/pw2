import { Router } from 'express';

import controller from './language.controller';

const router = Router();

router.post('/change', controller.changeLanguage);

export default router;
