'use strict';
const listsMenu = document.getElementById('lists-menu');
const createdList = document.createElement('ul');
const menuContents = [{ to: "bookmark.html", img: '1.png', alt: '画像1', text: 'ブックマーク' },
  { to: 'message.html', img: '2.png', alt: '画像2', text: 'メッセージ' }];

const fetchMenuContents = new Promise((resolve) => {
  setTimeout(() => {
    resolve(menuContents);
  }, 3000)
});



fetchMenuContents.then((value) => {
  value.forEach(item => {
    const createdListItem = document.createElement('li');

    const createdImg = document.createElement('img');
    createdImg.src = item.img;
    createdImg.alt = item.alt;
    createdImg.width = 40;
    createdImg.height = 40;

    const createdAnchor = document.createElement('a');
    createdAnchor.href = item.to;
    createdAnchor.textContent = item.text;

    createdAnchor.insertAdjacentElement('afterbegin', createdImg);
    listsMenu.appendChild(createdList).appendChild(createdListItem).appendChild(createdAnchor);
  });
})
