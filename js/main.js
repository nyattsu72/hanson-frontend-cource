"static";

//task01
const getTask01Id = document.getElementById("task01");

const createTask01 = document.createElement("li");
createTask01.textContent = "Task01:このDOMをhtml内のulの中に差し込んでください";
getTask01Id.appendChild(createTask01);

//task01 + α
const getUl = document.getElementsByTagName("ul");
let ulLength = getUl.length;
const createLi = document.createElement("li");
createLi.textContent = "Task01+α:このDOMをhtml内のulの中に差し込んでください";
for (let i = 0; i < ulLength; i++) {
  getUl[i].appendChild(createLi);
  console.log(getUl);
}
