import ProductData from './productData.js';
import Alert from './alert.js';
import ProductList from './productList.js';

const dataSource = new ProductData('alerts');
const alert = new Alert(dataSource);
alert.init();

const tents = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const list = new ProductList('tents', tents, listElement);

list.init();