import { loadHeaderFooter } from './utils.js';
import ShoppingCart from './shoppingCart.js';

loadHeaderFooter();

const listElement = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart(listElement);
shoppingCart.init();