'use strict';
const openModalBtn = document.getElementById('js-openModalBtn');
openModalBtn.addEventListener(
	'click',
	() => {
		const getModal = document.getElementById('js-modalContainer');
		getModal.classList.add('is-visible');
		document.body.insertAdjacentHTML(
			'afterbegin',
			'<div id="js-bgFixed" class="el_modalBg"></div>'
		);
		document.body.style.position = 'fixed';
	},
	false
);

function closeModal() {
	const getModal = document.getElementById('js-modalContainer');
	getModal.classList.remove('is-visible');
	document.body.removeAttribute('style');
	const modalBg = document.getElementById('js-bgFixed');
	modalBg.remove();
}

const closeModlBtn = document.getElementById('js-closeModal');
closeModlBtn.addEventListener(
	'click',
	() => {
		closeModal();
	},
	false
);

function hideModalButton() {
	const openModalBtn = document.getElementById('js-openModalBtn');
	openModalBtn.remove();
}

const form = document.getElementById('js-loadmenuBtn');
form.addEventListener(
	'click',
	(event) => {
		event.preventDefault();
		const inputNumber = document.getElementById('number');
		const inputText = document.getElementById('words');
		if (inputNumber.value && inputText.value.trim()) {
			outputForm();
			closeModal();
			callMenuContents();
			hideModalButton();
		} else {
			alert('未入力です。');
		}
	},
	false
);

function outputForm() {
	const inputNumber = document.getElementById('number');
	const inputText = document.getElementById('words');
	console.log(inputNumber.value);
	console.log(inputText.value.trim());
}

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

function removeInnerHTML(element) {
	element.innerHTML = '';
}

const menuLists = document.createElement('ul');
function createMenuList(data) {
	console.log(data);
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

const MENU_DATA_URL = 'https://myjson.dit.upm.es/api/bins/ivk7';
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
