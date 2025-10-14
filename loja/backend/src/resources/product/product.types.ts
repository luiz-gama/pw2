export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;
