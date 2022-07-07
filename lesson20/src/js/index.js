import { createAttributedElements } from './utiles/createAttributeWithEllement';
import { showLoadingImage, removeLoading } from './modules/loading';

function displayErrorMassage(error) {
  const displayArea = document.getElementById("js-table-contents");
  const errorMassage = createAttributedElements("p", {class:"error-message"},error);
  displayArea.appendChild(errorMassage);
}

const userItemName = {
  userID : "ID",
  userName : "名前",
  userGender : "性別",
  userAge : "年齢"
}

function renderTable(tableValue) {
  const tableArea = document.getElementById('js-table-contents');
  const userTable = createAttributedElements("table",{id:"js-user-table",class:"user-table"});
  const tbody = document.createElement("tbody");
  tbody.appendChild(createTableItem());
  tbody.appendChild(createTableValue(tableValue));
  tableArea.appendChild(userTable).appendChild(tbody);
}

function createTableItem (){
  const frag = document.createDocumentFragment();
  const tableRow = document.createElement("tr");
  Object.keys(userItemName).forEach((key)=>{
    const createItem = createAttributedElements("th",{class:"user-table__header"},userItemName[key]);
    tableRow.appendChild(createItem);
  });
  frag.appendChild(tableRow);
  return frag;
}

function createTableValue(userLists){
  const userItemNameKey = Object.keys(userItemName);
  const frag = document.createDocumentFragment();
  userLists.forEach((user)=>{
    const tableRow = document.createElement("tr");
    userItemNameKey.forEach((key)=>{
      for(let userKey in user){
        if(userKey === key){
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
    console.error(`${response.status}:${response.statusText}`);
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
  if(userLists.length > 0){
    renderTable(userLists);
  }

}

init();
