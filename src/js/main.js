import ProductData from './productData.js';
import ProductListing from './productList.js';
import Alert from './alert.js';

const dataSource = new ProductData('alerts');
const alert = new Alert(dataSource);
alert.init();

const dataSourceTents = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const productList = new ProductListing('tents',dataSourceTents,listElement);
productList.init();
