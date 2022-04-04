'use strict';

function renderCategoryTab(data){
	console.log(data);
	const categories = data.category;
	const fragment = document.createDocumentFragment();
	console.log(categories);

	categories.forEach((category) => {
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
	const article = data.article;
	const articleRenderArea = document.querySelector('.news-list');
	const fragment = document.createDocumentFragment();
	console.log(article);

	const displayedResults = 5;
	for (let i = 0; i < displayedResults; ++i){
		const li = document.createElement('li');
		li.classList.add('news-item');

		const anchor = document.createElement('a');
		anchor.classList.add('news-link');
		anchor.href = article[i].link;
		anchor.textContent = article[i].title;
		fragment.appendChild(li).appendChild(anchor);
	}
	console.log(fragment);
	articleRenderArea.appendChild(fragment);
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
		if(!response.ok){
			throw new Error('Network Error');
		} else{
			const json = await response.json();
			return json;
		}
	}
	catch (error){
		console.error('Failed to get the data. error:',error);
		displayErrorMassage(error);
	}
}

async function callNewsArticle(){
	const articleData = await fetchNewsData();
	try{
		renderCategoryTab(articleData);
		categoryTabInitial()
		renderNewsArticle(articleData);
		console.log(articleData);
	} catch (error) {
		displayErrorMassage(error);
	}
}

callNewsArticle();
