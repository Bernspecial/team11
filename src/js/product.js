import ExternalServices from "./ExternalServices.mjs";
import { getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", product.addToCart.bind(product));

loadHeaderFooter();
