export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  userTypeId?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
