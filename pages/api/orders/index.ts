import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { db } from "@/database";
import { IOrder, Product } from "@/interfaces";
import { ProductModel, OrderModel } from "@/models";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  //* ==> Verificamos que tengamos un usuario
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(400)
      .json({ message: "Debe estar autenticado para realizar esto" });
  }

  const productsId = orderItems.map((product) => product._id);
  await db.connect();
  let products = (await ProductModel.find({
    _id: { $in: productsId },
  })) as Product[];

  products = JSON.parse(JSON.stringify(products));

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = products.find((p) => p._id === current._id)?.price;
      if (!currentPrice) {
        throw new Error("Algo salio mal...");
      }
      return currentPrice * current.quantity + prev;
    }, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error("Error con los montos");
    }

    //* En este punto esta todo ok
    const userId = session.user._id;
    const newOrder = new OrderModel({
      ...req.body,
      isPaid: false, //! Sobreescribimos por temas de seguridad
      user: userId, //! Sobreescribimos por temas de seguridad
    });
    newOrder.total = Math.round(newOrder.total * 100) / 100;
    await newOrder.save();
    await db.disconnect();
    return res.status(200).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res
      .status(400)
      .json({ message: error.message || "Error, revise la consola" });
  }

  return res.status(201).json(req.body);
};
