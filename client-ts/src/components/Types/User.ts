export interface User {
  id: number;
  fname: string;
  lname: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  phone: number;
  avatar: string | null;
  answer: string;
  permissions: string[];
  address: string;
  createdAt: Date;
}

export interface UserState {
  user: User | null;
  token: string;
}
