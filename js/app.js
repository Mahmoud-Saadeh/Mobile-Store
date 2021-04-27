'use strict';

let tableHeader = ['User', 'Type', 'Price', 'Condition'];
let tableElement = document.getElementById('userTable');
let tableRowHeader = document.createElement('tr');
tableElement.appendChild(tableRowHeader);

let allPhones = [];
let storedData = [];

for (let i = 0; i < tableHeader.length; i++) {
  let thElement = document.createElement('th');
  tableRowHeader.appendChild(thElement);
  thElement.textContent = tableHeader[i];
}

function Phone(userName, phoneType) {
  this.userName = userName;
  this.phoneType = phoneType;
  this.price = 0;
  this.condition = '';

  allPhones.push(this);
}
// new Phone('Mamehmf', 'ddd');

Phone.prototype.randomNum = function () {
  return Math.floor(Math.random() * (500 - 100)) + 100;
};
Phone.prototype.conditionHandler = function () {
  if (this.price < 200) {
    return 'Used';
  } else {
    return 'New';
  }
};

Phone.prototype.render = function () {
  let tableRowData = document.createElement('tr');
  tableElement.appendChild(tableRowData);

  let tdUserNameElement = document.createElement('td');
  tableRowData.appendChild(tdUserNameElement);
  tdUserNameElement.textContent = this.userName;

  let tdphoneTypeElement = document.createElement('td');
  tableRowData.appendChild(tdphoneTypeElement);
  tdphoneTypeElement.textContent = this.phoneType;

  let tdPriceElement = document.createElement('td');
  tableRowData.appendChild(tdPriceElement);
  this.price = this.randomNum();
  tdPriceElement.textContent = this.price;

  let tdConditionElement = document.createElement('td');
  tableRowData.appendChild(tdConditionElement);
  this.condition = this.conditionHandler();
  tdConditionElement.textContent = this.condition;
};
getData();
// console.log(storedData);
// if (storedData) {
//   for (let i = 0; i < allPhones.length; i++) {
//     console.log(storedData[i].price);
//     allPhones[i].price = storedData[i].price;
//   }
// }
for (let i = 0; i < allPhones.length; i++) {
  allPhones[i].render();
}
renderStoredData();
function renderStoredData() {
  if (storedData) {
    console.log(storedData);
    allPhones = [];

    for (let i = 0; i < storedData.length; i++) {
      new Phone(storedData[i].userName, storedData[i].phoneType);
    }
    console.log(allPhones);

    for (let i = 0; i < allPhones.length; i++) {
      console.log(storedData[i].price);
      allPhones[i]['price'] = storedData[i].price;
    }

    tableElement.textContent = '';
    let tableRowHeader = document.createElement('tr');
    tableElement.appendChild(tableRowHeader);
    for (let i = 0; i < tableHeader.length; i++) {
      let thElement = document.createElement('th');
      tableRowHeader.appendChild(thElement);
      thElement.textContent = tableHeader[i];
    }
    for (let i = 0; i < allPhones.length; i++) {
      allPhones[i].render();
    }
  }
}

function storeData() {
  localStorage.setItem('phones', JSON.stringify(allPhones));
}

function getData() {
  storedData = JSON.parse(localStorage.getItem('phones'));
}

let form = document.getElementById('form');

form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();

  let userName = event.target.userName.value;
  let phoneType = event.target.phoneType.value;
  new Phone(userName, phoneType);
  tableElement.textContent = '';
  let tableRowHeader = document.createElement('tr');
  tableElement.appendChild(tableRowHeader);
  for (let i = 0; i < tableHeader.length; i++) {
    let thElement = document.createElement('th');
    tableRowHeader.appendChild(thElement);
    thElement.textContent = tableHeader[i];
  }
  storeData();
  for (let i = 0; i < allPhones.length; i++) {
    allPhones[i].render();
  }

  getData();
  console.log(storedData);
}

let button = document.getElementById('clear');
button.addEventListener('click', clearFunc);
function clearFunc() {
  localStorage.clear;
}
