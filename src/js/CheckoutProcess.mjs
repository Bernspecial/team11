import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      this.itemTotal = 0;
      for (var i = 0; i < this.list.length; i++) {
        this.itemTotal += this.list[i].price;
      }
      document.querySelector(this.outputSelector + ' #item-total').innerHTML = '$' + this.itemTotal.toFixed(2);
      document.querySelector(this.outputSelector + ' #item-count').innerHTML = this.list.length;
    }
  
    calculateOrderTotal(zipCode) {
      if (zipCode !== '') {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
      }
    }
  
    displayOrderTotals() {
      document.querySelector(this.outputSelector + ' #shipping-estimate').innerHTML = '$' + this.shipping.toFixed(2);
      document.querySelector(this.outputSelector + ' #tax').innerHTML = '$' + this.tax.toFixed(2);
      document.querySelector(this.outputSelector + ' #order-total').innerHTML = '$' + this.orderTotal.toFixed(2);
    }
  }