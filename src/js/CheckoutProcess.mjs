import { setLocalStorage, getLocalStorage, alertMessage, removeAllAlerts, } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();


function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}


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
        document.querySelector(this.outputSelector + " #item-total").innerHTML = "$" + this.itemTotal.toFixed(2);
        document.querySelector(this.outputSelector + " #item-count").innerHTML = this.list.length;
    }

    calculateOrderTotal(zipCode) {
        if (zipCode !== "") {
            this.shipping = 10 + (this.list.length - 1) * 2;
            this.tax = this.itemTotal * 0.06;
            this.orderTotal = this.itemTotal + this.shipping + this.tax;
            this.displayOrderTotals();
        }
    }

    displayOrderTotals() {
        document.querySelector(this.outputSelector + " #shipping-estimate").innerHTML = "$" + this.shipping.toFixed(2);
        document.querySelector(this.outputSelector + " #tax").innerHTML = "$" + this.tax.toFixed(2);
        document.querySelector(this.outputSelector + " #order-total").innerHTML = "$" + this.orderTotal.toFixed(2);
    }
    async checkout() {
        const formElement = document.forms["checkoutForm"];

        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await services.checkout(json);
            console.log(res);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
            console.log(err);
        }
    }
}