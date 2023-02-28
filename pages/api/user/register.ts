import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "@/database";
import UserModel from "@/models/User";
import { jwt, validations } from "@/utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe ser de mas de 6 caracteres" });
  }

  if (name.length < 2) {
    return res.status(400).json({ message: "La contraseña debe ser de mas de 2 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Correo invalido" });
  }

  await db.connect();
  const user = await UserModel.findOne({ email }).lean();

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: "El correo ya esta registrado" });
  }

  const newUser = new UserModel({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revisar logs del servidor" });
  }

  const { _id, role } = newUser;
  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      email,
      role,
    },
  });
};
