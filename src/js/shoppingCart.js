import { renderListWithTemplate, getLocalStorage } from './utils.js';

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }
  async init() {
    const list = getLocalStorage('so-cart');
    //console.table(list);
    this.renderList(list);
  }
  prepareTemplate(template, product) {
    template.querySelector('a').href += product.Id;
    template.querySelector('img').src = product.Images.PrimaryMedium;
    template.querySelector('img').alt += product.Name;
    template.querySelector('h2.card__name').textContent = product.Name;
    template.querySelector('p.cart-card__color').textContent = product.Colors[0].ColorName;
    //template.querySelector('p.cart-card__quantity').textContent += product.FinalPrice;
    template.querySelector('p.cart-card__price').textContent += product.FinalPrice;
    return template;
  }
  renderList(list) {
    this.listElement.innerHTML = '';
    const template = document.getElementById('product-cart-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
  }
}