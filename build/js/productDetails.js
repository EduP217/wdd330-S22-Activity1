var s = (i, t, r) =>
  new Promise((e, c) => {
    var u = (d) => {
        try {
          o(r.next(d));
        } catch (a) {
          c(a);
        }
      },
      l = (d) => {
        try {
          o(r.throw(d));
        } catch (a) {
          c(a);
        }
      },
      o = (d) => (d.done ? e(d.value) : Promise.resolve(d.value).then(u, l));
    o((r = r.apply(i, t)).next());
  });
import {
  getLocalStorage as p,
  setLocalStorage as n,
  validateKeyInLocalStorage as h,
} from './utils.js';
export default class m {
  constructor(t, r) {
    (this.productId = t), (this.product = {}), (this.dataSource = r);
  }
  init() {
    return s(this, null, function* () {
      (this.product = yield this.dataSource.findProductById(this.productId)),
        (document.querySelector(
          'main'
        ).innerHTML = this.renderProductDetails()),
        document
          .getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
    });
  }
  addToCart() {
    let t = [];
    h('so-cart') && (t = p('so-cart')), t.push(this.product), n('so-cart', t);
  }
  renderProductDetails() {
    let t = `<section class="product-detail">
<h3>${this.product.Brand.Name}</h3>
<h2 class="divider">${this.product.NameWithoutBrand}</h2>
<img class="divider" src="${this.product.Image}" alt="${this.product.NameWithoutBrand}" />

<p class="product-card__price">$${this.product.FinalPrice}</p>
<p class="product__color">${this.product.Colors.ColorName}</p>
<p class="product__description">${this.product.DescriptionHtmlSimple}
</p>
<div class="product-detail__add"> 
    <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
</div>
</section>`;
    return t;
  }
}
