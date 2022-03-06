'use strict';
const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabs);
});

function changeTabs(e) {
	const tabs = document.querySelectorAll('[role="tab"]');
	const selectedTab = e.target;
	tabs.forEach((target) => target.setAttribute('aria-selected', false));
	selectedTab.setAttribute('aria-selected', true);

	const tabPanels = document.querySelectorAll('[role="tabpanel"]');
	tabPanels.forEach((tabpanel) => tabpanel.setAttribute('aria-hidden', true));
	const getSelectedTadID = selectedTab.getAttribute('aria-controls');
	const selectedPanel = document.getElementById(getSelectedTadID);
	selectedPanel.setAttribute('aria-hidden', false);
}
let tabFocus = 0;
tabList.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
		tabs[tabFocus].setAttribute('tabindex', -1);
		if (e.key === 'ArrowRight') {
			tabFocus++;
			if (tabFocus >= tabs.length) {
				tabFocus = 0;
			}
		} else if (e.key === 'ArrowLeft') {
			tabFocus--;
			if (tabFocus < 0) {
				tabFocus = tabs.length - 1;
			}
		}

		tabs[tabFocus].setAttribute('tabindex', 0);
		tabs[tabFocus].focus();
	}
});

function displayErrorMassage(error){
	const getNewsArea = document.querySelectorAll('.news-area');
	for(let i = 0; i < getNewsArea.length; i++){
		const createTextBox = document.createElement('p');
		createTextBox.textContent = error;
		getNewsArea[i].appendChild(createTextBox);
	}
}

const createNewIcon = () =>{
	const iconBox = document.createElement('span');
	iconBox.classList.add('icon-new');
	iconBox.textContent = 'new';
}

const createCommnetIcon = () =>{
	const commentBox = document.createElement('span');
	commentBox.classList.add('comment-count');
	commentBox.textContent = 'comment';
}

const categoryData = {"category":[{"name":"ニュース","image":"./images/bg-news.png"},{"name":"経済","image":"./images/bg-economy.png"},{"name":"エンタメ","image":"./images/bg-entertaiment.png"},{"name":"スポーツ","image":"./images/bg-sports.png"},{"name":"国内","image":"./images/bg-home.png"}]};



function category(){
	const category = categoryData.category;
	console.log(category);
	const fragment = document.createDocumentFragment();

	category.forEach((data,i) => {
		const categoryTab = document.createElement('li');
		categoryTab.classList.add('tab-list-item');
		categoryTab.setAttribute('role','presentation');

		const categoryButton = document.createElement('button');
		categoryButton.textContent = data.name;
		categoryButton.setAttribute('id','tab-' + (i+1));
		categoryButton.setAttribute('class','tab-button js-tabButton');
		categoryButton.setAttribute('aria-controls','panel-' + (i+1));
		categoryButton.setAttribute('aria-selected','false');
		categoryButton.setAttribute('role','tab');
		categoryButton.setAttribute('tabindex','-1');

		fragment.appendChild(categoryTab).appendChild(categoryButton);
	});

	const categoryTabLists = document.querySelector('.tab-list');
	categoryTabLists.appendChild(fragment);
	categoryTabInitial()
}

function addNewsContentsIllust(){
	const getCategoryIllust = document.querySelectorAll('.category_illaust');
	const category = categoryData.category;

	getCategoryIllust.forEach((illust) =>{

	})
}

function categoryTabInitial(){
	const firstTab = document.getElementsByClassName('tab-button')[0];
	firstTab.setAttribute('aria-selected','true');
	firstTab.setAttribute('tabindex','0');
}


