const body = document.querySelector("body");
const IMG_NUMBER = 4;

function paintImage(imageNumber) {
  const image = new Image();
  image.src = `./image/${imageNumber + 1}.jpg`; // +1을 하는 이유 : math.random 함수가 0을 줄 수 있기 때문이다
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  // 0부터 2까지 랜덩 샌성
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  // Generate number
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
