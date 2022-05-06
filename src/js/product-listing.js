import ProductData from './productData.js';
import ProductList from './productList.js';
import { getParams, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const category = getParams('category');
console.log(category)
document.getElementById('product-category').innerHTML = category;
const tents = new ProductData();
const listElement = document.querySelector('.product-list');
const list = new ProductList(category, tents, listElement);

list.init();