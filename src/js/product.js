import ProductData from './productData.js';
import { getParams } from './utils.js';
import ProductDetails from './productDetails.js';
const productId = getParams('product');
const dataSource = new ProductData('tents');
console.log(dataSource.getData());

const product = new ProductDetails(productId, dataSource);
product.init();
