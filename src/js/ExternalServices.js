const baseURL = 'http://157.201.228.93:2992/';

export default class ExternalServices {
  constructor() {}
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(this.convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    // const products = await this.getData(category);
    // const product = products.find((item) => item.Id === id);
    const product = fetch(baseURL + `product/${id}`)
      .then(this.convertToJson)
      .then((data) => data.Result);
    return product;
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + 'checkout/', options).then(this.convertToJson);
  }
  async convertToJson(res) {
    const jsonResponse = await res.json();
    console.log(jsonResponse);
    if(res.status == 400){
      throw { name: 'servicesError', message: jsonResponse };
    }
    return jsonResponse;
  }
}
