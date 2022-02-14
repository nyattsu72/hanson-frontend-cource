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

function categoryTabInitial(){
	const firstTab = document.getElementsByClassName('tab-button')[0];
	firstTab.setAttribute('aria-selected','true');
	firstTab.setAttribute('tabindex','0');
}





window.addEventListener('load', ()=>{
	category();
})
