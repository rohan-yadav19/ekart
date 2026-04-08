import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  console.log("addProduct controller called");
  try {
    console.log("Request body:", req.body);
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.id;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    //handle multiple images upload
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);

        // need to check the size of the file before uploading to cloudinary
        if (file.size > 5 * 1024 * 1024) {
          return res.status(400).json({
            success: false,
            message: "File size should be less than 5MB",
          });
        }

        console.log("Uploading image to Cloudinary...", fileUri);

        const result = await cloudinary.uploader.upload(fileUri, {
          upload_preset: "tsestxyxx",
          folder: "mern-stack",
        });

        console.log("Cloudinary upload result:", result);
        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    //create a product in db
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg, //array of objects [{url, public_id}]
    });
    console.log("New product created:", newProduct);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error in addProduct controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProduct = async (_, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products available",
        products: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
