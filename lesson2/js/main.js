"static";

//task02
const task02Id = document.getElementById("task02");

const list = document.createElement("li");

const link = document.createElement('a');
link.href = "1.html";
link.textContent = "これです";

const image = document.createElement('img');
image.src = "/images/bookmark.png";
image.alt = "ブックマーク";
image.width = 20;
image.height = 20;

link.appendChild(image);
list.appendChild(link);
task02Id.appendChild(list);

