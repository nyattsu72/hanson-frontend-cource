import { parseISO, differenceInDays } from 'date-fns';

function createElementWithClassName(element, name) {
  const createElement = document.createElement(element);
  createElement.classList.add(name);
  return createElement;
}

function showLoadingImage() {
  const main = document.getElementById("main");
  const renderLoadingBox = createElementWithClassName("div", "loading");
  renderLoadingBox.id = "js-loading";
  const loadingImage = createElementWithClassName("img", "loading__image");
  loadingImage.src = "images/loading.gif";
  loadingImage.width = 80;
  loadingImage.height = 80;
  renderLoadingBox.appendChild(loadingImage);
  document.body.insertBefore(renderLoadingBox, main);
}

function removeLoading() {
  document.getElementById("js-loading").remove();
}

function displayErrorMassage(error) {
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const textBox = createElementWithClassName("p", "error-message");
  textBox.textContent = error;
  slideImageArea.appendChild(textBox);
}

function renderSlideArea() {
  const slideImageArea = createElementWithClassName(
    "div",
    "mainvisual-images__inner"
  );
  slideImageArea.id = "js-mainvisual-images-inner";
  document.getElementById('js-mainvisual-images').appendChild(slideImageArea);
}

function renderSlideImage(item) {
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const slider = createElementWithClassName("ul", "slider");
  const fragment = document.createDocumentFragment();
  item.forEach((image, i) => {
    const sliderItem = createElementWithClassName("li", "slider__item");
    sliderItem.dataset.slideIndex = i + 1;

    const sliderImage = createElementWithClassName("img", "slider__image");
    sliderImage.src = image.image;
    sliderImage.width = image.width;
    sliderImage.height = image.height;

    i === 0 && sliderItem.classList.add("is-active");

    fragment.appendChild(sliderItem).appendChild(sliderImage);
  });

  slideImageArea.appendChild(slider).appendChild(fragment);
}

function renderSlideButton() {
  const fragment = document.createDocumentFragment();
  const buttonArea = createElementWithClassName("div", "slider-button");

  const direction = ["previous", "next"];
  direction.forEach((element) => {
    const button = document.createElement("button");
    button.classList.add("arrow", `${element}`);
    button.id = `js-button_${element}`;
    button.textContent = `${element}`;
    button.setAttribute("aria-label", `${element}`);
    element === 'previous' && (button.disabled = 'true');
    fragment.appendChild(button);
  });

  const slideArea = document.getElementById('js-mainvisual-images');
  slideArea.appendChild(buttonArea).appendChild(fragment);
}

function renderPagination(item) {
  const pagination = createElementWithClassName("div", "slider-pagination");
  const fragment = document.createDocumentFragment();
  const current = document.createElement("span");
  current.id = "js-current";
  current.textContent = 1;
  fragment.appendChild(current);

  const separation = createElementWithClassName("span", "separation");
  separation.textContent = "/";
  fragment.appendChild(separation);

  const total = document.createElement("span");
  total.id = "js-total";
  total.textContent = item;
  fragment.appendChild(total);

  const textArea = document.getElementById("js-mainvisual-textarea");
  textArea.appendChild(pagination).appendChild(fragment);
}

function renderPaginationBullet(item){
  const paginationArea = createElementWithClassName("div","mainvisual-paginationbullet");
  paginationArea.id = 'js-pagination';
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < item; i++){
    const paginationBullet = createElementWithClassName("span", "paginationbullet__bar");
    paginationBullet.style.width = "calc(width / item)";
    paginationBullet.setAttribute ("role", "button");
    paginationBullet.dataset.paginationIndex = i + 1;
    fragment.appendChild(paginationBullet);

    i === 0 && paginationBullet.setAttribute("aria-current","true");

  }
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  slideImageArea.appendChild(paginationArea).appendChild(fragment);
}

function addNoimage(){
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const sliderImage = createElementWithClassName("img", "slider__image");
  sliderImage.src = './images/slide-image01.png'
  sliderImage.width = 800;
  sliderImage.height = 800;
  sliderImage.style.opacity = 1;
  slideImageArea.appendChild(sliderImage);
}

function changeActivePagination(currentIndex) {
  const paginationCurrent = document.getElementById("js-current");
  paginationCurrent.textContent = currentIndex;

}

function changeActiveImage(target) {
  const active = document.querySelector(".is-active");
  active.classList.remove("is-active");
  const changeSlide = document.querySelector(`[data-slide-index="${target}"]`);
  changeSlide.classList.add("is-active");
}

