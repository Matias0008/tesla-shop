import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "@/database";
import UserModel from "@/models/User";
import { jwt } from "@/utils";

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
    case "GET":
      return validateJWT(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;
  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({ message: "JWT no valido" });
  }

  await db.connect();
  const user = await UserModel.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: "No hay usuario con ese ID" });
  }

  const { name, email, role, _id } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      name,
      email,
      role,
    },
  });
};
