Data = new Date();
Hour = Data.getHours();
Minutes = Data.getMinutes();
Seconds = Data.getSeconds();
$(document).ready(function () {
    //загружаем джсон масив и выводим список городов
    $.getJSON('current.city.list.json', function (data) {
        $('select').on('change', function () {
            var out = ' ';
            for (var key in data) {
                if (data[key].country == $('select option:selected').val()) {
                    out += '<p value="' + data[key].id + '">' + data[key].name + '</p>';

                }

            }
            $('#city').html(out);
            $('#city p').on('click', function () {
                $.get(
                    //обращаемся к апи и выводим информацию о погоде в данном городе
                    "http://api.openweathermap.org/data/2.5/weather", {
                        "id": $(this).attr('value'),
                        "appid": "d6fadff7b900b59b90336186e3a03a60"
                    },
                    function (data) {

                        let out = '';
                        out += 'Погода: <b>' + data.weather[0].main + '</b>' +
                            '<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png"' +
                            'Температура: <b>' + Math.round(data.main.temp - 273) + '&#176;C</b><br>' +
                            'Влажность: <b>' + data.main.humidity + '%</b><br>' +
                            'Давление: <b>' + Math.round(data.main.pressure * 0.00750063755419211 * 100) + ' мм.рт.ст</b><br>' +
                            'Видимость: <b>' + data.visibility / 1000 + ' км</b><br>' +
                            'Город:<b>' + data.name + '</b></br>' +
                            'Время:<b>' + Hour + ':' + Minutes + ':' + Seconds;
                        console.log(data.main);
                        $('#weather').html(out);
                    }
                );
            });


        });

    });
});
//определяем местоположения пользователя
var x = document.getElementById("geolocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Широта: " + position.coords.latitude +
        "<br>Долгота: " + position.coords.longitude;
    $.get(
        "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" +
        position.coords.longitude, {
            "id": $(this).attr('value'),
            "appid": "d6fadff7b900b59b90336186e3a03a60"
        },
        function (data) {
            let out = '';
            out += 'Погода: <b>' + data.weather[0].main + '</b>' +
                '<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png"' +
                'Температура: <b>' + Math.round(data.main.temp - 273) + '&#176;C</b><br>' +
                'Влажность: <b>' + data.main.humidity + '%</b><br>' +
                'Давление: <b>' + Math.round(data.main.pressure * 0.00750063755419211 * 100) +
                ' мм.рт.ст</b><br>' +
                'Видимость: <b>' + data.visibility / 1000 + ' км</b><br>' +
                'Город:<b>' + data.name + '</b></br>' +
                'Время:<b>' + Hour + ':' + Minutes + ':' + Seconds;

            console.log(data.main);
            $('#weather').html(out);
        }
    );
}
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPositionWeather(position) {
    x.innerHTML = "Широта: " + position.coords.latitude +
        "<br>Долгота: " + position.coords.longitude;
    $.get(
        "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" +
        position.coords.longitude, {
            // "id": $(this).attr('value'),
            "appid": "d6fadff7b900b59b90336186e3a03a60"
        },
        function (data) {
            let out = '';
           let i;
            for(i=0;i<39;i++){
                
            out += 'Погода: <b>' + data.list[i].weather[0].main + '</b>' +
                '<img src="https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png"' +
                'Температура: <b>' + Math.round(data.list[i].main.temp - 273) + '&#176;C</b><br>' +
                'Влажность: <b>' + data.list[i].main.humidity + '%</b><br>' +
                'Давление: <b>' + Math.round(data.list[i].main.pressure * 0.00750063755419211 * 100) +
                ' мм.рт.ст</b><br>' +
                'Видимость: <b>' + data.list[i].visibility / 1000 + ' км</b><br>' +
                'Город:<b>' + data.city.name + '</b></br>' +
                'Дата и время погоды: <b>'+data.list[i].dt_txt+'</b> <br>'+
                'Текущее Время:<b>' + Hour + ':' + Minutes + ':' + Seconds+'</b><br>';
            }
            console.log(data);
            
            $('#weather').html(out);
        }
    );
}