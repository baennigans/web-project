function textPrompt() {
  let text = prompt("텍스트를 입력하세요.");
  if (text === null || text === "") {
    alert("텍스트값을 입력해 주세요!!");
  } else {
    textShow(text);
    buttonShow("빨강", "#FF0000");
    buttonShow("파랑", "#0054FF");
    buttonShow("초록", "#1DDB16");
  }
}

function textShow(text) {
  let div1 = document.createElement("div");
  div1.innerText = text;
  div1.style.fontSize = "100px";
  div1.style.marginLeft = "200px";
  div1.style.marginTop = "200px";
  document.body.appendChild(div1);
}

function buttonShow(color, rgb) {
  let button1 = document.createElement('button');
  button1.innerText = color;
  button1.style.position = "relative";
  button1.style.fontSize = "30px";
  button1.style.left = "170px";
  button1.style.marginLeft = "30px";
  button1.addEventListener("click", () => {
    div1.style.color = rgb;
  });
  document.body.appendChild(button1);
}

function colorAlert(rgb) {
  let changeCol = document.getElementsByTagNameNS('button');
  changeCol.style.color = rgb;
}
