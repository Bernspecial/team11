import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate the total cost
  let total = 0;
  cartItems.forEach((item) => {
    total += item.FinalPrice;
  });

  // Show the .cart-footer element
  document.querySelector('.cart-footer').classList.remove('hide');

  // Create HTML to display the total cost
  const totalHtml = `<p class="cart-total">Total: $${total}</p>`;
  // Insert the total HTML into the .cart-footer element
  document.querySelector('.cart-footer').innerHTML = totalHtml;
}



function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
