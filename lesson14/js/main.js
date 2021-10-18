'use strict';
//Modal
const menuLists = document.createElement('ul');

function operationModalWindow() {
	const getModalWindow = document.getElementById('js-modalContainer');

	loadMenu();
	closeModalWindow();
}

//open Modal
const openModalBtn = document.getElementById('js-openModalBtn');

openModalBtn.addEventListener(
	'click',
	() => {
		const getModal = document.getElementById('js-modalContainer');
		getModal.classList.add('is-visible');
		const modalBg = document.createElement('div');
		modalBg.id = 'js-bgFixed';
		modalBg.classList.add('el_modalBg');
		document.body.appendChild(modalBg);
		document.body.style.position = 'fixed';
	},
	false
);

function loadMenu() {
	const loadMenuBtn = document.getElementById('js-loadmenuBtn');
	loadMenuBtn.addEventListener(
		'click',
		(event) => {
			const inputNumber = document.getElementById('number');
			if (!inputNumber.value === false) {
				getInputValue();
				callMenuContents();
			} else {
				alert('未入力です。');
			}
		},
		false
	);
}

const closeModlBtn = document.getElementById('js-closeModal');

closeModlBtn.addEventListener(
	'click',
	() => {
		const getModal = document.getElementById('js-modalContainer');
		getModal.classList.remove('is-visible');
		const bgFixed = document.getElementById('js-bgFixed');
		document.body.removeAttribute('style');
		bgFixed.remove();
	},
	false
);

//CREATE MENU contents
function showLoadingImg() {
	const menuContainer = document.getElementById('js-menu_container');
	const createLoadingBox = document.createElement('div');
	createLoadingBox.classList.add('ly_loading');
	createLoadingBox.id = 'js-loading';
	const loadingImg = document.createElement('img');
	loadingImg.src = 'images/loading-circle.gif';
	loadingImg.classList.add('el_loadingImg');
	menuContainer.appendChild(createLoadingBox).appendChild(loadingImg);
}

function hideLoadingImg() {
	const loading = document.getElementById('js-loading');
	loading.remove();
}

function removeInnerHTML(element) {
	element.innerHTML = '';
}

//menulist
function createMenuList(data) {
	const createMenuContainer = document.createElement('div');
	createMenuContainer.setAttribute('id', 'js-menu_container');
	const menuContainer = document.getElementById('js-menu_container');
	const fragment = document.createDocumentFragment();
	removeInnerHTML(menuLists);

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

	const menuContents = menuContainer
		.appendChild(menuLists)
		.appendChild(fragment);
	const btnArea = document.querySelector('.bl-btnArea');
	btnArea.after(menuContents);
}

const MENU_DATA_URL = 'https://jsondata.okiba.me/v1/json/Aticp210816214718';
async function fetchMenuContents() {
	try {
		const response = await fetch(MENU_DATA_URL);
		const json = await response.json();
		return json.data;
	} catch {
		console.error('Could not get the value');
	}
}

async function callMenuContents() {
	showLoadingImg();
	const menuContainer = document.getElementById('js-menu_container');
	try {
		const menuContents = await fetchMenuContents();
		if (menuContents.length > 0) {
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
