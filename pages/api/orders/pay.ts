import type { NextApiRequest, NextApiResponse } from "next";

import axios, { isAxiosError } from "axios";

import { IPaypal } from "@/interfaces";
import { db } from "@/database";
import { OrderModel } from "@/models";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);
    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET_ID;

  //* ==> Esto es para la autorizacion (basic)
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.access_token;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: "No se pudo obtener el token" });
  }

  const { transactionId = "", orderId = "" } = req.body;
  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    return res.status(400).json({
      message: "Orden no reconocida - Data status distinta de completada",
    });
  }

  await db.connect();
  const dbOrder = await OrderModel.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "La orden no existe en nuestra base de datos" });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(400).json({
      message:
        "Los montos de la orden de Paypal no coinciden con nuestra base de datos",
    });
  }

  //* ==> En este punto los montos coinciden con Paypal y la Orden con el id proporcionado mediante el body tambien existe
  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();

  await db.disconnect();

  return res.status(200).json({ message: "Orden pagada" });
};
