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
  values.forEach(item => {
    const listItem = document.createElement('li');

    const listImg = document.createElement('img');
    listImg.src = item.img;
    listImg.alt = item.alt;
    listImg.width = 40;
    listImg.height = 40;

    const listAnchor = document.createElement('a');
    listAnchor.href = item.to;
    listAnchor.textContent = item.text;

    listAnchor.insertAdjacentElement('afterbegin', listImg);
    menuContainer.appendChild(menuLists).appendChild(listItem).appendChild(listAnchor);
  });
})
