export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  userTypeId?: string;
}

export type UpdateUserInput = Partial<CreateUserInput>;
