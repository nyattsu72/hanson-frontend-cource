'use strict';
//Modal
const menuLists = document.createElement('ul');

function createModalWindow() {
	const modalWindow = document.createElement('div');
	const modal = document.createDocumentFragment();
	const createMenuBtn = document.createElement('button');
	const createCloseBtn = document.createElement('button');
	const createMenuContainer = document.createElement('div');

	//modal container
	modalWindow.classList.add('bl_modal');
	modalWindow.setAttribute('id', 'js-modalContainer');

	//menu button
	createMenuBtn.setAttribute('id', 'js-loadmenuBtn');
	createMenuBtn.setAttribute('class', 'btn');
	createMenuBtn.textContent = `MENU`;

	//close button
	createCloseBtn.setAttribute('id', 'js-closeModal');
	createCloseBtn.setAttribute('class', 'el_closeModalBtn');
	createCloseBtn.textContent = '×';

	createMenuContainer.setAttribute('id', 'js-menu_container');

	modal.appendChild(createMenuBtn);
	modal.appendChild(createCloseBtn);
	modal.appendChild(createMenuContainer);
	modalWindow.appendChild(modal);
	document.body.appendChild(modalWindow);

	loadMenu();
	closeModalWindow();
}

//open Modal
const openModalBtn = document.getElementById('js-openModalBtn');

openModalBtn.addEventListener(
	'click',
	() => {
		const modalBg = document.createElement('div');
		modalBg.id = 'js-bgFixed';
		modalBg.classList.add('el_modalBg');
		document.body.appendChild(modalBg);
		createModalWindow();
		document.body.style.position = 'fixed';
	},
	false
);

function loadMenu() {
	const loadMenuBtn = document.getElementById('js-loadmenuBtn');
	loadMenuBtn.addEventListener(
		'click',
		(event) => {
			callMenuContents();
			event.stopPropagation();
		},
		false
	);
}

function closeModalWindow() {
	const closeModlBtn = document.getElementById('js-closeModal');

	closeModlBtn.addEventListener(
		'click',
		() => {
			const modalContainer = document.getElementById('js-modalContainer');
			const modalWindow = document.createElement('div');
			const bgFixed = document.getElementById('js-bgFixed');
			removeInnerHTML(modalWindow);
			removeInnerHTML(menuLists);
			document.body.removeAttribute('style');
			bgFixed.remove();
			modalContainer.remove();
		},
		false
	);
}

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
	menuContainer.appendChild(menuLists).appendChild(fragment);
}

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