function changeActivePaginationBullet(target){
  const paginationBullet = document.querySelector('[aria-current="true"');
  paginationBullet.setAttribute('aria-current', false);
  const pagiNations = document.querySelector(`[data-pagination-index="${target}"]`);
  pagiNations.setAttribute("aria-current", true);

}

function clickPaginationBullet(){
  const paginationBullets = document.getElementById('js-pagination');

  paginationBullets.addEventListener('click', (e) => {
    const targetElement = e.target.classList.contains('paginationbullet__bar');

    if(targetElement){
      const activePaginationBullet = document.querySelector('[aria-current="true"]');
      const clickedPaginationBulletIndex = e.target.getAttribute('data-pagination-index');
      activePaginationBullet.setAttribute('aria-current','false');
      e.target.setAttribute('aria-current','true');
      changeActiveSlider(clickedPaginationBulletIndex);
      changeActivePagination(clickedPaginationBulletIndex);
      resetAutoPlaySlide();
    }
  },true);
};

function arrowButtonIsDisabled(index) {
  const slideImages = [...document.getElementsByClassName("slider__item")];
  const firstIndex = 1;
  const lastIndex = slideImages.length;
  const prevButton = document.getElementById("js-button_previous");
  const nextButton = document.getElementById("js-button_next");

  prevButton.disabled = Number(index) === firstIndex;
  nextButton.disabled = Number(index) === lastIndex;
}

function renderSlidContents(slideImage){
  renderSlideImage(slideImage);
  renderPagination(slideImage.length);
  renderPaginationBullet(slideImage.length);
  renderSlideButton();
}

function addSlideAction(){
  addChangeButtonEvent();
  clickPaginationBullet();
  autoPlayslide();
}

function accessSlideImage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fetchSlideImages(
          // Comment out and leave the API URL of 503 and 0 images as the URL for checking error handling.
          //image = 0
          //"https://api.json-generator.com/templates/IZjWl012CAMD/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl"
          //503 error
          //"https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl&status=503"
          "https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl"
        )
      );
    }, 3000);
  });
}

async function fetchSlideImages(URL) {
  const response = await fetch(URL);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`${response.status}:${response.statusText}`);
    displayErrorMassage("Internet Server Error");
  }
}

function addChangeButtonEvent() {
  const arrowButtons = document.querySelector(".slider-button");

  arrowButtons.addEventListener("click", (event) => {
    const activeImage = document.querySelector(".is-active");
    let currentIndex = Number(activeImage.dataset.slideIndex);
    currentIndex =
      event.target.id === "js-button_next" ? ++currentIndex : --currentIndex;
    changeActivePagination(currentIndex);
    changeActiveSlider(currentIndex);
    resetAutoPlaySlide()
  });
}

function changeActiveSlider(slideTarget) {
  arrowButtonIsDisabled(slideTarget);
  changeActiveImage(slideTarget);
  changeActivePaginationBullet(slideTarget);
}

let autoPlayID;
function autoPlayslide() {
  autoPlayID = setInterval(() => {
    const slideImages = document.querySelectorAll('.slider__item').length;
    const activeImage = document.querySelector('.is-active');
    let currentIndex = Number(activeImage.dataset.slideIndex);
    currentIndex = currentIndex === slideImages ? 1 : currentIndex + 1;
    changeActiveSlider(currentIndex);
    changeActivePagination(currentIndex);
  },3000)
}

function resetAutoPlaySlide(){
  clearInterval(autoPlayID);
  autoPlayslide();
}

async function init() {
  showLoadingImage();
  renderSlideArea();
  let slideImages;
  try{
    const json = await accessSlideImage();
    slideImages = json.slide;
  }catch(error){
    console.error(error);
  }finally{
    removeLoading();
  }
  if(slideImages.length > 0){
      renderSlidContents(slideImages);
      addSlideAction()
  }else{
    addNoimage();
  }
}

init();

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

    const activeCategory = target.isActive;
    if(activeCategory){
      tabContentsInitialDisplay(categoryButton);
    }
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

function tabContentsInitialDisplay(target){
  target.setAttribute('tabindex', '0');
  target.setAttribute('aria-selected','true');

  const getSelectedTadID = target.getAttribute('aria-controls');
  const selectedPanel = document.getElementById(getSelectedTadID);
  selectedPanel.setAttribute('aria-hidden', false);
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
      renderTabContent(newsArticleData);
      renderCategoryTab(newsArticleData);
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
