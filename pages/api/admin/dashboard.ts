import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/database";
import { OrderModel, ProductModel, UserModel } from "@/models";

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsOutOfStock: number;
      lowStock: number;
    }
  | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getStats(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getStats = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowStock,
  ] = await Promise.all([
    OrderModel.count().lean(),
    OrderModel.find({ isPaid: true }).count().lean(),
    OrderModel.find({ isPaid: false }).count().lean(),
    UserModel.find({ role: "client" }).count().lean(),
    ProductModel.count().lean(),
    ProductModel.find({ inStock: 0 }).count().lean(),
    ProductModel.find({ inStock: { $lte: 10 } })
      .count()
      .lean(),
  ]);

  await db.disconnect();

  const result = {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowStock,
  };

  return res.status(200).json(result);
};
