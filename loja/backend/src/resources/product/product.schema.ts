const productSchema = {
  required: ['name', 'price', 'stock'],
  optional: ['description']
} as const;

export default productSchema;
