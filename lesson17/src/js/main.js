function createElementWithClassName (element, name) {
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
  const slideImageArea = document.querySelector(".mainvisual__images__inner");
  const textBox = createElementWithClassName("p", "error-message");
  textBox.textContent = error;
  slideImageArea.appendChild(textBox);
}

function renderSlideArea() {
  const slideImageArea = createElementWithClassName("div", "mainvisual__images__inner");
  document.querySelector(".mainvisual__images").appendChild(slideImageArea);
}

function renderSlideImage(item) {
  const slideImageArea = document.querySelector(".mainvisual__images__inner");

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
  let fragment = document.createDocumentFragment();
  const buttonArea = createElementWithClassName("div", "slider__button");

  const direction = ["previous", "next"];
  direction.forEach((element) => {
    const button = document.createElement("button");
    button.classList.add("arrow", `${element}`);
    button.id = `js-button_${element}`;
    button.textContent = `${element}`;
    button.setAttribute("aria-label", `${element}`);
    fragment.appendChild(button);
  })

  const slideArea = document.querySelector(".mainvisual__images");
  slideArea.appendChild(buttonArea).appendChild(fragment);
}

function renderPagenation(item) {
  const pagenation = createElementWithClassName("div", "slider__pagination");

  const fragment = document.createDocumentFragment();

  const current = document.createElement("span");
  current.id = 'js-current';
  current.textContent = 1;
  fragment.appendChild(current);

  const separation = createElementWithClassName("span", "separation");
  separation.textContent = "/";
  fragment.appendChild(separation);

  const total = document.createElement("span");
  total.id = 'js-total';
  total.textContent = item;
  fragment.appendChild(total);

  const textArea = document.querySelector(".mainvisual__textarea");
  textArea.appendChild(pagenation).appendChild(fragment);
}

function switchPagination(target) {
  const pagenationCurrent = document.getElementById("js-current");
  const pagenationTotal = Number(document.getElementById("js-total").textContent);
  let currentNum = Number(pagenationCurrent.textContent);

  const buttonPrev = target.getAttribute("aria-label") === 'previous';
  const buttonNext = target.getAttribute("aria-label") === 'next';

  if (currentNum < pagenationTotal && buttonNext) {
    pagenationCurrent.textContent = currentNum +=1;
  }else if(currentNum <= pagenationTotal && buttonPrev){
    pagenationCurrent.textContent = currentNum -= 1;
  }
}

function switchImg(target) {
  const active = document.querySelector(".is-active");
  active.classList.remove("is-active");
  active[target].classList.add("is-active");
}

function toggleButtonDisabled(){
  const slideImages = [...document.getElementsByClassName("slider__item")];
  const activeImage = document.querySelector(".is-active");
  const currentIndex = Number(activeImage.dataset.slideIndex);
  const firstIndex = 1;
  const lastIndex = slideImages.length;
  prevButton.disabled = currentIndex === firstIndex;
  nextButton.disabled = currentIndex === lastIndex;
}

function callImageData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchImageData("https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl&delay=1000"));
    }, 3000);
  });
}

async function fetchImageData(URL) {
  const response = await fetch(URL);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`${response.status}:${response.statusText}`);
    displayErrorMassage("サーバの通信に失敗しました");
  }
}

async function getSlideImage() {
  showLoadingImage();
  try {
    const json = await callImageData();
    return json.slide;

  } finally {
    removeLoading();
  }
}

async function addSlideImage(){
  const slideImageData = await getSlideImage();
  renderSlideImage(slideImageData);
  renderPagenation(slideImageData.length);
  toggleButtonDisabled()
}

function init() {
  renderSlideArea();
  addSlideImage();
  renderSlideButton();
}

init();

const prevButton = document.getElementById("js-button_previous");
prevButton.addEventListener("click", (e) => {
  switchPagination(e.currentTarget);
  switchImg("previousElementSibling");
  toggleButtonDisabled()
});

const nextButton = document.getElementById("js-button_next");
nextButton.addEventListener("click", (e) => {
  switchPagination(e.currentTarget);
  switchImg("nextElementSibling");
  toggleButtonDisabled()
});
