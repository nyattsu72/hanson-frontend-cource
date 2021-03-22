'use strict';

const task03 = document.getElementById('task03');
const createdUl = document.createElement('ul');

let createLists = [
  { anchor: 'a1.html', text: 'a1' },
  { anchor: 'a2.html', text: 'a2' }
]

createLists.forEach(function(item){
  let createdLi = document.createElement('li');

  let createdImg = document.createElement('img');
  createdImg.src = "/images/bookmark.png";
  createdImg.width = 20;
  createdImg.height = 20;

  let createdAnchor = document.createElement('a');
  createdAnchor.href = item.anchor;
  createdAnchor.textContent = item.text;

  createdAnchor.insertAdjacentElement('afterbegin',createdImg);
  task03.appendChild(createdUl).appendChild(createdLi).appendChild(createdA);

})











// console.log(createdLi);
