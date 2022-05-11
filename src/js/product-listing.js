import ProductData from './productData.js';
import ProductList from './productList.js';
import { getParams, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const category = getParams('category');

document.getElementById('product-category').innerHTML = category;
const data = new ProductData();
const listElement = document.querySelector('.product-list');
const list = new ProductList(category, data, listElement);
list.init();
