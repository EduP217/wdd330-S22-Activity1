import ProductData from './productData.js';
import Alert from './alert.js';
import ProductList from './productList.js';

const dataSource = new ProductData('alerts');
const alert = new Alert(dataSource);
alert.init();
