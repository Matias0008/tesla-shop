import type { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

import { db } from "@/database";
import { ProductModel } from "@/models";

import { IProduct, Product } from "@/interfaces";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | Product[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "POST":
      return createProduct(req, res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await ProductModel.find().sort({ createdAt: "desc" }).lean();
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

  return res.status(200).json(updatedProducts);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "El id del producto es invalido." });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Necesitas al menos 2 (dos) imagenes" });
  }

  try {
    await db.connect();
    const product = await ProductModel.findById(_id);

    if (!product) {
      return res.status(400).json({ message: "Producto no encontrado" });
    }

    (product as any).images.forEach(async (oldImage: string) => {
      if (!images.includes(oldImage)) {
        const [fileId, extension] = oldImage
          .substring(oldImage.lastIndexOf("/") + 1)
          .split(".");
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await db.disconnect();
    return res
      .status(200)
      .json({ message: `Producto con la id: ${_id} actualizado` });
  } catch (error) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Ocurrio un error, mira la consola" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [], slug = "" } = req.body as Product;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "El producto debe tener al menos 2 (dos) imagenes" });
  }

  try {
    await db.connect();
    const productInDb = await ProductModel.findOne({ slug });

    if (productInDb) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `El producto con el slug: ${slug} ya existe` });
    }

    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    await db.disconnect();
    return res.status(200).json({ message: "Producto creado" });
  } catch (error) {
    await db.disconnect();
    console.log("Error: ", error);
    return res.status(400).json({ message: "Revisar los del servidor" });
  }
};
