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
                            'Видимость: <b>' + data.visibility / 1000 + ' км</b><br>';
                        console.log(data.main);
                        $('#weather').html(out);
                    }
                );
            });


        });

    });



});