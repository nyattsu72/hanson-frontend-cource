"use strict";
const menuContainer = document.getElementById("js-menu_container");
const menuLists = document.createElement("ul");

const requestURL = await fetch("https://jsondata.okiba.me/v1/json/gU7av210812202623");
const menuContents = await requestURL.json();

const loading = document.getElementById("js-loading");

function showLoadingImg() {
  const loadingImg = document.createElement("img");
  loadingImg.src = "images/loading-circle.gif";
  loadingImg.classList.add("el_loadingImg");

  loading.appendChild(loadingImg);
}

function createMenuList(values) {
  const fragment = document.createDocumentFragment();

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

    fragment.appendChild(listItem).appendChild(listAnchor).appendChild(listImg);
  });

  menuContainer.appendChild(menuLists).appendChild(fragment);
}

const fetchMenuContents = new Promise((resolve, reject) => {
  showLoadingImg();

  setTimeout(() => {
    if (menuContents.length >= 0){
      resolve(menuContents);
    } else {
      reject(new Error("Could not get the value"));
    }
  }, 3000);
});

async function callMenuContents() {
  try {
    const menuContentsValues = await fetchMenuContents;
    if(menuContents.length > 0){
      createMenuList(menuContentsValues);
    }else{
      menuContainer.textContent = "表示するメニューがありませんでした";
    }
  } catch (e) {
    menuContainer.textContent = "表示することができませんでした";
    console.error("error：", e.message);
  } finally {
    loading.remove();
  }
}

callMenuContents();
