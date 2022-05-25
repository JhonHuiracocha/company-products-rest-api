import Product from "../models/Product";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, imgUrl } = req.body;

    const newProduct = new Product({ name, description, price, imgUrl });

    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", results: [savedProduct] });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred while adding the product",
      results: [],
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ results: products });
  } catch (error) {
    res.status(400).json({
      message: "There was an error getting the products",
      results: [],
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById({ _id: id });

    if (!product)
      res
        .status(404)
        .json({ message: "The product has not been found", results: [] });

    res.status(200).json({ results: [product] });
  } catch (error) {
    res.status(400).json({
      message: "There was an error getting the product",
      results: [],
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imgUrl } = req.body;

    const newProduct = { name, description, price, imgUrl };

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct);

    if (!updatedProduct)
      res
        .status(404)
        .json({ message: "The product has not been found", results: [] });

    res.status(200).json({
      message: "Product updated successfully",
      results: [updatedProduct],
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred while updating the product",
      results: [],
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      res.status(404).json({ message: "The product has not been found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "There was an error removing the product",
    });
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
