// Arquivo src/resources/product/product.types.ts

import { Product } from '@prisma/client';
type ProdCreateDto= Pick<Product,'name'|'price'|'stock'>;
type ProdUpdateDto= Pick<Product,'name'|'price'|'stock'>;
export type { ProdCreateDto, ProdUpdateDto };
