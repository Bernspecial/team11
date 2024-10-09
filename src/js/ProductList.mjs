import { renderListWithTemplate, getParams } from "./utils.mjs";


function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image.PrimaryMedium}" alt="Image of ${product.name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    filterProducts(products) {
        const productIds = getParams('productIds').split(',');
        return products.filter(product => productIds.includes(product.id));
    }

    async init() {
        const products = await this.dataSource.getData(this.category);
        const filteredProducts = this.filterProducts(products);
        this.products = filteredProducts;
        this.renderProductList(filteredProducts);

    }

    renderProductList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products);
    }



}