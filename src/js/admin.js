import {
  alertMessage
} from './utils.js';

export default class Admin {
  constructor(externalServices) {
    this.externalServices = externalServices;
    this.token = null;
  }
  async login(creds, next) {
    try {
        const loginRequest = await this.externalServices.loginRequest(creds);
        //console.log(loginRequest);
        this.token = loginRequest.accessToken;
        next();
    } catch (err) {
        console.log(err);
        alertMessage(err.message.message);
    }
  }
  showLogin() {
    const output = document.querySelector('main');
    output.innerHTML = `<h2>LOGIN</h2>
        <form id="loginForm" action="/" method="POST" class="login-form">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" >
            <label for="password">Password</label>
            <input type="password" id="password" name="password" >
            <button type="submit">Login</button>
        </form>`;
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        this.login({
            email,
            password
        }, this.showOrders.bind(this));
    });
  }
  async showOrders() {
    try {
        const orders = await this.externalServices.getOrders(this.token);
        const output = document.querySelector('main');
        output.innerHTML = `<h2>Current Orders</h2>
            <div class="table-container">
            <table id="orders" class="table-orders">
                <thead>
                    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
                </thead>
                <tbody class="order-body"></tbody>
            </table></div>`;
        let ordersMap = '';
        orders.map(order => {
            ordersMap +=
            `<tr>
                <td>${order.id}</td>
                <td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td>
                <td>${order.items ? order.items.length:0}</td><td>${order.orderTotal ? parseFloat(order.orderTotal).toFixed(2):'0.00'}</td>
            </tr>`
        });
        document.querySelector('#orders tbody').innerHTML = ordersMap;
    } catch (err) {
        console.log(err);
    }
  }
}