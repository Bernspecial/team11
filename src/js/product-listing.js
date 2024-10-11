import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const titleElement = document.querySelector(".title");
titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

const source = new ExternalServices();

const listEle = document.querySelector(".product-list");

const list = new ProductList(category, source, listEle);
list.init();
