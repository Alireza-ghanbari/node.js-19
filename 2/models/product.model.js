import mongoose from "mongoose";
import slugify from "slugify";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    description: {
      type: String,
      maxLength: [200, "description is too long"],
    },
    images: {
      type: [String],
      required: [true, "image is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return this.price > value;
        },
        message: "discount price must be less than price",
      },
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function(next){
    this.slug = slugify(this.name, {lower:true})
    next()
})

const Product = mongoose.model("Product", productSchema);
export default Product;
