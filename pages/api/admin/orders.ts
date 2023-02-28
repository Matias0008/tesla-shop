import type { NextApiRequest, NextApiResponse } from "next";

import { IOrder } from "@/interfaces";
import { db } from "@/database";
import { OrderModel } from "@/models";

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrders(req, res);
    default:
      res.status(200).json({ message: "Bad request" });
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await OrderModel.find()
    .populate("user", "name email")
    .sort({ createdAt: "desc" })
    .lean();
  await db.disconnect();

  return res.status(200).json(orders);
};
