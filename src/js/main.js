import ProductData from './productData.js';
import ProductList from './productList.js';
import Alert from './alert.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const dataSource = new ProductData('alerts');
const alert = new Alert(dataSource);
alert.init();
