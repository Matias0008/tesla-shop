import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SEED) {
    throw new Error("La seed de JWT no esta en las variables de entorno");
  }

  const token = jwt.sign({ _id, email }, process.env.JWT_SEED, {
    expiresIn: "30d",
  });

  return token;
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SEED) {
    throw new Error("La seed de JWT no esta en las variables de entorno");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SEED || "", (err, payload) => {
        if (err) return reject("JWT no valido.");
        const { _id } = payload as { _id: string };
        return resolve(_id);
      });
    } catch (error) {
      return reject("JWT no valido");
    }
  });
};
