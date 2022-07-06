import { createAttributedElements } from './utiles/createAttributeWithEllement';
import { showLoadingImage, removeLoading } from './modules/loading';

function displayErrorMassage(error) {
  const slideImageArea = document.getElementById("js-mainvisual-images-inner");
  const textBox = createAttributedElements("p", "error-message");
  textBox.textContent = error;
  slideImageArea.appendChild(textBox);
}

const userItemName = {
  userID : "ID",
  userName : "名前",
  userGender : "性別",
  userAge : "年齢"
}

const userItemNameKey = Object.keys(userItemName);
console.log(userItemNameKey);

console.log(Object.keys(userItemName).length);

function renderTable() {
  const userTable = createAttributedElements("table",{id:"js-user-table",class:"user-table"});
  const tbody = document.createElement("tbody")
  userTable.appendChild(tbody);
}

renderTable()

function createTableItem (){
  const frag = createDocumentFragment();
  const tableRow = document.createElement("tr");
  Object.keys(userItemName).forEach((key)=>{
    const createItem = createAttributedElements("th",{class:"user-table__header"},userItemName[key]);
    tableRow.appendChild(createItem);
  });
  frag.appendChild(tableRow);
  return frag;
}

function createTableValue(userLists){
  console.log(userLists);
  const frag = document.createDocumentFragment();
  userLists.find((user)=>{
    const tableRow = document.createElement("tr");
    userItemNameKey.find((key)=>{
      for(let userKey in user){
        if(userKey == key){
          const tableValue = createAttributedElements("td",{class:"user-table__value"},user[userKey]);
          frag.appendChild(tableRow).appendChild(tableValue);
        }
      }
    })
  })
  return frag;
}

const USER_LISTS_URL = "https://api.json-generator.com/templates/2n667LPMsECB/data?access_token=b0154huvd1stffra1six9olbgg34r4zofcqgwzfl";

async function fetchContents(endpoint){
  const response = await fetch(endpoint);
  if(response.ok){
    const json = await response.json();
    return json;
  } else{
    console.error(`${response.status}:${response.statusText}`)
    displayErrorMassage("Internet Server Error");
  }
}

const getUserLists = (sec) =>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(fetchContents(USER_LISTS_URL));
    },1000*sec);
  })
}

async function init(){
  showLoadingImage();
  let userLists;
  try{
    const json = await getUserLists(3);
    userLists = json.users;
  }catch (error){
    console.error(error);
    displayErrorMassage(error);
  }finally{
    removeLoading();
  }
  console.log(userLists);
  createTableValue(userLists);
}

init();
