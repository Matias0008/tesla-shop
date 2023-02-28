export interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "client";
}
