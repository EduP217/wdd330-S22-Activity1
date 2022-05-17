import {
  renderListWithTemplate,
  getLocalStorage,
  calculateTotalAmount,
  validateKeyInLocalStorage,
  setLocalStorage,
} from './utils.js';

export default class ShoppingCart {
  constructor(listElement) {
    this.key = 'so-cart';
    this.listElement = listElement;
  }
  async init() {
    const cartItems = getLocalStorage(this.key);
    this.renderList(cartItems);
  }
  prepareTemplate(template, product) {
    template.querySelector('a').href += product.Id;
    template.querySelector('img').src = product.Images.PrimaryMedium;
    template.querySelector('img').alt += product.Name;
    template.querySelector('h2.card__name').textContent = product.Name;
    template.querySelector('p.cart-card__color').textContent =
      product.Colors[0].ColorName;
    //template.querySelector('p.cart-card__quantity').textContent += product.FinalPrice;
    template.querySelector('p.cart-card__price').textContent +=
      product.FinalPrice;
    template.querySelector('span.close').setAttribute('data-id', product.Id);
    return template;
  }
  removeItemFromCart(c) {
    //console.log(c);
    //console.log(this);
    let productId = c.getAttribute('data-id');
    console.log(productId);
    let cartItems = [];
    if (validateKeyInLocalStorage(this.key)) {
      cartItems = getLocalStorage(this.key);
    }
    cartItems = cartItems.filter((i) => i.Id != productId);
    this.displayAmountCheckout(cartItems);
    setLocalStorage(this.key, cartItems);
    const itemNode = c.parentNode;
    const rootNode = itemNode.parentNode;
    rootNode.removeChild(itemNode);
  }
  renderList(list) {
    this.listElement.innerHTML = '';
    this.displayAmountCheckout(list);
    let cartIsEmpty = list == null || list.length == 0;
    if (!cartIsEmpty) {
      const template = document.getElementById('product-cart-card-template');
      renderListWithTemplate(
        template,
        this.listElement,
        list,
        this.prepareTemplate
      );
    }
  }
  displayAmountCheckout(list) {
    let totalAmount = calculateTotalAmount(list);
    document.querySelector('.cart-total').textContent = `$${totalAmount}`;
    if (totalAmount > 0){
      document.querySelector('.cart-footer').classList.remove('hide');
      document.querySelector('.btn-checkout').classList.remove('hide');
    } else {
      document.querySelector('.cart-footer').classList.add('hide');
      document.querySelector('.btn-checkout').classList.add('hide');
    }    
  }
}
