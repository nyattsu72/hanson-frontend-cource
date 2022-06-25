import { createAttributedElements } from './utiles/createAttributeWithEllement'

export function addSliderContents(addTargetElement,slideContents){
  renderSlideArea(addTargetElement);
  if(slideContents.length > 0){
    renderSlidContents(slideContents);
    addSlideAction()
  }else{
    addNoImage();
  }
}

function renderSlideArea(addTargetElement) {
  const slideImageArea = createAttributedElements(
    "div",
    {class:"mainvisual-images__inner"}
  );
  slideImageArea.id = "js-mainvisual-images-inner";
  addTargetElement.appendChild(slideImageArea);
}

function renderSlideImage(item) {
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const slider = createAttributedElements("ul", {class:"slider"});
  const fragment = document.createDocumentFragment();
  item.forEach((image, i) => {
    const sliderItem = createAttributedElements("li", {class:"slider__item"});
    sliderItem.dataset.slideIndex = i + 1;

    const sliderImage = createAttributedElements("img", {class:"slider__image"});
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
  const buttonArea = createAttributedElements("div", {class:"slider-button"});

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
  const pagination = createAttributedElements("div", {class:"slider-pagination"});
  const fragment = document.createDocumentFragment();
  const current = document.createElement("span");
  current.id = "js-current";
  current.textContent = 1;
  fragment.appendChild(current);

  const separation = createAttributedElements("span", {class:"separation"});
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
  const paginationArea = createAttributedElements("div",{class:"mainvisual-paginationbullet"});
  paginationArea.id = 'js-pagination';
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < item; i++){
    const paginationBullet = createAttributedElements("span", {class:"paginationbullet__bar"});
    paginationBullet.style.width = "calc(width / item)";
    paginationBullet.setAttribute ("role", "button");
    paginationBullet.dataset.paginationIndex = i + 1;
    fragment.appendChild(paginationBullet);

    i === 0 && paginationBullet.setAttribute("aria-current","true");

  }
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  slideImageArea.appendChild(paginationArea).appendChild(fragment);
}

function addNoImage(){
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const sliderImage = createAttributedElements("img", {class:"slider__image"});
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
  const paginations = document.querySelector(`[data-pagination-index="${target}"]`);
  paginations.setAttribute("aria-current", true);

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
  autoPlaySlide();
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
function autoPlaySlide() {
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
  autoPlaySlide();
}

