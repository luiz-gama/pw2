export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;

}

export type UpdateProductInput = Partial<CreateProductInput>;
