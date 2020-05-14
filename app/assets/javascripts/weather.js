$(document).ready(function () {
    // 'use strict'

    const APIKEY = "b32333b9d610935e74af042977238a16";

    //翌日9時のデータの場所を割り出す
    const date = new Date();
    const nowHour = date.getHours();
    const whichTomorrowWeatherData = Math.floor((24 - nowHour + 9) / 3);
    const whichDayAfterTomorrowWeatherData = Math.floor((24 - nowHour + 33) / 3);

    //現在位置の取得ができるかどうか
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);

        // 現在位置の取得に成功した場合
        function success(position) {
            const positionData = position.coords;

            //緯度経度の取得と表示
            const lat = positionData.latitude;
            const lon = positionData.longitude;
            $('.location').text('現在の位置（' + Math.floor(lat * 100) / 100 + ',' + Math.floor(lon * 100) / 100 + ')');


            //現在の天気データを呼び出し
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {                
                    if (data.weather[0].main === "Clear") {
                        $('body').css('background-image', 'url(Sunny.jpg)');
                        $('.dayWeather').text("晴れ");
                    } else if (data.weather[0].main === "Rain") {
                        $('body').css('background-image', 'url(Rain.jpg)');
                        $('.dayWeather').text("雨");
                    } else if (data.weather[0].main === "Clouds") {
                        $('body').css('background-image', 'url(Cloudy.jpg)');
                        $('.dayWeather').text("くもり");
                    } else if (data.weather[0].main === "Snow") {
                        $('body').css('background-image', 'url(Snowy.jpg)');
                        $('.dayWeather').text("雪");
                    }

                    //各データの表示
                    $('.nowTemp').text(Math.floor((data.main.temp - 273.15) * 10) / 10);
                    $('.dayWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png ');
                }
            });

            //明日9時の天気データを呼び出し
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {

                    //翌日9時の天気データ
                    const targetData1 = data.list[whichTomorrowWeatherData];
                    const targetData2 = data.list[whichDayAfterTomorrowWeatherData];

                    if (targetData1.weather[0].main === "Clear") {
                        $('.tomorrowWeather').text("晴れ");
                    } else if (targetData1.weather[0].main === "Rain") {
                        $('.tomorrowWeather').text("雨");
                    } else if (targetData1.weather[0].main === "Clouds") {
                        $('.tomorrowWeather').text("くもり");
                    } else if (targetData1.weather[0].main === "Snow") {
                        $('.tomorrowWeather').text("雪");
                    }

                    if (targetData2.weather[0].main === "Clear") {
                        $('.dayAfterTomorrowWeather').text("晴れ");
                    } else if (targetData2.weather[0].main === "Rain") {
                        $('.dayAfterTomorrowWeather').text("雨");
                    } else if (targetData2.weather[0].main === "Clouds") {
                        $('.dayAfterTomorrowWeather').text("くもり");
                    } else if (targetData2.weather[0].main === "Snow") {
                        $('.dayAfterTomorrowWeather').text("雪");
                    }

                    ///各データの表示
                    $('.tomorrowTemp').text(Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                    $('.tomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData1.weather[0].icon + '.png ');
                    $('.dayAfterTomorrowTemp').text(Math.floor((targetData2.main.temp - 273.15) * 10) / 10);
                    $('.dayAfterTomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData2.weather[0].icon + '.png ');
                }
            });
        }

        //現在位置の取得に失敗した場合
        function error(error) {
            alert("位置情報が取得できなかったため、東京の天気を表示します");
            $('.location').text('東京');

            TokyoWeather();

        }
        //現在位置がそもそも取得できない場合
    } else {
        alert("位置情報が取得できなかったため、東京の天気を表示します");
        $('.location').text('東京');

        TokyoWeather();
    }

    //東京の天気
    function TokyoWeather() {
        

        //現在の天気データ呼び出し
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            dataType: "jsonp",
            data: "q=Tokyo,jp&appid=" + APIKEY,
            //天気データ呼び出し成功時の挙動
            success: function (data) {
                if (data.weather[0].main === "Sunny" || data.weather[0].main === "Clear") {
                    $('body').css('background-image', 'url(Sunny.jpg)');
                    $('.dayWeather').text("晴れ");
                } else if (data.weather[0].main === "Rain") {
                    $('body').css('background-image', 'url(Rain.jpg)');
                    $('.dayWeather').text("雨");
                } else if (data.weather[0].main === "Clouds") {
                    $('body').css('background-image', 'url(Cloudy.jpg)');
                    $('.dayWeather').text("くもり");
                } else if (data.weather[0].main === "Snow") {
                    $('body').css('background-image', 'url(Snowy.jpg)');
                    $('.dayWeather').text("雪");
                }

                //各データの表示
                $('.nowTemp').text(Math.floor((data.main.temp - 273.15) * 10) / 10);
                $('.dayWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png ');
            }
        });

        //翌日9時の天気データを呼び出し
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast",
            dataType: "jsonp",
            data: "q=Tokyo,jp&appid=" + APIKEY,
            //天気データ呼び出し成功時の挙動
            success: function (data) {

                //翌日9時の天気データ
                const targetData1 = data.list[whichTomorrowWeatherData];
                const targetData2 = data.list[whichDayAfterTomorrowWeatherData];

                if (targetData1.weather[0].main === "Clear") {
                    $('.tomorrowWeather').text("晴れ");
                } else if (targetData1.weather[0].main === "Rain") {
                    $('.tomorrowWeather').text("雨");
                } else if (targetData1.weather[0].main === "Clouds") {
                    $('.tomorrowWeather').text("くもり");
                } else if (targetData1.weather[0].main === "Snow") {
                    $('.tomorrowWeather').text("雪");
                }

                if (targetData2.weather[0].main === "Clear") {
                    $('.dayAfterTomorrowWeather').text("晴れ");
                } else if (targetData2.weather[0].main === "Rain") {
                    $('.dayAfterTomorrowWeather').text("雨");
                } else if (targetData2.weather[0].main === "Clouds") {
                    $('.dayAfterTomorrowWeather').text("くもり");
                } else if (targetData2.weather[0].main === "Snow") {
                    $('.dayAfterTomorrowWeather').text("雪");
                }

                ///各データの表示
                $('.tomorrowTemp').text(Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                $('.tomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData1.weather[0].icon + '.png ');
                $('.dayAfterTomorrowTemp').text(Math.floor((targetData2.main.temp - 273.15) * 10) / 10);
                $('.dayAfterTomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData2.weather[0].icon + '.png ');
            }
        });
    }

    $(function (){

      $.ajax({
        type: 'POST',
        // url: '/weather.js',
        data: { 
          cloths :"cloths",
          users : "users"
              }, 
        
        dataType: 'js'
        })
      .done(function(data) {
        
          let temp = 'tomorrowTemp';
          let user = 'current_user'; 
          let purpose = user.purpose
          var array = ['ビジネス(メンズ)', 'ビジネス(レディース)', 'オフィスカジュアル(メンズ)', 'オフィスカジュアル(レディース)', 'プライベート(メンズ)', 'プライベート(レディース)'];
          var newArray = array;
          let weapon = $('#js').val();
          newArray.push(weapon);
         


          if ( purpose == 'ビジネス(メンズ)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[0]['text']);
            
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[1]['text']);
              } else if ( temp >= 21 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[2]['text']);
              } else if ( temp >= 15 && temp <= 20 ) {
                  $(".contents-comment-text-a").text(cloths[3]['text']);
              } else if ( temp <= 15 ) {
                  $(".contents-comment-text-a").text(cloths[4]['text']);
              }
          } else if ( purpose == 'ビジネス(レディース)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[5]['text']);
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[6]['text']);
              } else if ( temp >= 16 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[7]['text']);
              } else if ( temp <= 15 ) {
                  $(".contents-comment-text-a").text(cloths[8]['text']);
              } 
          } else if ( purpose ==  'オフィスカジュアル(メンズ)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[9]['text']);
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[10]['text']);
              } else if ( temp >= 21 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[11]['text']);
              } else if ( temp >= 15 && temp <= 20 ) {
                  $(".contents-comment-text-a").text(cloths[13]['text']);
              } else if(  temp <= 15 ) {
                  $(".contents-comment-text-a").text(cloths[14]['text']);
              }
          } else if ( purpose == 'オフィスカジュアル(レディース)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[15]['text']);
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[16]['text']);
              } else if ( temp >= 16 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[17]['text']);
              } else if ( temp >= 15 ){
                  $(".contents-comment-text-a").text(cloths[18]['text']);
              } 
          } else if ( purpose == 'プライベート(メンズ)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[19]['text']);
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[20]['text']);
              } else if ( temp >= 16 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[21]['text']);
              } else if ( temp <= 15 ) {
                  $(".contents-comment-text-a").text(cloths[22]['text']);
              } 
          } else if ( purpose == 'プライベート(レディース)' ) {
              if ( temp >= 30 ) {
                $(".contents-comment-text-a").text(cloths[23]['text']);
              } else if ( temp >= 26 && temp <= 30 ) {
                  $(".contents-comment-text-a").text(cloths[24]['text']);
              } else if ( temp >= 16 && temp <= 25 ) {
                  $(".contents-comment-text-a").text(cloths[25]['text']);
              } else if ( temp <= 15 ) {
                  $(".contents-comment-text-a").text(cloths[26]['text']);
              } 
          }
        
        })
      .fail(function() {
            alert('error');
          });

    });

});