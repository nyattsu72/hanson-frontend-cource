'use strict';

const categoryTab = document.getElementById('js-tab');

function showLoadingImg() {
	const newsContentArea = document.querySelector('.news-area');
	const createLoadingBox = document.createElement('div');
	createLoadingBox.classList.add('ly_loading');
	createLoadingBox.id = 'js-loading';
	const loadingImg = document.createElement('img');
	loadingImg.src = 'images/loading-circle.gif';
	loadingImg.classList.add('el_loadingImg');
	newsContentArea.appendChild(createLoadingBox).appendChild(loadingImg);
}

function hideLoadingImg() {
	const loading = document.getElementById('js-loading');
	loading.remove();
}

function createTabContent(){
	const newsContentArea = document.createElement('div');
	newsContentArea.classList.add('news-area');
	newsContentArea.setAttribute('role','tabpanel');
	categoryTab.parentNode.insertBefore(newsContentArea,categoryTab.nextSibling);
}

function renderCategoryTab(data){
	const fragment = document.createDocumentFragment();

	data.forEach((category) => {
		const categoryTab = document.createElement('li');
		categoryTab.classList.add('tab_list_item');
		categoryTab.setAttribute('role','presentation');

		const categoryButton = document.createElement('button');
		categoryButton.textContent = category.name;
		categoryButton.setAttribute('class', 'tab-button js-tabButton');
		categoryButton.setAttribute('aria-selected', 'false');
		categoryButton.setAttribute('role', 'tab');
		categoryButton.setAttribute('tabindex', '-1');
		fragment.appendChild(categoryTab).appendChild(categoryButton);
	});

	const categoryTabLists = document.querySelector('.tab-list');
	categoryTabLists.appendChild(fragment);
}

function categoryTabInitial(){
	const firstTab = document.querySelectorAll('.tab-button')[0];
	firstTab.setAttribute('aria-selected','true');
	firstTab.setAttribute('tabindex','0');
}

function renderNewsArticle(data){
	const newsContentArea = document.querySelector('.news-area');
	const newsLists = document.createElement('ul');
	newsLists.classList.add('news-list');
	const fragment = document.createDocumentFragment();

	const displayedResults = 5;
	for (let i = 0; i < displayedResults; ++i){
		const li = document.createElement('li');
		li.classList.add('news-item');

		const anchor = document.createElement('a');
		anchor.classList.add('news-link');
		anchor.href = data[i].link;
		anchor.textContent = data[i].title;
		fragment.appendChild(li).appendChild(anchor);
	}

	newsContentArea.appendChild(newsLists).appendChild(fragment);
};

function resetArticle(){
	const newsLists= document.querySelector('.news-list');
	newsLists.remove();
}

function displayErrorMassage(error){
	const getNewsArea = document.querySelectorAll('.news-area');
	for(let i = 0; i < getNewsArea.length; i++){
		const createTextBox = document.createElement('p');
		createTextBox.textContent = error;
		getNewsArea[i].appendChild(createTextBox);
	}
}

async function fetchNewsData() {
	const NEWS_DATA_URL = 'https://api.json-generator.com/templates/2PqhEvPcqUZW/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl';
	try {
		const response = await fetch(NEWS_DATA_URL);
		if(response.ok){
			const json = await response.json();
			return json;
		} else{
			throw new Error('Network Error');
		}
	}
	catch (error){
		console.error('Failed to get the data. error:',error);
		displayErrorMassage(error);
	}
}

async function callCategry(){
	const data = await fetchNewsData();
	const categoryData = data.category;

	if(categoryData){
		renderCategoryTab(categoryData);
		categoryTabInitial()
	}
}

async function callAllArticle(){
	showLoadingImg();
	try{
		const data = await fetchNewsData();
		const articleData = data.article;
		renderNewsArticle(articleData);
	} catch (error) {
		displayErrorMassage(error);
	}finally{
		hideLoadingImg();
	}
}

async function callSerectArticle(e){
	showLoadingImg();
	try{
		const data = await fetchNewsData();
		const articleData = data.article;
		const selectedTab = e.target.textContent;
		const sortData = articleData.filter((filterData) => {
		return filterData.category === selectedTab;
	});
	renderNewsArticle(sortData);
	}catch (error){
		displayErrorMassage(error);
	}finally{
		hideLoadingImg();
	}


}


function init(){
	createTabContent()
	callCategry();
	callAllArticle()
}

init();

function changeTabs(e) {
	const tabs = document.querySelectorAll('[role="tab"]');
	const selectedTab = e.target;
	tabs.forEach((target) => target.setAttribute('aria-selected', false));
	selectedTab.setAttribute('aria-selected', true);

	const selectCategory = selectedTab.textContent;

	if(selectCategory === 'ニュース'){
		resetArticle()
		callAllArticle()
	}else{
		resetArticle()
		callSerectArticle(e);
	}
};

const categorySortArticle = (data) => {
	const categoryTab = document.getElementById('js-tab');
	const selectCategoryTab = categoryTab.querySelector('.tab-button[aria-selected="true"]').textContent;

	return data.filter((filterData) => {
		return filterData.category === selectCategoryTab;
	});
};

categoryTab.addEventListener('click', (e) => {
	changeTabs(e)
})


