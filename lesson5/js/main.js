//Jsonファイル読み込み
const requestURL = "https://designtorch.xsrv.jp/demo/json/listdata.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";

request.onload = () => {
  const pageList = JSON.parse(request.response);
  console.log(pageList.to);
};

request.send();