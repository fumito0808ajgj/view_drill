$(document).ready(function () {
    // 'use strict'

    const APIKEY = "b32333b9d610935e74af042977238a16";

    //翌日9時のデータの場所を割り出す
    const date = new Date();
    const nowHour = date.getHours();
    // console.dir(nowHour);
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

            
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {

                    //翌日9時の天気データ
                    const targetData1 = data.list[whichTomorrowWeatherData];
                    let purpose = $('.current_user_purpose').val();
                    var array = ['ビジネス(メンズ)', 'ビジネス(レディース)', 'オフィスカジュアル(メンズ)', 'オフィスカジュアル(レディース)', 'プライベート(メンズ)', 'プライベート(レディース)'];
                    var newArray = array;
                    let weapon = $('#js').val();
                    newArray.push(weapon);
                    $('.tomorrowTemp').text(Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                    $('.tomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData1.weather[0].icon + '.png ');
                    let temp = (Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                    // let a = gon.cloths_text[7]
                    // console.log(a)

                    if ( purpose == 1 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[0]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[1]['text']);
                        } else if ( temp >= 21 && temp <= 25 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[2]['text']);
                        } else if ( temp >= 15 && temp <= 20 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[3]['text']);
                        } else if ( temp <= 15 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[4]['text']);
                        }
                    } else if ( purpose == 2 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[5]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[6]['text']);
                        } else if ( temp >= 16 && temp <= 25 ) {
                            $('.contents-comment-text-b').text(gon.cloths_text[7]['text']);
                        } else if ( temp <= 15 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[8]['text']);
                        } 
                    } else if ( purpose ==  3 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[9]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[10]['text']);
                        } else if ( temp >= 21 && temp <= 25 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[11]['text']);
                        } else if ( temp >= 15 && temp <= 20 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[13]['text']);
                        } else if ( temp <= 15 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[14]['text']);
                        }
                    } else if ( purpose == 4 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[15]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[16]['text']);
                        } else if ( temp >= 16 && temp <= 25 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[17]['text']);
                        } else if ( temp >= 15 ){
                            $(".contents-comment-text-b").text(gon.cloths_text[18]['text']);
                        } 
                    } else if ( purpose == 5 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[19]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[20]['text']);
                        } else if ( temp >= 16 && temp <= 25 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[21]['text']);
                        } else if ( temp <= 15 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[22]['text']);
                        } 
                    } else if ( purpose == 6 ) {
                        if ( temp >= 30 ) {
                          $(".contents-comment-text-b").text(gon.cloths_text[23]['text']);
                        } else if ( temp >= 26 && temp <= 30 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[24]['text']);
                        } else if ( temp >= 16 && temp <= 25 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[25]['text']);
                        } else if ( temp <= 15 ) {
                            $(".contents-comment-text-b").text(gon.cloths_text[26]['text']);
                        } 
                    }                         
                    
                }
            });


            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast",
                dataType: "jsonp",
                data: "lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY,
                //天気データ呼び出し成功時の挙動
                success: function (data) {

                    //翌日9時の天気データ
                    const targetData1 = data.list[whichTomorrowWeatherData];
                    let purpose = $('.current_user_purpose').val();
                    var array = ['ビジネス(メンズ)', 'ビジネス(レディース)', 'オフィスカジュアル(メンズ)', 'オフィスカジュアル(レディース)', 'プライベート(メンズ)', 'プライベート(レディース)'];
                    var newArray = array;
                    let weapon = $('#js').val();
                    newArray.push(weapon);
                    $('.tomorrowTemp').text(Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                    $('.tomorrowWeatherIcon').attr('src', 'http://openweathermap.org/img/w/' + targetData1.weather[0].icon + '.png ');
                    let temp = (Math.floor((targetData1.main.temp - 273.15) * 10) / 10);
                    let a = gon.cloths_image[7].cloth.url
                    console.log(a)
                    if ( purpose == 1 ) {
                        if ( temp > 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/2/img1-2.jpg");
                        } else if ( temp > 25 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/2/img1-2.jpg");
                        } else if ( temp > 20 && temp <= 25 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/3/img1-3.jpg");
                        } else if ( temp > 15 && temp <= 20 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/4/img1-4.jpg");
                        } else if ( temp <= 15 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/5/img1-5.jpg");
                        }
                    } else if ( purpose == 2 ) {
                        if ( temp > 30 ) {
                          $('#translate-img').attr("src", "/uploads/cloth/cloth/6/img2-1.jpg");
                        } else if ( temp > 25 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/7/img2-2.jpg");
                        } else if ( temp > 15 && temp <= 25 ) { 
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/8/img2-3.jpg");
                        } else if ( temp <= 15 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/9/img2-4.jpg");
                        } 
                    } else if ( purpose ==  3 ) {
                        if ( temp > 30 ) {
                          $('#translate-img').attr("src", "/uploads/cloth/cloth/10/img3-1.jpg");
                        } else if ( temp > 26 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/11/img3-2.jpg");
                        } else if ( temp > 20 && temp <= 26 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/12/img3-3.jpg");                            
                        } else if ( temp > 15 && temp <= 20 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/13/img3-4.jpg");
                        } else if ( temp <= 15 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/14/img3-5.jpg");
                        }
                    } else if ( purpose == 4 ) {
                        if ( temp > 30 ) {
                          $('#translate-img').attr("src", "/uploads/cloth/cloth/15/img4-1.jpg");
                        } else if ( temp > 25 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/16/img4-2.jpg");
                        } else if ( temp > 15 && temp <= 25 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/17/img4-3.jpg");
                        } else if ( temp <= 15 ){
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/18/img4-4.jpg");
                        } 
                    } else if ( purpose == 5 ) {
                        if ( temp > 30 ) {
                          $('#translate-img').attr("src", "/uploads/cloth/cloth/19/img5-1.jpg");
                        } else if ( temp > 25 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/20/img5-2.jpg");
                        } else if ( temp > 15 && temp <= 25 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/21/img5-3.jpg");
                        } else if ( temp <= 15 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/22/img5-4.jpg");
                        } 
                    } else if ( purpose == 6 ) {
                        if ( temp > 30 ) {
                          $('#translate-img').attr("src", "/uploads/cloth/cloth/23/img6-1.jpg");
                        } else if ( temp > 25 && temp <= 30 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/24/img6-2.jpg");
                        } else if ( temp > 15 && temp <= 25 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/25/img6-3.jpg");
                        } else if ( temp <= 15 ) {
                            $('#translate-img').attr("src", "/uploads/cloth/cloth/23/img6-4.jpg");
                        } 
                    }                         
                    
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
                // console.log( data.list)
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

    // $(function (){        
    // //   .done(function() 
    //       let purpose = $('.current_user_purpose').val();
    //        var array = ['ビジネス(メンズ)', 'ビジネス(レディース)', 'オフィスカジュアル(メンズ)', 'オフィスカジュアル(レディース)', 'プライベート(メンズ)', 'プライベート(レディース)'];
    //        var newArray = array;
    //        let weapon = $('#js').val();
    //        newArray.push(weapon);

    //       if ( purpose == 1 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[0]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[1]);
    //           } else if ( $('.tomorrowTemp') >= 21 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[2]);
    //           } else if ( $('.tomorrowTemp') >= 15 && $('.tomorrowTemp') <= 20 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[3]);
    //           } else if ( $('.tomorrowTemp') <= 15 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[4]);
    //           }
    //       } else if ( purpose == 2 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[5]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[6]);
    //           } else if ( $('.tomorrowTemp') >= 16 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[7]);
    //           } else if ( $('.tomorrowTemp') <= 15 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[8]);
    //           } 
    //       } else if ( purpose ==  3 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[9]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[10]);
    //           } else if ( $('.tomorrowTemp') >= 21 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[11]);
    //           } else if ( $('.tomorrowTemp') >= 15 && $('.tomorrowTemp') <= 20 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[13]);
    //           } else if (  $('.tomorrowTemp') <= 15 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[14]);
    //           }
    //       } else if ( purpose == 4 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[15]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[16]);
    //           } else if ( $('.tomorrowTemp') >= 16 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[17]);
    //           } else if ( $('.tomorrowTemp') >= 15 ){
    //               $(".contents-comment-text-b").text(gon.cloths_text[18]);
    //           } 
    //       } else if ( purpose == 5 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[19]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[20]);
    //           } else if ( $('.tomorrowTemp') >= 16 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[21]);
    //           } else if ( $('.tomorrowTemp') <= 15 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[22]);
    //           } 
    //       } else if ( purpose == 6 ) {
    //           if ( $('.tomorrowTemp') >= 30 ) {
    //             $(".contents-comment-text-b").text(gon.cloths_text[23]);
    //           } else if ( $('.tomorrowTemp') >= 26 && $('.tomorrowTemp') <= 30 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[24]);
    //           } else if ( $('.tomorrowTemp') >= 16 && $('.tomorrowTemp') <= 25 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[25]);
    //           } else if ( $('.tomorrowTemp') <= 15 ) {
    //               $(".contents-comment-text-b").text(gon.cloths_text[26]);
    //           } 
    //       }      
    //     })
});

//   .error(function(XMLHttpRequest, textStatus, errorThrown) {
    //     alert('error!!!');
    // 　　console.log("XMLHttpRequest : " + XMLHttpRequest.status);
    // 　　console.log("textStatus     : " + textStatus);
    // 　　console.log("errorThrown    : " + errorThrown.message);
    // });

    // });