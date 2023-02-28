import bcrypt from "bcryptjs";

import { db } from "./";
import UserModel from "@/models/User";

export const checkUserEmailPassword = async (email: string, password: string) => {
  await db.connect();
  const user = await UserModel.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const { name, role, _id } = user;
  return {
    _id,
    name,
    email: email.toLowerCase(),
    role,
  };
};

//* Esto es para comparar el oAuth con nuestra base de datos
export const oAuthCheck = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await UserModel.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, role, email } = user;
    return { _id, name, role, email };
  }

  const newUser = new UserModel({
    name: oAuthName,
    email: oAuthEmail,
    password: "@",
    role: "client",
  });
  await newUser.save();

  const { _id, name, role, email } = newUser;
  return { _id, name, role, email };
};
