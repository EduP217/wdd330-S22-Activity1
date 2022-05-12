import { getLocalStorage,calculateTotalAmount } from './utils';
import ExternalServices from './ExternalServices.js';
const services = new ExternalServices();

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

    // display the totals.
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page

  }

}