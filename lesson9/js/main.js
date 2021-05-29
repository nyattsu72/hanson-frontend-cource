'use strict';
const menuContainer = document.getElementById('js-menu_container');
const menuLists = document.createElement('ul');
const menuContents = [{ to: "bookmark.html", img: 'images/1.png', alt: '画像1', text: 'ブックマーク' },
  { to: 'message.html', img: 'images/2.png', alt: '画像2', text: 'メッセージ' }];
const loading = document.getElementById('js-loading');

function createMenuList(values) {
  loading.style.display = "none";

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
    
      const fragment = document.createDocumentFragment();
      fragment.appendChild(listAnchor).appendChild(listImg);
      listItem.appendChild(fragment);

      menuContainer.appendChild(menuLists).appendChild(listItem);
    });
}

window.onload = () => {
  const fetchMenuContents = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menuContents);
    }, 3000)
  });

  async function callMenuContents() {
    const menuContentsValues = await fetchMenuContents;
    createMenuList(menuContentsValues);
  }
  callMenuContents();
};

