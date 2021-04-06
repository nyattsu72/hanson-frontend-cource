'use strict';
const url = 'http://designtorch.xsrv.jp/demo/json/listdata.json';
//Jsonファイル読み込み

fetch(url)
  .then((response) => {
  return response.json()
  })
  .then((result) => {
    linkList(result);
  })
  .catch((e) => {
    alert('Data read failure');
  })

//DOM操作

  const listsMenu = document.getElementById('lists-menu');
  const createdList = document.createElement('ul');

function linklist(jsondata) {
  jsondata.forEach(item => {
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
}


//非同期処理



