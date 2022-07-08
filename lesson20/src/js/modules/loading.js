import { createAttributedElements } from '../utils/createAttributeWithEllement'

export function showLoadingImage(targetElement) {
  const renderLoadingBox = createAttributedElements('div',{id:"js-loading",class:"loading",})

  const loadingImage = createAttributedElements("img",{class:"loading__image",width:80,height:80,src:"images/loading.gif"})
  renderLoadingBox.appendChild(loadingImage);
  document.body.insertBefore(renderLoadingBox, targetElement);
}

export function removeLoading() {
  document.getElementById("js-loading").remove();
}
