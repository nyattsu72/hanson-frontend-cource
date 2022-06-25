import { parseISO, differenceInDays } from 'date-fns';
import { createAttributedElements } from './utiles/createAttributeWithEllement'

export function addTabContents(addTargetElement,tabContents){
  renderTabContentsArea(addTargetElement);
  renderTabContent(tabContents);
  renderCategoryTab(tabContents);
  addNewsImage(tabContents);
}

function renderTabContentsArea(addTargetElement){
  const tabContentsArea = document.createElement('div');
  tabContentsArea.id = 'js-newsContents';
  addTargetElement.parentNode.insertBefore(tabContentsArea,addTargetElement.nextSibling);
}

function renderTabContent(categoryNews){
  const tabContentsArea = document.getElementById('js-newsContents');
  categoryNews.forEach((category,i) => {
    const newsContentAreaAttributes = {
      id:"panel-" + (i+1),
      class:"news-area",
      role:"tabpanel",
      "aria-labelledby":"tab-"+ (i+1),
      "aria-hidden":"true",
    }
    const newsContentArea = createAttributedElements('div',newsContentAreaAttributes);
    const newsArticles = category.article;
    tabContentsArea.appendChild(newsContentArea).appendChild(getNewsArticle(newsArticles));
  })
}

function renderCategoryTab(tabCategories){
  const fragment = document.createDocumentFragment();

  tabCategories.forEach((category,i) => {
    const categoryTabAttributes = {
      class:"tab_list_item",
      role:"presentation"
    };
    const categoryTab = createAttributedElements('li',categoryTabAttributes);

    const categoryButtonAttributes = {
      id:"tab-" + (i+1),
      class:"tab-button js-tabButton",
      "aria-controls":"panel-" + (i+1),
      role:"tab",
      "aria-selected":"false",
      "tabindex":"-1",
    }
    const categoryButton = createAttributedElements('button',categoryButtonAttributes,category.category);

    fragment.appendChild(categoryTab).appendChild(categoryButton);

    const activeCategory = category.isActive;
    activeCategory && tabContentsInitialDisplay(categoryButton);
  });
  const categoryTabLists = document.querySelector('.tab-list');
  categoryTabLists.appendChild(fragment);
}

const getNewsArticle = (articleValue) => {
  const newsLists = document.createElement('ul');
  newsLists.classList.add('news-list');
  const fragment = document.createDocumentFragment();
  const displayedResults = 5;
  for (let i = 0; i < displayedResults; ++i){
    const li = document.createElement('li');
    li.classList.add('news-item');

    const anchor = document.createElement('a');
    anchor.classList.add('news-link');
    anchor.href = articleValue[i].link;
    anchor.textContent = articleValue[i].title;
    fragment.appendChild(li).appendChild(anchor);
    addComment(articleValue[i], li);
    addNewIcon(articleValue[i],li);
  }
  newsLists.appendChild(fragment);
  return newsLists;
};

function tabContentsInitialDisplay(target){
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-selected','true');

  const getSelectedTabID = target.getAttribute('aria-controls');
  const selectedPanel = document.getElementById(getSelectedTabID);
  selectedPanel.setAttribute('aria-hidden', false);
}

function addNewsImage(articles){
  const getNewsArea = document.querySelectorAll('.news-area');

  articles.forEach((category,i) => {
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
  articleDateToToday <= judgmenDays && renderNewIcon(item);
}

function renderNewIcon(item){
  const newIcon = createAttributedElements('span',{class:"icon-new"},"new");
  const newsArticleLink = item.querySelector('.news-link');
  newsArticleLink.insertAdjacentElement('afterend',newIcon);
}

export function changeTabs(e) {
  const tabs = document.querySelectorAll('[role="tab"]');
  const selectedTab = e.target;
  tabs.forEach((target) => target.setAttribute('aria-selected', false));
  selectedTab.setAttribute('aria-selected', true);

  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  tabPanels.forEach((tabpanel) => tabpanel.setAttribute('aria-hidden', true));
  const getSelectedTabID = selectedTab.getAttribute('aria-controls');
  const selectedPanel = document.getElementById(getSelectedTabID);
  selectedPanel.setAttribute('aria-hidden', false);
};



