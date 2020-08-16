const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintName(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}
function paintName(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `환영합니다 ${text} 님`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // currentUser가 없을 때 이름을 묻는다
    askForName();
  } else {
    // currentUser가 존재할 때 로컬 스토리지의 currentUser값을 나타낸다.
    paintName(currentUser);
  }
}
function init() {
  loadName();
}
init();

