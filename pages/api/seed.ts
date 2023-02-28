import type { NextApiRequest, NextApiResponse } from "next";

import { GenderModel, ProductModel } from "@/models";
import { db, seedData } from "@/database";
import UserModel from "@/models/User";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    res.status(401).json({ message: "No tiene acceso a esta API" });
  }

  await db.connect();
  await ProductModel.deleteMany();
  await GenderModel.deleteMany();
  await UserModel.deleteMany();
  await UserModel.insertMany(seedData.initialData.users);
  await ProductModel.insertMany(seedData.initialData.products);
  await GenderModel.insertMany(seedData.initialData.genders);
  await db.disconnect();

  res
    .status(200)
    .json({ message: "Se realizo la operacion de manera correcta" });
}
