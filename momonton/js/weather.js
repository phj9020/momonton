const weather = document.querySelector(".js-weather");
const API_KEY = "3c8d4085289225e6f31bb324d8feb556" // https://openweathermap.org/api
const COORDS_LS = "coordinates"

function getWeather(lat, lon){
    //fetch(안에 가져올 데이터 주입.  backtick 사용 ` ) 
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){ // then()은 기본적으로 함수를 호출하지만 데이터가 완전히 들어온 다음 호출한다. 
        return response.json(); //network response에 대한 json 데이터
    }).then(function(json){   // json데이터가 준비되면 객체를 보여줘라 
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("can't access geo location")
}

function askForCoords(){
   // navigator API
   navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        // cord 값이 null 이면 물어봐라 
        askForCoords();
    } else {
        // 날씨 데이터를 가져와라 
        const parseCoords = JSON.parse(loadedCoords);  // localstorage의 좌표값을 JSON으로부터 가져와서 저장 
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();