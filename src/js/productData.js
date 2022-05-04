const baseURL = 'http://157.201.228.93:2992/'

export default class ProductData {
  constructor() {

  }
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(this.convertToJson).then((data) => {console.table(data.Result); return data.Result});
  }
  async findProductById(id) {
   // const products = await this.getData(category);
   // const product = products.find((item) => item.Id === id);
   const product = fetch(baseURL + `product/${id}`).then(this.convertToJson)
  .then((data) => data.Result);
    return product;
  }
  convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Bad Response');
    }
  }
}
