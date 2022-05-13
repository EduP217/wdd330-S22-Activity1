import ExternalServices from './ExternalServices.js';
import { getParams } from './utils.js';
import ProductDetails from './productDetails.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const productId = getParams('product');
const dataSource = new ExternalServices('tents');
console.log(dataSource.getData());

const product = new ProductDetails(productId, dataSource);
product.init();
