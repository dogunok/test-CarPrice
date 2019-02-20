"use strict";

var template = document.querySelector('.templateObjact');
var addTop = document.querySelector('.addToTop');
var addBottom = document.querySelector('.addToBottom');
var removeFirst = document.querySelector('.removeFirst');
var removeLast = document.querySelector('.removeLast');
var main = document.querySelector('.main');
var list = document.querySelector('.list');
var cart = document.querySelector('.cart');
var submitBtn = document.querySelector('.submitBtn');

var getFile = function getFile() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/data', false);
  xhr.send();
  return JSON.parse(xhr.response);
};

var quantityElem = function quantityElem(elem, tag, clone) {
  elem.forEach(function (item) {
    var newTag = document.createElement(tag);
    newTag.textContent = item;
    clone.querySelector('ul').appendChild(newTag);
  });
};

var render = function render(data) {
  data.forEach(function (item, i) {
    var templateClone = template.content.cloneNode(true);
    templateClone.querySelector('h4').textContent = item.title;
    quantityElem(item.attributes, 'li', templateClone);
    templateClone.querySelector('p').textContent = item.description;
    templateClone.querySelector('.serialNumber').textContent = i + 1;
    main.appendChild(templateClone);
  });
};

render(getFile());

var changeNumber = function changeNumber(elem) {
  var serialNumber = document.querySelectorAll('.serialNumber');
  Array.prototype.slice.call(elem).forEach(function (item, i) {
    serialNumber[i].textContent = i + 1;
  });
};

addBottom.addEventListener('click', function () {
  var block = document.querySelectorAll('.block');
  var newBlock = block[0].cloneNode(true);
  main.appendChild(newBlock);
  block = document.querySelectorAll('.block');
  changeNumber(block);
});
addTop.addEventListener('click', function () {
  var block = document.querySelectorAll('.block');
  var newBlock = block[block.length - 1].cloneNode(true);
  main.insertBefore(newBlock, block[0]);
  block = document.querySelectorAll('.block');
  changeNumber(block);
});
removeFirst.addEventListener('click', function () {
  var block = document.querySelectorAll('.block');
  main.removeChild(block[0]);
  block = document.querySelectorAll('.block');
  changeNumber(block);
});
removeLast.addEventListener('click', function () {
  var block = document.querySelectorAll('.block');
  main.removeChild(block[block.length - 1]);
  block = document.querySelectorAll('.block');
  changeNumber(block);
});
list.addEventListener('click', function () {
  document.body.classList.add('sortList');
  document.body.classList.remove('sortBlock');
  list.classList.add('active');
  cart.classList.remove('active');
});
cart.addEventListener('click', function () {
  document.body.classList.remove('sortList');
  document.body.classList.add('sortBlock');
  cart.classList.add('active');
  list.classList.remove('active');
});
submitBtn.addEventListener('click', function (evt) {
  var addArticle = document.querySelector('#addArticle');
  var newTitle = document.querySelector('#newTitle');
  var describe = document.querySelector('#describe');
  var obj = [{
    "title": newTitle.value,
    "attributes": [addArticle.value],
    "description": describe.value
  }];
  render(obj);
  var block = document.querySelectorAll('.block');
  changeNumber(block);
});