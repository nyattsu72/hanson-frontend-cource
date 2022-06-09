const createAttributedElements = (tag, attrObj, str) => {
  const element = document.createElement(tag);
  Object.keys(attrObj).forEach((attribute) => {
    element.setAttribute(attribute, attrObj[attribute]);
  });
  if (str !== undefined) element.textContent = str;
  return element;
};
