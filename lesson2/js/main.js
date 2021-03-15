"static";

//task01
const task02Id = document.getElementById("task02");

const newLi = document.createElement("li");

const newLink = document.createElement('a');
newLink.href = "1.html";
newLink.textContent = "これです";

const newBookmarkImage = document.createElement('img');
newBookmarkImage.src = "/images/bookmark.png";
newBookmarkImage.alt = "ブックマーク";
newBookmarkImage.width = 20;
newBookmarkImage.height = 20;

newLink.appendChild(newBookmarkImage);


newLi.appendChild(newLink);
task02Id.appendChild(newLi);

