'use strict';

const task03 = document.getElementById('task03');
const createdUl = document.createElement('ul');

let createListArray = [
  { anchor: 'a1.html', text: 'a1' },
  { anchor: 'a2.html', text: 'a2' }
]

createListArray.forEach(function(value){
  console.log(value.anchor);
  let createdLi = document.createElement('li');

    let createdImg = document.createElement('img');
  createdImg.src = "/images/bookmark.png";
  createdImg.width = 20;
  createdImg.height = 20;

  let createdA = document.createElement('a');
  createdA.href = value.anchor;
  createdA.textContent = value.text;

  createdA.insertAdjacentElement('afterbegin',createdImg);
  task03.appendChild(createdUl).appendChild(createdLi).appendChild(createdA);

})











// console.log(createdLi);
