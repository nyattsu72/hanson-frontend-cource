"use strict";
const menuContainer = document.getElementById("js-menu_container");
const menuLists = document.createElement("ul");
const menuContents = [
  {
    to: "bookmark.html",
    img: "images/1.png",
    alt: "画像1",
    text: "ブックマーク",
  },
  {
    to: "message.html",
    img: "images/2.png",
    alt: "画像2",
    text: "メッセージ",
  },
];

const loading = document.getElementById("js-loading");

const loadingImg = document.createElement("img");
loadingImg.src = "images/loading-circle.gif";
loadingImg.classList.add("el_loadingImg");

function createMenuList(values) {
  values.forEach((value) => {
    const listItem = document.createElement("li");

    const listImg = document.createElement("img");
    listImg.src = value.img;
    listImg.alt = value.alt;
    listImg.width = 40;
    listImg.height = 40;

    const listAnchor = document.createElement("a");
    listAnchor.href = value.to;
    listAnchor.textContent = value.text;

    const fragment = document.createDocumentFragment();
    fragment.appendChild(listAnchor).appendChild(listImg);
    listItem.appendChild(fragment);

    menuContainer.appendChild(menuLists).appendChild(listItem);
  });
}

const fetchMenuContents = new Promise((resolve, reject) => {
  loading.appendChild(loadingImg);

  setTimeout(() => {
    if (menuContents.length > 0) {
      resolve(menuContents);
    } else {
      reject(new Error("Could not get the value"));
    }
  }, 3000);
});

async function callMenuContents() {
  try {
    const menuContentsValues = await fetchMenuContents;
    createMenuList(menuContentsValues);
  } catch (e) {
    menuContainer.textContent = "表示することができませんでした";
    console.error("error：", e.message);
  } finally {
    loading.remove();
  }
}

callMenuContents();
