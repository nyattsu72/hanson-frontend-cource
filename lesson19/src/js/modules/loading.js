import { createAttributedElements } from '../utiles/createAttributeWithEllement'

export function showLoadingImage() {
  const main = document.getElementById("main");
  const renderLoadingBox = createAttributedElements('div',{id:"js-loading",class:"loading",})

  const loadingImage = createAttributedElements("img",{class:"loading__image",width:80,height:80,src:"images/loading.gif"})
  renderLoadingBox.appendChild(loadingImage);
  document.body.insertBefore(renderLoadingBox, main);
}

export function removeLoading() {
  document.getElementById("js-loading").remove();
}
