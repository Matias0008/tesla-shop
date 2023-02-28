import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { ProductModel } from "@/models";
import { Product } from "@/interfaces";

type Data = { message: string } | { pages: number; products: Product[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = "", page = "1" } = req.query;
  const limit = 12;

  if (q.length === 0) {
    return res.status(400).json({ message: "Falto el query de busqueda" });
  }

  q = q.toString().toLowerCase();
  await db.connect();
  const products = await ProductModel.find({
    $text: { $search: q },
  })
    .limit(limit * 1)
    .skip((Number(page) - 1) * limit)
    .select("title images inStock price slug -_id")
    .lean();
  await db.disconnect();

  const numberOfProducts = await ProductModel.find({
    $text: { $search: q },
  })
    .lean()
    .count();

  return res.status(200).json({
    pages: Math.ceil(numberOfProducts / limit),
    products,
  });
};
