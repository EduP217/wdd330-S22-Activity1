export default class Alert {
  constructor(dataSource) {
    this.alerts = [];
    this.dataSource = dataSource;
  }

  async init() {
    this.alerts = await this.dataSource.getData();
    console.table(this.alerts);
    document
      .querySelector('main')
      .insertAdjacentHTML('afterbegin', this.renderHTMLElements());
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
