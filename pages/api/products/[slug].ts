import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/interfaces";
import { db } from "@/database";
import { ProductModel } from "@/models";

type Data = { message: string } | Product;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const { slug } = req.query;
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res
      .status(404)
      .json({ message: `Producto con el slug: ${slug} no encontrado` });
  }

  return res.status(200).json(product);
};
