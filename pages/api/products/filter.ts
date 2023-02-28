import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/interfaces";
import { db } from "@/database";
import { ProductModel } from "@/models";

type Data = { message: string } | { pages: number; products: Product[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductsByFilter(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProductsByFilter = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const limit = 12;
  let { size = "all", page = "1" } = req.query;
  let condition = {};

  size = size.toString().toUpperCase();
  if (size !== "all") {
    condition = { sizes: size };
  }

  const products = await ProductModel.find(condition)
    .limit(limit * 1)
    .skip((Number(page) - 1) * limit)
    .select("title images inStock price sizes slug -_id")
    .lean();

  await db.disconnect();

  if (!products) {
    return res
      .status(404)
      .json({ message: `Productos con el talle: ${size} no encontrado` });
  }

  const numberOfProducts = await ProductModel.find(condition).lean().count();

  return res.status(200).json({
    pages: Math.ceil(numberOfProducts / limit),
    products: products,
  });
};
