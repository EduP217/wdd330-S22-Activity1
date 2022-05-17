import ExternalServices from './ExternalServices.js';
import ProductList from './productList.js';
import { getParams, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const data = new ExternalServices();
const listElement = document.querySelector('.product-list');

const category = getParams('category');
const search = getParams('search');
let productListType = '';
if(category){
    productListType = `${category} | category`;
}
if(search){
    productListType = `${search} | search`;
}
document.getElementById('product-category').innerHTML = productListType;
const list = new ProductList(category, search, data, listElement);
list.init();
