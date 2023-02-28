import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { SeedGenders } from "@/database/seed-data";
import { GenderModel, ProductModel } from "@/models";
import { IGender, IProduct } from "@/interfaces";

type Data = { message: string } | { pages: number; products: IProduct[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }

  res.status(200).json({ message: "John Doe" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = 20;
  let gender = req.query.gender as IGender;
  let { size = "all", page = 1 } = req.query;
  if (!gender) gender = "all";

  await db.connect();
  const validGenders: SeedGenders[] = await GenderModel.find().lean();
  const genderNames = validGenders.map((gender) => gender.name);
  let condition = {};

  if (gender !== "all" && genderNames.includes(gender)) {
    condition = { gender };
  }

  if (size !== "all") {
    size = size.toString().toUpperCase();
    condition = { ...condition, sizes: size };
  }

  const products = await ProductModel.find(condition)
    .limit(limit * 1)
    .skip((Number(page) - 1) * limit)
    .select("title images gender price inStock slug -_id")
    .lean();

  await db.disconnect();

  //* ==> Esto es porque tenemos imagenes en el filesystem y otras en la nube
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  console.log(updatedProducts);
  const numberOfProducts = await ProductModel.find(condition).lean().count();

  return res.status(200).json({
    pages: Math.ceil(numberOfProducts / limit),
    products: updatedProducts,
  });
};
