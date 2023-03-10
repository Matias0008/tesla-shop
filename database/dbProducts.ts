import { IProduct, Product, IGender } from "@/interfaces";
import { ProductModel } from "@/models";
import { db } from ".";

export const getAllProducts = async (): Promise<Product[]> => {
  await db.connect();
  const allProducts = await ProductModel.find().lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(allProducts));
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlugs {
  slug: string;
}

export const getAllProductsSlug = async (): Promise<ProductSlugs[]> => {
  await db.connect();
  const slugs = (await ProductModel.find()
    .select("slug -_id")
    .lean()) as ProductSlugs[];
  await db.disconnect();
  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<Product[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const products = await ProductModel.find({ $text: { $search: term } })
    .select("title images price inStock slug -_id")
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

  return updatedProducts;
};

export const getRecommendations = async ({
  gender,
  slug,
}: {
  gender: string;
  slug: string;
}): Promise<Product[]> => {
  await db.connect();
  const numberOfProducts = await ProductModel.find({ gender }).count();
  let randomNumber = Math.floor(Math.random() * numberOfProducts);
  let randomSkip = randomNumber - 4 > 0 ? randomNumber : 0;
  const randomProducts = await ProductModel.find({
    gender,
    slug: { $ne: slug },
  })
    .lean()
    .skip(randomSkip)
    .limit(4);
  await db.disconnect();
  const updatedProducts = randomProducts.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });
    return product;
  });

  return JSON.parse(JSON.stringify(updatedProducts));
};
