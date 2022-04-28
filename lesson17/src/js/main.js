function showLoadingImage(){
  const main = document.getElementById('main');
  const fragment = document.createDocumentFragment();
  const renderLoadingBox = document.createElement('div');
  renderLoadingBox.classList.add('loading');
  renderLoadingBox.id = 'js-loading';
  const loadingImage = document.createElement('img');
  loadingImage.src = 'images/loading.gif';
  loadingImage.width = 80;
  loadingImage.height = 80;
  loadingImage.classList.add('loading__image');
  fragment.appendChild(renderLoadingBox).appendChild(loadingImage);
  document.body.insertBefore(fragment, main);
}

function removeLoading(){
  document.getElementById('js-loading').remove();
}

function displayErrorMassage(error){
  const slideImageArea = document.querySelector('.mainvisual__images__inner');
  const createTextBox = document.createElement('p');
  createTextBox.classList.add('');
  createTextBox.textContent = error;
  slideImageArea.appendChild(createTextBox);
}

function renderSlideArea() {
  const slideImageArea = document.createElement('div');
  slideImageArea.classList.add('mainvisual__images__inner');

  const sliderArea = document.querySelector('.mainvisual__images');

  sliderArea.appendChild(slideImageArea);
}

function renderSlideImage(item){
  const slideImageArea = document.querySelector('.mainvisual__images__inner');

  const slider = document.createElement('ul');
  slider.classList.add('slider');

  const fragment = document.createDocumentFragment();
  item.forEach((image,i) => {
    const sliderItem = document.createElement('li');
    sliderItem.classList.add('slider__item');
    sliderItem.setAttribute('data-slide-index', i+1);

    const sliderImage = document.createElement('img');
    sliderImage.classList.add('slider__image');
    sliderImage.src = image.image;
    sliderImage.width = image.width;
    sliderImage.height = image.height;

    if(i == 0 ) {
      sliderItem.classList.add('is-active')
    }

    fragment.appendChild(sliderItem).appendChild(sliderImage);
  });

  slideImageArea.appendChild(slider).appendChild(fragment);
}

function renderSlideButton(){
  let fragment = document.createDocumentFragment();

  const buttonArea = document.createElement('div');
  buttonArea.classList.add('slider__button');

  const prevButton = document.createElement('button');
  prevButton.setAttribute('class', 'arrow prev');
  prevButton.id = 'js-button_prev';
  prevButton.setAttribute('aria-label','previous');
  prevButton.textContent = 'previous';

  fragment.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.setAttribute('class','arrow next');
  nextButton.id = 'js-button_next';
  nextButton.textContent = 'next';
  nextButton.setAttribute('aria-label','next');


  fragment.appendChild(nextButton);

  const getSlideArea = document.querySelector('.mainvisual__images');

  getSlideArea.appendChild(buttonArea).appendChild(fragment);

}

function renderPagenation(item){
  const pagenation = document.createElement('div');
  pagenation.classList.add('slider__pagination');

  let fragment = document.createDocumentFragment();

  const current = document.createElement('span');
  current.classList.add('current');
  current.textContent = 1;
  fragment.appendChild(current);

  const separation = document.createElement('span');
  separation.textContent = '/';
  separation.classList.add('separation');
  fragment.appendChild(separation);

  const total = document.createElement('span');
  total.classList.add('total');
  total.textContent =item.length;
  fragment.appendChild(total);

  const getTextArea = document.querySelector('.mainvisual__textarea');
  getTextArea.appendChild(pagenation).appendChild(fragment);
}

function pagenationCountDown() {
  const pagenationCurrent = document.querySelector('.current');
  const pagenationTotal = Number(document.querySelector('.total').textContent);
  let currentNum = Number(pagenationCurrent.textContent);

  if(currentNum <= pagenationTotal && currentNum !== 1){
    pagenationCurrent.textContent = currentNum -= 1;
  }
}

function pagenationCountUp(){
  const pagenationCurrent = document.querySelector('.current');
  const pagenationTotal = Number(document.querySelector('.total').textContent);
  let currentNum = Number(pagenationCurrent.textContent);

  if(currentNum <= pagenationTotal && currentNum !== 5){
    pagenationCurrent.textContent = currentNum += 1;
  }
}

function ImageNextSlide(e){
  const slideImage = document.querySelectorAll('.slider__item');

  const activeSlide = document.querySelector('.is-active');
  const activeSlideIndex = activeSlide. getAttribute('data-slide-index');
  const nextSlide = activeSlide.nextElementSibling;

  if(activeSlideIndex == slideImage.length){
    e.disabled = true;
    console.log(e);
  }else{
    console.log(e.previousElementSibling);
    e.previousElementSibling.disabled = false;
    nextSlide.classList.add('is-active');
    activeSlide.classList.remove('is-active');
    console.log(activeSlideIndex);
  }
}

function ImagePrevSlide(e) {
  const activeSlide = document.querySelector('.is-active');
  const activeSlideIndex = activeSlide. getAttribute('data-slide-index');

  const prevSlide = activeSlide.previousElementSibling;

  if(activeSlideIndex == 1){
    e.disabled = true;
  }else{
    e.nextElementSibling.disabled = false;
    prevSlide.classList.add('is-active');
    activeSlide.classList.remove('is-active');
    console.log(activeSlideIndex);
  }
}

function callImageData(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fetchImageData())
    },3000);
  })
}

async function fetchImageData() {
  const SLIDE_DATE_URL = 'https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl&delay=1000';
  const response = await fetch(SLIDE_DATE_URL);
  if(response.ok){
    const json = await response.json();
    return json;
  }else{
    console.error(`${response.status}:${response.statusText}`);
    createErrorMessage('サーバの通信に失敗しました')
  }
}

async function callSlideContents() {
  showLoadingImage();
  try{
    const json = await callImageData();
    const slideImageData = json.slide;

    renderSlideImage(slideImageData);
    renderPagenation(slideImageData);

  }finally{
    removeLoading();
  }
}

function init(){
  renderSlideArea();
  renderSlideButton()
  callSlideContents();
}

init();


const prevButton = document.getElementById('js-button_prev');
prevButton.addEventListener('click', (e) => {
  if(!e.currentTarget.hasAttribute('disable')){
    pagenationCountDown();
    ImagePrevSlide(e.currentTarget);

  }
})

const nextButton = document.getElementById('js-button_next');
nextButton.addEventListener('click', (e) => {
  pagenationCountUp();
  ImageNextSlide(e.currentTarget);
})


