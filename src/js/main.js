import ProductData from './productData.js';
import Alert from './alert.js';

const dataSource = new ProductData('alerts');
const alert = new Alert(dataSource);
alert.init();
