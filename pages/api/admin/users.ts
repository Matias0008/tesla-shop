import type { NextApiRequest, NextApiResponse } from "next";

import { isValidObjectId } from "mongoose";
import { db } from "@/database";
import { UserModel } from "@/models";

import { IUser } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    case "PUT":
      return updateUser(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await UserModel.find().select("-password").lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", newRole = "" } = req.body;

  if (!isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ message: `El userId es invalido: ${userId}` });
  }

  const validRoles = ["admin", "client"];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ message: `El rol es invalido: ${newRole}` });
  }

  await db.connect();
  const user = await UserModel.findById(userId);

  if (!user) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `El usuario no se encontro: ${userId}` });
  }

  user.role = newRole;
  await user.save();
  await db.disconnect();

  return res
    .status(200)
    .json({
      message: `Usuario con la id: ${userId} actualizado correctamente`,
    });
};
