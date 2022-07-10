import { createAttributedElements } from './utils/createAttributeWithEllement.js';
import { showLoadingImage, removeLoading } from './modules/loading.js';

function displayErrorMassage(error) {
  const displayArea = document.getElementById("js-table-contents");
  const errorMassage = createAttributedElements("p", {class:"error-message"},error);
  displayArea.appendChild(errorMassage);
}

const userColumnName = {
  userID : "ID",
  userGender : "性別",
  userName : "名前",
  userAge : "年齢"
}

function renderTable(tableValue) {
  const tableArea = document.getElementById('js-table-contents');
  const userTable = createAttributedElements("table",{id:"js-user-table",class:"user-table"});
  const frag = document.createDocumentFragment();
  frag.appendChild(createTableItem());
  frag.appendChild(createTableValue(tableValue));
  tableArea.appendChild(userTable).appendChild(frag);
}

function createTableItem (){
  const thead = document.createElement('thead');
  const frag = document.createDocumentFragment();
  const tableRow = document.createElement("tr");
  Object.keys(userColumnName).forEach((key)=>{
    const createItem = createAttributedElements("th",{class:"user-table__header"},userColumnName[key]);
    tableRow.appendChild(createItem);
  });
  frag.appendChild(thead).appendChild(tableRow);
  return frag;
}

function createTableValue(userLists){
  const tbody = document.createElement("tbody");
  tbody.appendChild(addTableValue(userLists));
  return tbody;
}

const addTableValue = (userLists) => {
  const userColumnNameKey = Object.keys(userColumnName);
  const frag = document.createDocumentFragment();
  userLists.forEach((user)=>{
    const tableRow = document.createElement("tr");
    userColumnNameKey.forEach((key)=>{
          const tableValue = createAttributedElements("td",{class:"user-table__value"},user[key]);
          frag.appendChild(tableRow).appendChild(tableValue);
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
  }
  console.error(`${response.status}:${response.statusText}`);
  displayErrorMassage("Internet Server Error");

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
  if(userLists.length > 0){
    renderTable(userLists);
  }

}

init();
