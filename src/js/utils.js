function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// save data to local storage
export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function validateKeyInLocalStorage(key) {
  return localStorage.key(key);
}

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach((item) => {
    //console.log(item.id);
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  });
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parent.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function countDiscount(oldPrice, newPrice) {
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

export function calculateTotalAmount(list) {
  let totalAmount = 0;
  list.forEach((item) => {
    totalAmount += item.FinalPrice;
  });
  return totalAmount.toFixed(2);
}

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function formatDateToLocal(date) {
  return `${date.getFullYear()}-${leadZeros(
    date.getMonth() + 1
  )}-${date.getDate()}T${leadZeros(date.getHours())}:${leadZeros(
    date.getMinutes()
  )}:${leadZeros(date.getSeconds())}.${date.getMilliseconds()}Z`;
}

export function leadZeros(num) {
  return num.toString().padStart(2, '0');
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = message;
  const close = document.createElement('span');
  close.innerHTML = 'X';
  close.classList.add('close');
  alert.appendChild(close);
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.matches('.close')) {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
