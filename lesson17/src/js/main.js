function showLoadingImage() {
  const main = document.getElementById("main");
  const fragment = document.createDocumentFragment();
  const renderLoadingBox = document.createElement("div");
  renderLoadingBox.classList.add("loading");
  renderLoadingBox.id = "js-loading";
  const loadingImage = document.createElement("img");
  loadingImage.src = "images/loading.gif";
  loadingImage.width = 80;
  loadingImage.height = 80;
  loadingImage.classList.add("loading__image");
  fragment.appendChild(renderLoadingBox).appendChild(loadingImage);
  document.body.insertBefore(fragment, main);
}

function removeLoading() {
  document.getElementById("js-loading").remove();
}

function displayErrorMassage(error) {
  const slideImageArea = document.querySelector(".mainvisual__images__inner");
  const textBox = document.createElement("p");
  textBox.classList.add("");
  textBox.textContent = error;
  slideImageArea.appendChild(textBox);
}

function renderSlideArea() {
  const slideImageArea = document.createElement("div");
  slideImageArea.classList.add("mainvisual__images__inner");

  document.querySelector(".mainvisual__images").appendChild(slideImageArea);
}

function renderSlideImage(item) {
  const slideImageArea = document.querySelector(".mainvisual__images__inner");

  const slider = document.createElement("ul");
  slider.classList.add("slider");

  const fragment = document.createDocumentFragment();
  item.forEach((image, i) => {
    const sliderItem = document.createElement("li");
    sliderItem.classList.add("slider__item");
    sliderItem.setAttribute("data-slide-index", i + 1);

    const sliderImage = document.createElement("img");
    sliderImage.classList.add("slider__image");
    sliderImage.src = image.image;
    sliderImage.width = image.width;
    sliderImage.height = image.height;

    if (i === 0) {
      sliderItem.classList.add("is-active");
    }

    fragment.appendChild(sliderItem).appendChild(sliderImage);
  });

  slideImageArea.appendChild(slider).appendChild(fragment);
}

function renderSlideButton() {
  let fragment = document.createDocumentFragment();

  const buttonArea = document.createElement("div");
  buttonArea.classList.add("slider__button");

  const prevButton = document.createElement("button");
  prevButton.classList.add("arrow", "prev");
  prevButton.id = "js-button_prev";
  prevButton.setAttribute("aria-label", "previous");
  prevButton.textContent = "previous";

  fragment.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add("arrow", "next");
  nextButton.id = "js-button_next";
  nextButton.textContent = "next";
  nextButton.setAttribute("aria-label", "next");

  fragment.appendChild(nextButton);

  const slideArea = document.querySelector(".mainvisual__images");
  slideArea.appendChild(buttonArea).appendChild(fragment);
}

function renderPagenation(item) {
  const pagenation = document.createElement("div");
  pagenation.classList.add("slider__pagination");

  let fragment = document.createDocumentFragment();

  const current = document.createElement("span");
  current.classList.add("current");
  current.textContent = 1;
  fragment.appendChild(current);

  const separation = document.createElement("span");
  separation.textContent = "/";
  separation.classList.add("separation");
  fragment.appendChild(separation);

  const total = document.createElement("span");
  total.classList.add("total");
  total.textContent = item.length;
  fragment.appendChild(total);

  const textArea = document.querySelector(".mainvisual__textarea");
  textArea.appendChild(pagenation).appendChild(fragment);
}

function manipulatePagination(target) {
  const pagenationCurrent = document.querySelector(".current");
  const pagenationTotal = Number(document.querySelector(".total").textContent);
  let currentNum = Number(pagenationCurrent.textContent);

  const buttonPrev = target.getAttribute("aria-label") == 'previous';
  const buttonNext = target.getAttribute("aria-label") == 'next';

  if (currentNum < pagenationTotal && buttonNext) {
    pagenationCurrent.textContent = currentNum +=1;
  }else if(currentNum <= pagenationTotal && buttonPrev){
    pagenationCurrent.textContent = currentNum -= 1;
  }
}

function ImageNextSlide(e) {
  const slideImage = document.querySelectorAll(".slider__item");
  const activeSlide = document.querySelector(".is-active");
  const nextSlide = activeSlide.nextElementSibling;
  const nextSlideIndex = Number(nextSlide.getAttribute("data-slide-index"));
  if (nextSlideIndex === slideImage.length) {
    nextSlide.classList.add("is-active");
    activeSlide.classList.remove("is-active");
    e.disabled = true;
  } else {
    e.previousElementSibling.disabled = false;
    nextSlide.classList.add("is-active");
    activeSlide.classList.remove("is-active");
  }
}

function ImagePrevSlide(e) {
  const activeSlide = document.querySelector(".is-active");
  const prevSlide = activeSlide.previousElementSibling;
  const prevSlideIndex = Number(prevSlide.getAttribute("data-slide-index"));

  if (prevSlideIndex === 1) {
    prevSlide.classList.add("is-active");
    activeSlide.classList.remove("is-active");
    e.disabled = true;
  } else {
    e.nextElementSibling.disabled = false;
    prevSlide.classList.add("is-active");
    activeSlide.classList.remove("is-active");
  }
}

function callImageData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchImageData());
    }, 3000);
  });
}

async function fetchImageData() {
  const SLIDE_DATE_URL =
    "https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl&delay=1000";
  const response = await fetch(SLIDE_DATE_URL);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error(`${response.status}:${response.statusText}`);
    displayErrorMassage("サーバの通信に失敗しました");
  }
}

async function callSlideContents() {
  showLoadingImage();
  try {
    const json = await callImageData();
    const slideImageData = json.slide;

    renderSlideImage(slideImageData);
    renderPagenation(slideImageData);
  } finally {
    removeLoading();
  }
}

function init() {
  renderSlideArea();
  renderSlideButton();
  callSlideContents();
  const prevButton = document.querySelector('[aria-label="previous"]');
  prevButton.disabled = true;
}

init();

const prevButton = document.getElementById("js-button_prev");
prevButton.addEventListener("click", (e) => {
  if (!e.currentTarget.hasAttribute("disable")) {
    manipulatePagination(e.currentTarget);
    ImagePrevSlide(e.currentTarget);
  }
});

const nextButton = document.getElementById("js-button_next");
nextButton.addEventListener("click", (e) => {
  manipulatePagination(e.currentTarget);
  ImageNextSlide(e.currentTarget);
});
