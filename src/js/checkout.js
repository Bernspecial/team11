// import { loadHeaderFooter } from "./utils.mjs";
// import CheckoutProcess from "./CheckoutProcess.mjs";

// // Load the header and footer
// loadHeaderFooter();

// const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
// myCheckout.init();

// document
//   .querySelector("#zip-code")
//   .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

// // listening for click on the button
// document.querySelector("#checkout-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   const myForm = document.forms[0];
//   const chk_status = myForm.checkValidity();
//   myForm.reportValidity();
//   if (chk_status) myCheckout.checkout();
// });

import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});

// this is how it would look if we listen for the submit on the form
// document.forms['checkout']
// .addEventListener('submit', (e) => {
//   e.preventDefault();
//   // e.target would contain our form in this case
//    myCheckout.checkout();
// });
