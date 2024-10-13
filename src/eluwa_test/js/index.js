// Import function to get all products
import { getAllProducts } from './ExternalServices.mjs';

// Select the product list HTML element
const productList = document.getElementById('productList');

// Fetch products and display them as links
getAllProducts().then((products) => {
  products.forEach((product) => {
    // Create a list item and a link for each product
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `product-page.html?id=${product.id}`; // Link to product page with product ID in URL
    a.textContent = product.title; // Display product title as link
    li.appendChild(a);
    productList.appendChild(li);
  });
}).catch((error) => {
  console.error('Error loading product list:', error);
});
