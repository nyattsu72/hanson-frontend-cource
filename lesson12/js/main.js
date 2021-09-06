'use strict';
const menuContainer = document.getElementById('js-menu_container');
const menuLists = document.createElement('ul');

function showLoadingImg() {
	const createLoadingBox = document.createElement('div');
	createLoadingBox.classList.add('ly_loading');
	createLoadingBox.id = 'js-loading';
	const loadingImg = document.createElement('img');
	loadingImg.src = 'images/loading-circle.gif';
	loadingImg.classList.add('el_loadingImg');
	const getBody = document.getElementsByTagName('body');
	getBody[0].appendChild(createLoadingBox).appendChild(loadingImg);
}

function hideLoadingImg() {
	const loading = document.getElementById('js-loading');
	loading.remove();
}

function createMenuList(data) {
	const fragment = document.createDocumentFragment();
	menuLists.innerHTML = '';

	data.forEach((value) => {
		const listItem = document.createElement('li');
		const listImg = document.createElement('img');
		listImg.src = value.img;
		listImg.alt = value.alt;
		listImg.width = 40;
		listImg.height = 40;

		const listAnchor = document.createElement('a');
		listAnchor.href = value.a;
		listAnchor.textContent = value.text;
		fragment.appendChild(listItem).appendChild(listAnchor).appendChild(listImg);
	});
	menuContainer.appendChild(menuLists).appendChild(fragment);
}

const clickBtn = document.getElementById('js-loadmenuBtn');
clickBtn.addEventListener(
	'click',
	() => {
		callMenuContents();
	},
	false
);

const MENU_DATA_URL = 'https://jsondata.okiba.me/v1/json/Aticp210816214718';
async function fetchMenuContents() {
	showLoadingImg();
	try {
		const response = await fetch(MENU_DATA_URL);
		const json = await response.json();
		return json.data;
	} catch {
		console.error('Could not get the value');
	}
}

async function callMenuContents() {
	try {
		const menuContents = await fetchMenuContents();
		if (menuContents.length > 0) {
			console.log(menuContainer);
			createMenuList(menuContents);
		} else {
			menuContainer.textContent = '表示するメニューがありませんでした';
		}
	} catch {
		menuContainer.textContent = '表示することができませんでした';
	} finally {
		hideLoadingImg();
	}
}
