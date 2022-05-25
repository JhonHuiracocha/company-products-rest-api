import Product from "../models/Product";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, imgUrl } = req.body;

    const newProduct = new Product({ name, description, price, imgUrl });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      results: [savedProduct],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
      results: [],
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ success: true, results: products });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error getting the products",
      results: [],
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "The product has not been found",
        results: [],
      });

    return res.status(200).json({ success: true, results: [product] });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error getting the product",
      results: [],
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imgUrl } = req.body;

    const newProduct = { name, description, price, imgUrl };

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });

    if (!updatedProduct)
      return res.status(404).json({
        success: false,
        message: "The product has not been found",
        results: [],
      });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      results: [updatedProduct],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      results: [],
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "The product has not been found" });

        return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There was an error removing the product",
    });
  }
};