import o from './productData.js';
import { getParams as r } from './utils.js';
import a from './productDetails.js';
const c = r('product'),
  t = new o('tents');
console.log(t.getData());
const s = new a(c, t);
s.init();
