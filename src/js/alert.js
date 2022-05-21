export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    this.alerts = await this.getData();
    console.table(this.alerts);
    document
      .querySelector('main')
      .insertAdjacentHTML('afterbegin', this.renderHTMLElements());
  }
  getData() {
    return fetch('/json/alerts.json')
      .then((res) => res.json())
      .then((data) => data);
  }
  renderHTMLElements() {
    let render = '<section class="alert-list">';
    this.alerts.forEach((a) => {
      render += `<p style="background-color: ${a.background}; color: ${a.color};">${a.message}</p>`;
    });
    render += '</section>';
    return render;
  }
}
