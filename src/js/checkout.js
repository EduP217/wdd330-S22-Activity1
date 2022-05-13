import { loadHeaderFooter } from './utils.js';
import CheckoutProcess from './checkoutProcess.js';

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess('so-cart', '.checkout-summary');
checkoutProcess.init();

document
  .querySelector('#zip')
  .addEventListener(
    'blur',
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );
document
  .querySelector('form[name="checkout"]')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log("preventDefault");
    checkoutProcess.checkout('checkout');
  });
