'use strict';
const menuContainer = document.getElementById('menu-container');
const menuLists = document.createElement('ul');
const menuContents = [{ to: "bookmark.html", img: '1.png', alt: '画像1', text: 'ブックマーク' },
  { to: 'message.html', img: '2.png', alt: '画像2', text: 'メッセージ' }];


const fetchMenuContents = new Promise((resolve) => {
  setTimeout(() => {
    resolve(menuContents);
  }, 3000)
});



fetchMenuContents.then((values) => {
  values.forEach(value => {
    
    const listItem = document.createElement('li');

    const listImg = document.createElement('img');
    listImg.src = value.img;
    listImg.alt = value.alt;
    listImg.width = 40;
    listImg.height = 40;

    const listAnchor = document.createElement('a');
    listAnchor.href = value.to;
    listAnchor.textContent = value.text;
    listAnchor.insertAdjacentElement('afterbegin', listImg);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(listAnchor);
    listItem.appendChild(fragment);

    menuContainer.appendChild(menuLists).appendChild(listItem);
  });
})
