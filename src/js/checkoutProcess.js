import {
  getLocalStorage,
  calculateTotalAmount,
  formDataToJSON,
  formatDateToLocal
} from './utils';
import ExternalServices from './ExternalServices.js';

const services = new ExternalServices();

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const checkoutItems = items.map((item) => {
    //console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return checkoutItems;
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
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = calculateTotalAmount(this.list);
    document.querySelector(this.outputSelector + ' #cartTotal').innerHTML = `$${this.itemTotal}`;
    document.querySelector(this.outputSelector + ' #num-items').innerHTML = this.list.length;
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + ((this.list.length - 1) * 2);
    this.tax = (parseFloat(this.itemTotal) * 0.06).toFixed(2);
    // display the totals.
    this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(this.outputSelector + ' #shipping').innerText = '$' + this.shipping;
    document.querySelector(this.outputSelector + ' #tax').innerText = '$' + this.tax;
    document.querySelector(this.outputSelector + ' #orderTotal').innerText = '$' + this.orderTotal;
  }
  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms[form];
    const json = formDataToJSON(formElement);
    json.orderDate = formatDateToLocal(new Date());
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    // call the checkout method in our ExternalServices module and send it our data object.
    const res = await services.checkout(json);
    console.log(res);
  }
}