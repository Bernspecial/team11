// Import function to get a product by ID
import { getProductById } from './ExternalServices.mjs';

// Function to extract product ID from URL parameters
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Select the product details HTML element
const productDetails = document.getElementById('productDetails');

// Fetch and display the product details
getProductById(productId).then((product) => {
  productDetails.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" />
    <p>Price: $${product.price}</p>
    <p>${product.description}</p>
  `;
}).catch((error) => {
  console.error('Error loading product details:', error);
});
