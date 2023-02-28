import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "@/interfaces";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        title: { type: String, required: true },
        size: { type: String, required: true },
        slug: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        gender: { type: String, required: true },
      },
    ],
    shippingAddress: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      zip: { type: String, required: true },
    },
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    taxRate: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false, index: true },
    paidAt: { type: String },
    transactiondId: { type: String },
  },
  {
    timestamps: true,
  }
);

//* ==> Las ordenes se eliminan pasadas las 72 horas si estas no fueron pagadas
orderSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 259200,
    partialFilterExpression: { isPaid: false },
  }
);

const OrderModel: Model<IOrder> =
  mongoose.models.Order || model("Order", orderSchema);

export default OrderModel;
