const Product = require("../models/productModel");
const { getPostData } = require("../utils");

/**
 * @desc Gets All Products
 * @route GET /api/products
 * @param {*} req
 * @param {*} res
 */
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    /**
     * This is alternative to below code.
     * res.statusCode = 200;
     * res.setHeader("Content-Type", "text/html");
     * res.write("<h1>Hello World</h1>");
     */
    res.writeHead(200, { "Content-Type": "application/json" });
    /**
     * This is alternative to below code.
     * res.write(JSON.stringify(products));
     * res.end();
     */
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc Gets Single Product
 * @route GET /api/product/:id
 * @param {*} req
 * @param {*} res
 * @param {*} id
 */
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc Create a Product
 * @route POST /api/products
 * @param {*} req
 * @param {*} res
 */
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @desc Update a Product
 * @route PUT /api/products
 * @param {*} req
 * @param {*} res
 */
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const uppdProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(uppdProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = Object.freeze({
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
});
