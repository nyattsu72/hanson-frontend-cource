import { parseISO, differenceInDays } from 'date-fns';

const categoryTab = document.getElementById('js-tab');

function showLoadingImg() {
  const tabContentsArea = document.getElementById('js-newsContents');
  const createLoadingBox = document.createElement('div');
  createLoadingBox.classList.add('loading');
  createLoadingBox.id = 'js-loading';
  const loadingImg = document.createElement('img');
  loadingImg.src = 'images/loading-circle.gif';
  loadingImg.width = 100;
  loadingImg.height = 100;
  loadingImg.classList.add('el_loadingImg');
  tabContentsArea.appendChild(createLoadingBox).appendChild(loadingImg);
}

function hideLoadingImg() {
  document.getElementById('js-loading').remove();
}

function renderTabContentsArea(){
  const tabContentsArea = document.createElement('div');
  tabContentsArea.id = 'js-newsContents';
  categoryTab.parentNode.insertBefore(tabContentsArea,categoryTab.nextSibling);
}

function renderTabContent(data){
  const tabContentsArea = document.getElementById('js-newsContents');
  data.forEach((category,i) => {
    const newsContentArea = document.createElement('div');
    newsContentArea.classList.add('news-area');
    newsContentArea.setAttribute('role','tabpanel');
    newsContentArea.setAttribute('id','panel-'+ (i+1));
    newsContentArea.setAttribute('aria-labelledby','tab-'+ (i+1));
    newsContentArea.setAttribute('aria-hidden','true');
    const articleData = category.article;
    tabContentsArea.appendChild(newsContentArea).appendChild(getNewsArticle(articleData));
  })
}

function renderCategoryTab(data){
  const fragment = document.createDocumentFragment();

  data.forEach((target,i) => {
    const categoryTab = document.createElement('li');
    categoryTab.classList.add('tab_list_item');
    categoryTab.setAttribute('role','presentation');

    const categoryButton = document.createElement('button');
    categoryButton.textContent = target.category;
    categoryButton.setAttribute('id','tab-' + (i+1));
    categoryButton.setAttribute('class', 'tab-button js-tabButton');
    categoryButton.setAttribute('aria-controls','panel-' + (i+1));
    categoryButton.setAttribute('role', 'tab');
    categoryButton.setAttribute('aria-selected', 'false');
    categoryButton.setAttribute('tabindex', '-1');
    fragment.appendChild(categoryTab).appendChild(categoryButton);
  });
  const categoryTabLists = document.querySelector('.tab-list');
  categoryTabLists.appendChild(fragment);
}

const getNewsArticle = (data) => {
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
    addComment(data[i], li);
    addNewIcon(data[i],li);
  }
  newsLists.appendChild(fragment);
  return newsLists;
};

function tabContentsInitialDisplay(data){
  data.forEach((target) =>{
    const activeCategory = target.isActive;

    if(activeCategory){
      const categoryButton = categoryTab.querySelector('.js-tabButton');
      categoryButton.setAttribute('tabindex', '0');
      categoryButton.setAttribute('aria-selected','true');

      const getSelectedTadID = categoryButton.getAttribute('aria-controls');
      const selectedPanel = document.getElementById(getSelectedTadID);
      selectedPanel.setAttribute('aria-hidden', false);
    }
  })
}

function addNewsImage(data){
  const getNewsArea = document.querySelectorAll('.news-area');

  data.forEach((category,i) => {
    const imageArea = document.createElement('div');
    const img = document.createElement('img');
    img.src = category.image;
    img.width = 200;
    img.height = 200;
    getNewsArea[i].appendChild(imageArea).appendChild(img);
  })
}

function addComment({comment}, item) {
  const commentResult = comment.length;
  if (commentResult) {
    const commentBox = document.createElement('span');
    const anchor = document.createElement('a');
    anchor.classList.add('comment-count');
    anchor.textContent = commentResult;
    item.appendChild(commentBox).appendChild(anchor);
  }
}

function addNewIcon({date},item) {
  const articleDateToToday = differenceInDays(new Date(),parseISO(date));
  const judgmenDays = 60;
  if(articleDateToToday <= judgmenDays){
    renderNewIcon(item)
  }
}

function renderNewIcon(item){
  const newIcon = document.createElement('span');
  newIcon.textContent = 'new';
  newIcon.classList.add('icon-new');
  const newsArticleLink = item.querySelector('.news-link');
  newsArticleLink.insertAdjacentElement('afterend',newIcon);
}


function displayErrorMassage(error){
  const getNewsArea = document.getElementById('js-newsContents');
  const createTextBox = document.createElement('p');
  createTextBox.classList.add('error-message');
  createTextBox.textContent = error;
  getNewsArea.appendChild(createTextBox);
}

async function fetchNewsData() {
  const NEWS_DATA_URL = 'https://api.json-generator.com/templates/2PqhEvPcqUZW/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl';
  const response = await fetch(NEWS_DATA_URL);
  if(response.ok){
    const json = await response.json();
    return json
  } else{
    console.error(`${response.status}:${response.statusText}`);
  }
}

async function callnewsContents(){
  showLoadingImg();
  try{
    const json = await fetchNewsData();
    const newsArticleData = json.data;
    if(newsArticleData){
      renderCategoryTab(newsArticleData);
      renderTabContent(newsArticleData);
      tabContentsInitialDisplay(newsArticleData);
      addNewsImage(newsArticleData);
    }else{
      displayErrorMassage('表示するニュースがありませんでした')
    }}
  catch{
    displayErrorMassage('ニュースを表示することができませんでした');
  }
  finally{
    hideLoadingImg();
  }
}

function init(){
  renderTabContentsArea()
  callnewsContents()
}

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
};

init();

categoryTab.addEventListener('click', (e) => {
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  if(tabPanels.length > 0 && e.target.hasAttribute('aria-selected')){
    changeTabs(e);
  }
})

