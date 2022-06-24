import { createAttributedElements } from './utiles/createAttributeWithEllement';
import { showLoadingImage, removeLoading } from './modules/loading';
import { addSliderContents } from './slider';
import { addTabContents, changeTabs} from './news';

function displayErrorMassage(error) {
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const textBox = createAttributedElements("p", "error-message");
  textBox.textContent = error;
  slideImageArea.appendChild(textBox);
}

const SLIDE_CONTENTS_URL = "https://api.json-generator.com/templates/9tm12BO1y5Xx/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl";
const NEWS_CONETNTS_URL = "https://api.json-generator.com/templates/2PqhEvPcqUZW/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl";

async function fetchContents(endpoint){
    const response = await fetch(endpoint);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      console.error(`${response.status}:${response.statusText}`);
      displayErrorMassage("Internet Server Error");
    }
}

const getSliderContents = () => {
  return new Promise((resolve) =>{
    setTimeout(()=>{
      resolve(
          fetchContents(SLIDE_CONTENTS_URL),
      );
    },3000)
  })
}

const getNewsContents = () =>{
  return new Promise((resolve) => {
    resolve(fetchContents(NEWS_CONETNTS_URL))
  })
}


async function init() {
  showLoadingImage();
  let slideImages;
  let newsArticle;
  try{
    await Promise.all([getSliderContents(),getNewsContents()]).then(([slideContents,newsContents]) =>{
      slideImages = slideContents.slide;
      newsArticle = newsContents.data;
    })
  }catch(error){
    console.error(error);
    displayErrorMassage(error)
  }finally{
    removeLoading();
  }
  const sliderArea = document.getElementById('js-mainvisual-images');
  const categoryTab = document.getElementById('js-tab');
  addSliderContents(sliderArea,slideImages);
  addTabContents(categoryTab,newsArticle)
}

const categoryTab = document.getElementById('js-tab');
categoryTab.addEventListener('click', (e) => {
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  if(tabPanels.length > 0 && e.target.hasAttribute('aria-selected')){
    changeTabs(e);
  }
})

init();

