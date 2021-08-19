"use strict";
const menuContainer = document.getElementById("js-menu_container");
const menuLists = document.createElement("ul");
const loading = document.getElementById("js-loading");

function showLoadingImg() {
  const loadingImg = document.createElement("img");
  loadingImg.src = "images/loading-circle.gif";
  loadingImg.classList.add("el_loadingImg");

  loading.appendChild(loadingImg);
}

function createMenuList({data}) {
  const fragment = document.createDocumentFragment();

  data.forEach((value) => {
      const listItem = document.createElement("li");
  
      const listImg = document.createElement("img");
      listImg.src = value.img;
      listImg.alt = value.alt;
      listImg.width = 40;
      listImg.height = 40;
  
      const listAnchor = document.createElement("a");
      listAnchor.href = value.a;
      listAnchor.textContent = value.text;
  
      fragment.appendChild(listItem).appendChild(listAnchor).appendChild(listImg);

    });

  menuContainer.appendChild(menuLists).appendChild(fragment);
}

const MENU_DATA_URL = 'https://jsondata.okiba.me/v1/json/Aticp210816214718';

async function fetchMenuContents(){
  showLoadingImg();

  const response = await fetch(MENU_DATA_URL);
  
  if(response.status === 200){
    return await response.json();

  }else{
   console.error("Could not get the value");
  }

}

async function callMenuContents() {
  try {
    const menuContents = await fetchMenuContents();
    createMenuList(menuContents);

  } catch {
    menuContainer.textContent = "表示することができませんでした";
    console.error("Could not get the value");

  } finally {
    loading.remove();
    
  }
}

callMenuContents();
