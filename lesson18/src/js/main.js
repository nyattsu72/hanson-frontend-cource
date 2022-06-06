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
    "mainvisual__images__inner"
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
  const buttonArea = createElementWithClassName("div", "slider__button");

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
  const pagination = createElementWithClassName("div", "slider__pagination");
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
  const paginationArea = createElementWithClassName("div","mainvisual__pagination__bullet");
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < item; i++){
    const paginationBullet = createElementWithClassName("span", "bar");
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
  const paginationBullets = [...document.getElementsByClassName("bar")];
  paginationBullets.forEach((targetButton) => {
    targetButton.addEventListener('click',(e) => {
      const activePaginationBullet = document.querySelector('[aria-current="true"]');
      const clickedPaginationBulletIndex = e.currentTarget.getAttribute('data-pagination-index');
      activePaginationBullet.setAttribute('aria-current','false');
      e.currentTarget.setAttribute('aria-current','true');
      changeActiveSlider(clickedPaginationBulletIndex);
      changeActivePagination(clickedPaginationBulletIndex);
      resetAutoPlaySlide();
    })
  })

}

function toggleButtonDisabled(index) {
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
  const arrowButtons = document.querySelector(".slider__button");

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
  toggleButtonDisabled(slideTarget);
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
