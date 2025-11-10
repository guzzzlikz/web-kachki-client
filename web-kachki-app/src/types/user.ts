export enum UserType {
  USER = 'USER',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface Contacts {
  instUrl?: string;
  facebookUrl?: string;
  linkedInUrl?: string;
  telegramUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Only for registration/login
  type?: UserType;
  boughtCoursesId?: number[];
  pathToPhoto?: string;
  description?: string;
  contacts?: Contacts;
}

export interface RegisterData {
  id: number;
  email: string;
  name: string;
  password: string;
  type?: UserType;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

