import { createAttributedElements } from './utiles/createAttributeWithEllement';
import { showLoadingImage, removeLoading } from './modules/loading';

const userItemName = {
  userID : "ID",
  userName : "名前",
  userGender : "性別",
  userAge : "年齢"
}

console.log(Object.keys(userItemName).length);

function renderTable() {
  const userTable = createAttributedElements("table",{id:"js-user-table",class:"user-table"});
  const tbody = document.createElement("tbody")
  userTable.appendChild(tbody);
}

renderTable()

function createTableItem (){
  const tableRow = document.createElement("tr");
  Object.keys(userItemName).forEach((key)=>{
    const createItem = createAttributedElements("th",{class:"user-table__header"},userItemName[key]);
    tableRow.appendChild(createItem);
  });
}

 createTableItem ()