const newsArticle = {"article":[
    { "id": "9d061710-5dbb-4731-88a8-213f1f486ced", "title": "M1開催迫る", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "エンタメ", "coments": [{"id":"","value":"","user":{"id":"","name":""}}], "date":"21-12-1"},
    { "id": "3507e9fb-8dd9-41d2-9a2a-f8eb980fd19f", "title": "2021年の世相を一字で表す「今年の漢字」は「金」", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "国内", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "21-12-13" },
    { "id": "0ac298fc-fb16-4fbc-adca-a2691a359b8d", "title": "消費税10％→5％に！", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "経済", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "21-12-23" },
    { "id": "d76c2922-33a2-4c84-ba05-a68de26c89c1", "title": "箱根駅伝まもなく", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "スポーツ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "21-12-25" },
    { "id": "32c520d5-e46a-453f-9640-cd3c7cf60016", "title": "８時だよ全員集合が復活！", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "エンタメ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "21-12-30" },
    { "id": "01ea32e3-3c7b-45c9-bfa6-dd5c03c26687", "title": "W杯まもなく", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "スポーツ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "21-12-30" },
    { "id": "a7ff0f58-347e-4ecb-8a15-5f51f88f1642", "title": "関東で年内初の積雪", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "国内", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-01" },
    { "id": "a7ade8bd-721a-4128-9be2-f30fa2214b62", "title": "明日は仕事初め", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "国内", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-02" },
    { "id": "ba591fdd-1bd8-43eb-87e0-4024b4b9e95b", "title": "原油の価格が高騰", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "経済", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-03" },
    { "id": "d304bbee-118b-4b50-8438-42ffea89d0dd", "title": "新しく5万円札発行を決定", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "経済", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-03" },
    { "id": "b6b3feb0-d77b-4a49-bd7c-8659ba6c1fa8", "title": "動物園に白いトラが誕生", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "国内", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-04" },
    { "id": "a33ba75e-9257-43d5-8336-8d27b170e614", "title": "新しく球団を設立", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "スポーツ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-05" },
    { "id": "594b4d1e-014e-4df3-9687-19ced275d00b", "title": "スターウォーズの映画館で一挙公開", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "エンタメ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-05" },
    { "id": "669fdb7c-89b5-4700-b55a-2d9521d5b5ff", "title": "スノーボードの大会が長野で開催", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "スポーツ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-1-06" },
    { "id": "5c72ad5d-d6c5-4759-a601-f23e264f208b", "title": "全国的に賃金上昇", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "経済", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-06" },
    { "id": "a78b7c79-a49b-442c-ac82-5aaeb89b3390", "title": "今話題のアニメ、漫画、映画は？", "link": "", "category": "エンタメ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "" },
    { "id": "bef17dfa-52a4-42c5-92a9-7840be8a65ae", "title": "円高？円安？？", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "経済", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-06" },
    { "id": "440aad82-9688-44c9-b236-b729aab4d17a", "title": "雪合戦大会が開催", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "スポーツ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-06" },
    { "id": "1aaf5fed-13a8-489a-882b-45965994ee39", "title": "人気の旅行先", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "国内", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-06" },
    { "id": "2354548f-8cae-4e42-a44c-6adecceedaf8", "title": "アカデミー賞にノミネート", "link": "https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#16", "category": "エンタメ", "coments": [{ "id": "", "value": "", "user": { "id": "", "name": "" } }], "date": "22-01-06" }
  ]}


// const articleData = newsArticle.article;
// const serchCategory = categoryData.category;
// const categoryDataExtract = articleData.filter((filterData) => {
// 		return filterData.category === serchCategory;
// 	});









const articleData = newsArticle.article;

const displayAllNewsArticle = (array) => {
	const articleTabPanell = document.querySelector('.news-area');
	const articleDisplayArea = document.querySelector('.news-list');
	console.log(articleTabPanell);
	const fragment = document.createDocumentFragment();

	const numberOfDisplay = 5;
	for (let i = 0; i < numberOfDisplay; ++i){
		const li = document.createElement('li');
		li.classList.add('news-item')

		const anchor = document.createElement('a');
		anchor.classList.add('news-link');

		anchor.href = array[i].link;
		anchor.textContent = array[i].title;
		fragment.appendChild(li).appendChild(anchor);
	}

	articleTabPanell.appendChild(articleDisplayArea).appendChild(fragment);



}

displayAllNewsArticle(articleData);



window.addEventListener('load', ()=>{
	category();

})

