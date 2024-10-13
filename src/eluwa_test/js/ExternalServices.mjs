// Function to fetch all products
export async function getAllProducts() {
    const response = await fetch('https://fakestoreapi.com/products'); // Fetch all products from mock API
    if (!response.ok) {
      throw new Error('Failed to load product list');
    }
    return response.json(); // Return the product list as a JSON object
  }
  
  // Function to fetch a single product by ID (used in the product-page.js)
  export async function getProductById(id) {
    const response = await fetch('https://fakestoreapi.com/products/' + id);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }
  