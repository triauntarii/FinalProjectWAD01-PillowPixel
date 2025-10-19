import { createContext } from "react";

// Buat model User dari informasi yang di terima di backend
// token jwt perlu dibuat dahulu dari backend, install jwt. kemudian kirim ke front end
// fungsi jwt adalah untuk authentikasi bahwa user tersebut yang login
// jwt bisa expired, dan kalau bisa cek apakah jwt expired atau tidak, jika expired maka tidak bisa hit endpoint
export interface User {
  email: string;
  username: string;
  token?: string;
  isAdmin?: number;
}

export interface AuthContextType {
  user: User | null;
  register: (
    email: string,
    password: string,
    username: string,
    isAdmin: number
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Cuma deklarasi context di sini
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
