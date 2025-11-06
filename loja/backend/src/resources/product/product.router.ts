// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import isAdmin from '../../middlewares/isAdmin';
import productController from './product.controller';
import checkAutorization from '../../middlewares/checkAutorization';
const router = Router();

router.get('/', productController.index);
router.post('/', isAdmin, productController.create);
router.get('/:id', productController.read);
router.put('/:id', isAdmin, productController.update);
router.delete('/:id', isAdmin, productController.remove);

export default router;
