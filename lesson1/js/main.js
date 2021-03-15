"static";

//task01
const task01Id = document.getElementById("task01");

const newLi = document.createElement("li");
newLi.textContent = "Task01:このDOMをhtml内のulの中に差し込んでください";
task01Id.appendChild(newLi);
