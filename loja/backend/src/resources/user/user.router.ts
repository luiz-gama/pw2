import { Router } from 'express';

import isAdmin from '../../middlewares/isAdmin';
import controller from './user.controller';

const router = Router();

router.get('/', isAdmin, controller.index);
router.post('/', isAdmin, controller.create);
router.get('/:id', isAdmin, controller.read);
router.put('/:id', isAdmin, controller.update);
router.delete('/:id', isAdmin, controller.remove);

export default router;
