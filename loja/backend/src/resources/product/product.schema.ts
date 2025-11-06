// src/resources/product/product.schema.ts
const productSchema = {
  required: ['name', 'price', 'stock'],
  optional: ['description']
} as const;

export default productSchema;
