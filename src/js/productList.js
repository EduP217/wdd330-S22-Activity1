import { renderListWithTemplate, countDiscount } from './utils.js';

export default class ProductListing {
  constructor(category, search, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.search = search;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    let list = await this.dataSource.getData(this.category);
    list = this.onlyFour(list);
    this.renderList(list);
  }
  onlyFour(list) {
    return list.filter((item, index) => index < 4);
  }

  prepareTemplate(template, product) {
    template.querySelector('a').href += product.Id;
    template.querySelector('img').src = product.Images.PrimaryMedium;
    template.querySelector('img').alt += product.Name;
    template.querySelector('.card__brand').textContent = product.Brand.Name;
    template.querySelector('.card__name').textContent =
      product.NameWithoutBrand;
    template.querySelector('.product-card__price').textContent +=
      product.FinalPrice;
    template.querySelector('.product-card__old-price').textContent +=
      product.SuggestedRetailPrice;
    template.querySelector(
      '.product-card__discount-amount'
    ).textContent += countDiscount(
      product.SuggestedRetailPrice,
      product.FinalPrice
    );
    return template;
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('product-card-template');
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }
}
