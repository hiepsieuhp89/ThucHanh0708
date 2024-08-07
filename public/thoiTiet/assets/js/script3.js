const imgs = {
    Sunset: "https://gcdnb.pbrd.co/images/ZW45IYZWZy6n.png",
    Rain: "https://gcdnb.pbrd.co/images/nZ26RX7qMh1q.png?o=1",
    Windy: "https://gcdnb.pbrd.co/images/zX3rfGlL5XSi.png?o=1",
    Sun: "https://gcdnb.pbrd.co/images/9PieLGcqwYSA.png?o=1",
};

var temperature = document.getElementById("temperature");
var uv = document.getElementById("uv");
var humi = document.getElementById("humi");
var wind = document.getElementById("wind");

var hourPrediction = document.getElementById('hourPrediction')
var duBaoNgay = document.getElementById('duBaoNgay')


function getImageByCloudStatus(cloud_status) {
    let result = "";

    ///
    switch (cloud_status) {
        case "Cloudy":
        case "Mostly Cloudy":
            result = imgs.Sunset;
            break;
        case "Rain":
        case "Scattered Showers":
        case "Thunderstorm":
        case "Scattered Thunderstorms":
        case "Scattered Thunderstorms Night":
            result = imgs.Rain;
            break;

        default:
            result = imgs.Sun;
            break;
    }
    ///

    return result;
}
function renderNexthour(thoiTietJson){
    console.log("next_24h: ", thoiTietJson.data.next_24h);
    //   <div class="holder">
    //                   <p>Now</p>
    //                   <img style="width: 40px; height: auto" src="https://gcdnb.pbrd.co/images/ZW45IYZWZy6n.png">
    //                   <p>30°</p>
    //                 </div>

    let nexthours = ''
    thoiTietJson.data.next_24h.forEach(element => {
        let html = `  
                <div class="holder">
                    <p>${element.time}</p>
                    <img style="width: 40px; height: auto" src="${getImageByCloudStatus(element.cloud_status)}">
                    <p>${element.temperature}</p>
                </div>`

        nexthours = nexthours + html
    });

    console.log("htmt dự báo thời tiết các giờ tiếp theo: ", nexthours)

    hourPrediction.innerHTML = nexthours
}
function renderNextDay(thoiTietJson) {
    console.log("next_days: ", thoiTietJson.data.next_10days);
    // <div class="col d-inline-flex flex-column justify-content-center align-items-center">
    //       <p>Monday</p>
    //       <img style="width: 60px; height: auto" src="https://gcdnb.pbrd.co/images/ZW45IYZWZy6n.png">
    //       <div class="d-flex gap-2" style="font-size: 14px;">
    //         <p>H: 35</p>
    //         <p>L: 28</p>
    //       </div>
    //     </div>

    let nextdays = ''
    thoiTietJson.data.next_10days.forEach(element => {
        let html = `  
                <div class="col d-inline-flex flex-column justify-content-center align-items-center" style="min-width: 120px;">
                    <p>${element.date}</p>
                    <img style="width: 60px; height: auto" src="${getImageByCloudStatus(element.day.cloud_status)}">
                    <div class="d-flex gap-2" style="font-size: 14px;">
                        <p>H: ${element.day.temperature}</p>
                        <p>L: ${element.night.temperature}</p>
                    </div>
                </div>
                `

        nextdays = nextdays + html
    });

    console.log("htmt dự báo thời tiết các ngày tiếp theo: ", nextdays)

    duBaoNgay.innerHTML = nextdays
}
async function goiApi() {
    //lấy ra hành động gọi api và đợi nó chạy bằng cách dùng await
    const thoiTietResponse = await fetch(
        "https://api3.vnexpress.net/api/crawler?type=get_data&key=weather_dot_com&province=H%C3%A0%20N%E1%BB%99i&app_id=d9b81e&date=2024-07-24",
    );
    //thực thi gọi api đến khi lấy được kết quả và đợi nó chạy xong bằng cách dùng await
    const thoiTietJson = await thoiTietResponse.json();
    const statusCode = thoiTietResponse.status;

    console.log("statusCode gọi api: ", statusCode);
    console.log("gọi api có ok không: ", thoiTietResponse.ok);
    console.log("kết quả gọi api: ", thoiTietJson.data);

    //render dữ liệu lên html
    temperature.innerHTML = thoiTietJson.data.temperature;
    uv.innerHTML = thoiTietJson.data.uv;
    humi.innerHTML = thoiTietJson.data.humidity;
    wind.innerHTML = thoiTietJson.data.wind;

    //render dự báo thời tiết của các giờ tiếp theo và các ngày tiếp theo
    renderNexthour(thoiTietJson)
    renderNextDay(thoiTietJson)
}
goiApi();


setInterval(goiApi, 1000)