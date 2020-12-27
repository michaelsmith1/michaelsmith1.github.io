



// menu-autorized-flip__________________

var AuthorizationButton = (function () {
    var
        authorization = $('.buttonauth__link'),
        cardFlip = $('.usercart__rotate'),
        flip = $('.flip'),
        funcflip = function (e) {

            e.preventDefault();
            authorization.toggleClass('active-button');
            setTimeout(function () {
                cardFlip.toggleClass('flip');
            }, 100);

        },
        funcflipbody = function (e) {
            if(!e) e = window.event;
            var elems = e.path,
                flag = true;

            for(var i = 0; i < elems.length; i++) {
                if(elems[i].id === "active-button" || elems[i].id === "input_login") {
                    flag = false;
                    console.log('ssssss')
                }
            }

            if(flag) {console.log('eeeeeee');
            funcflip()
            }

        };

    return {
        init: function () {
            authorization.on('click',funcflip );
            // $(document).on('click',funcflipbody );
            $('#naglav').on('click', funcflip )
        }
    }
}());
$(function () {
    if ($('#authorizationButton').length) {
        AuthorizationButton.init();
    }
});




//Menu__Blog______________
var scrollMenu = (function () {
    var $news = $('.blog__contain__list__link'),
        $item = $('.blog__menu__list__link'),
        $wrapMenu = $('.blog__menu'),
        body = document.body,
        isPositionArticle = [],
        offsetHeight = 200,

        positionArticle = function (element) {
            var len = element.length;
            for (var i = 0; i < len; i++) {
                isPositionArticle[i] = {};
                isPositionArticle[i].top = element
                        .eq(i)
                        .offset()
                        .top - offsetHeight;
                isPositionArticle[i].bottom = isPositionArticle[i].top + element
                        .eq(i)
                        .innerHeight();
            }
        },

        scrollPageFixMenu = function () {
            var scroll = window.pageYOffset;
            if (scroll < $news.offset().top) {
                $wrapMenu.removeClass('fixed');
            } else {
                $wrapMenu.addClass('fixed');
            }
        },

        scrollPage = function () {
            var scroll = window.pageYOffset;
            for (var i = 0; i < isPositionArticle.length; i++) {
                if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
                    $('.blog__menu__list__link_phone')
                        .eq(i)
                        .addClass('link_active')
                        .siblings()
                        .removeClass('link_active');
                    $item
                        .eq(i)
                        .addClass('link_active')
                        .siblings()
                        .removeClass('link_active');
                }
            }
        },

        clickOnMenu = function (e) {
            var index = $(e.target).index();
            var sectionOffset = $news
                .eq(index)
                .offset()
                .top;
            $(document).off('scroll', scrollPage);
            $('body, html').animate({
                'scrollTop': sectionOffset
            }, function () {
                $(e.target)
                    .addClass('link_active')
                    .siblings()
                    .removeClass('link_active');
                $(document).on('scroll', scrollPage);
            });
        },

        addListener = function () {
            $('.blog__menu__list').on('click', clickOnMenu);

            $(document).on('scroll', scrollPage);
            $(document).on('scroll', scrollPageFixMenu);

            $(window).on('load', function (e) {
                positionArticle($news);
            });

            $(window).on('resize', function (e) {
                positionArticle($news);
            });

            $('.blog_phone__menu__js_disk').on('click', function (e) {
                e.preventDefault();
                $(this).parents('.blog__aside_phone').toggleClass('blocked');
            });
        };

    return {
        init: addListener
    }
}());

$(function () {
    if ($('#blog').length) {
        scrollMenu.init();
    }
});


//blur_________________________
var blur = (function () {
    var wrap = document.querySelector('.blur__form'),
        bg = document.querySelector('.blur'),
        bgSection = document.querySelector('.aboutme');

    function set() {
        var bgWidth = bgSection.offsetWidth,
            posLeft = -wrap.offsetLeft,
            posTop = -wrap.offsetTop,
            offsetImgTop = bgSection.offsetTop,
            offsetTop = posTop + offsetImgTop;

        bg.style.backgroundSize = bgWidth + 'px ' + 'auto';
        bg.style.backgroundPosition = posLeft + 'px ' + offsetTop + 'px';
    }

    return {
        init: function init() {
            set();

            window.addEventListener('resize', set);
        }
    };
}());

$(function () {
    if ($('#blurid').length) {
        blur.init();
    }

    window.onresize = function () {
        if ($('#blurid').length) {
            blur.init();
        }
    }
});


//контакт форма
(function () {
    if (document.getElementById('popup')) {
        var popUp = $('#popup'),
            formSubmit = $('.form__submit'),
            popUpClose = $('#popup_close');

        formSubmit.on ('click', function (e) {
            e.preventDefault();
            var contact_form_name =     $('#contact_form_name'),
                contact_form_email =    $('#contact_form_email'),
                contact_form_text =     $('#contact_form_text'),
                popupText =             $('#popup_text');



            if (!contact_form_name.val() === true || !contact_form_email.val() === true || !contact_form_text.val() === true ) {

                popupText.innerHTML = 'Заполните все поля!';
                popUp.addClass('active');
                console.log(contact_form_name.val() );
                console.log(contact_form_email.text());
                console.log(contact_form_text.val() );
                console.log('Заполните все поля');
            } else {
                console.log(contact_form_name.val() );
                console.log(contact_form_email.text());
                console.log(contact_form_text.val() );
                console.log('Сообщение отправлено');
                var xhr = new XMLHttpRequest(),
                    body = 'name=' + contact_form_name + '&email=' + contact_form_email + '&text=' + contact_form_text;

                xhr.open('POST', 'url', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                if (xhr.status != 200) {
                    popupText.innerHTML = 'Произошла ошибка!';
                    popUp.addClass('active-pop');
                }
                else {
                    xhr.send(body);
                    popupText.innerHTML = 'Сообщение отправлено!';
                    popUp.classList.add('active-pop');

                }
            }

        });
        popUpClose.on('click', function () {
            popUp.removeClass('active');
        });
    }
}());
var myform = (function () {
    var
        form = $('#authorization'),
        login = $('#input_login'),
        pswrd = $('#input_pswrd'),
        err_mess = $('.tooltip_error'),
        err_log = $('.tooltip_error-login'),
        err_pswrd = $('.tooltip_error-pswrd'),
        err_chec = $('.tooltip_error-chec');

    var init, setUpList, Submit;
    init = function () {
        setUpList();
        // console.log( $('#chel:checked') );
    };
    setUpList = function () {
        form.on('submit', Submit);
        $('#input_login').on('click', function () {
            err_log.removeClass('disp-er')
        });

        $('#input_pswrd').on('click', function () {
            err_pswrd.removeClass('disp-er')
        });

        $('.form__lbl').on('click', function () {
            err_chec.removeClass('disp-er')
        });

        // console.log($('#authorization'))

    };
    Submit = function (e) {
        //Проверка данных
        e.preventDefault();
        var a = false,
            b = false,
            c = false;

        if  ( !login.val() === true ) {err_log.addClass('disp-er')}
            else {a = true}
        if  ( !pswrd.val() === true ) {err_pswrd.addClass('disp-er')}
            else {b = true}
        if  ( !$('#chel').prop('checked') || !$('#no_robot').prop('checked') ) {err_chec.addClass('disp-er')}
            else {c = true}
        if ( a === true && b === true && c === true) {

            // если все ок, отправляем
            func_send();

        }


    // },
    // func_send = function () {
    //
    //     if (login) {
    //         login.addEventListener('submit', prepareSendMail);
    //     }
    //     if (pswrd) {
    //         pswrd.addEventListener('submit', prepareSendLogin);
    //     }
    //
    //
    //     function prepareSendMail(e) {
    //         e.preventDefault();
    //         var data = {
    //             name: login.name.value
    //         };
    //         prepareSend('/contact', login, data);
    //     }
    //
    //     function prepareSendLogin(e) {
    //         e.preventDefault();
    //         var data = {
    //             login: login.login.value,
    //             password: login.pswrd.value
    //         };
    //
    //         prepareSend('/login', login, data, function(data) {
    //             if (data === 'Авторизация успешна!') {
    //                 location.href = '/admin';
    //             }
    //         });
    //     };
    //
    //
    //     prepareSend = function (url, form, data, cb) {
    //         var resultContainer = form.querySelector('.status');
    //         resultContainer.innerHTML = 'Sending...';
    //         sendAjaxJson(url, data, function (data) {
    //             form.reset();
    //             resultContainer.innerHTML = data;
    //             if (cb) {
    //                 cb(data);
    //             }
    //         });
    //     };
    //
    // //------------------
    //
    //      function (url, data, cb) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open('POST', url, true);
    //         xhr.setRequestHeader('Content-Type', 'application/json');
    //         xhr.onload = function (e) {
    //             var result;
    //             try {
    //                 result = JSON.parse(xhr.responseText);
    //             } catch (e) {
    //                 cb('Извините в данных ошибка');
    //             }
    //             cb(result.status);
    //         };
    //         xhr.send(JSON.stringify(data));
    //     }

    //    ---------------------
    };



    return {
        init: init()
    };
})();
//map__Google---------------
$(function () {
    var Maps;
    var Routes;
    var App;
    var Utils;
    Utils = {
        settings: {
            debug: false
        },
        clickEvent: 'click',
        log: function(what) {
            if ( Utils.settings.debug && window.console ) {
                console.log(what);
            }
        }
    };

    //  fast use
    var clickEvent = Utils.clickEvent,
        _log = Utils.log;
    Maps = {
        load: function() {
            _log( "Map: load script" );
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
                'callback=initMap&key=AIzaSyCoinv0op00s_n1cclfA0ExKG-yrhCGTq4';
            document.body.appendChild(script);
        },
        initSettings: function() {
            _log( "Map: init settings" );
            this.map = null;
            this.marker = null;
            this.settings = {
                zoom: 14,
                center: new google.maps.LatLng(51.711710, 39.194880),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#d5d5d5"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#d6d6d6"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#d6d6d6"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#00bfa5"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "color": "#00bfa5"
                            },
                        ]
                    }
                ],
                scrollwheel: false,
                mapTypeControl: false,
                panControl: true,
                panControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                scaleControl: false,
                streetViewControl: true
            };
        },
        init: function() {
            _log( "Map: init Map" );
            Maps.initSettings();
            Maps.map = new google.maps.Map(document.getElementById('map'),
                Maps.settings);
            Maps.marker = new google.maps.Marker({
                map: Maps.map,
                draggable: false,
                position: new google.maps.LatLng(51.694970, 39.200646)
            });
        }
    };
    //  function assinchrone
    window.initMap = function() {
        Maps.init();
    };
    Routes = {
        init: function() {
            _log( "Routes: init" );
            Maps.load();
        }
    };
    App = {
        init: function() {
            Routes.init();
        }
    };
    if ($('#map').length) {
        App.init();
    }
});
// menu_______________________________________
var Hamburger = (function () {
    var
        hamburger = $('.menu__hamburger__link'),
        navContainer = $('.js-navigation'),
        navContent = $('.main-menu');

    return {
        init: function () {
            hamburger.on('click', function (e) {
                e.preventDefault();

                var _this = $(this);

                _this.toggleClass('on');
                $('body').toggleClass('active-body');
                setTimeout(function () {
                    navContent.toggleClass('active');
                }, 500);
                navContainer.toggleClass('active')
            });
        }
    }
}());

$(function () {
    if ($('#hamburger').length) {
        Hamburger.init();
    }
});


// Parallax_________________

var ParallaxMouse = (function () {
    return {
        init: function () {
            var parallaxContainer = document.getElementById('parallax-mouse'),
                layers = parallaxContainer.children;

            window.addEventListener('mousemove', function (e) {
                var
                    pageX = e.pageX,
                    pageY = e.pageY,
                    initialX = (window.innerWidth / 2) - pageX,
                    initialY = (window.innerHeight / 2) - pageY;
                [].slice.call(layers).forEach(function (layer, i) {
                    var
                        divider = i/100,
                        positionX = initialX * divider,
                        positionY = initialY * divider,
                        bottomPosition = (window.innerHeight / 2) * divider,
                        layerStyle = layer.style,
                        transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0)';
                    layerStyle.transform = transformString;
                    layerStyle.webkitTransform = transformString;
                    layerStyle.oTransform = transformString;
                    layerStyle.msTransform = transformString;
                    layerStyle.bottom = '-' + bottomPosition + 'px';
                })
            });
        }
    }
}());

var ParallaxScroll = (function () {
    return {
        init: function () {
            window.onscroll = function () {
                var parallax = (function () {
                    var
                        bg = document.querySelector('.js-parallax-bg'),
                        title = document.querySelector('.js-parallax-title'),
                        user = document.querySelector('.js-parallax-user');

                    return {
                        move: function (block, windowScroll, strafeAmount) {
                            var
                                strafe = windowScroll/-strafeAmount + '%',
                                style = block.style,
                                transformString = 'translate3d(0,'+ strafe +', 0)'
                            style.top = strafe;
                            style.transform = transformString;
                            style.webkitTransform = transformString;
                        },
                        init: function (wScroll) {
                            this.move(bg, wScroll, 45, 0);
                            this.move(title, wScroll, 15, 50);
                            this.move(user, wScroll, 5, 50);
                        }
                    }
                }());
                var wScroll = window.pageYOffset;
                parallax.init(wScroll);
            };
        }
    }
}());

$(function () {
    if ($('#parallax-mouse').length){
        ParallaxMouse.init();
    }

    if ($('#parallax-Scroll').length) {
        ParallaxScroll.init();
    }
})


// preloader___________

var preloader = (function () {
    var
        preloader = $('.preloader'),
        persentsTotal = 0,
        cardAnimate = $('.usercart');
    var imgPath = $('*').map(function (ind, element) {

        var
            background = $(element).css('background-image'),
            path = '';
        var isImg = $(element).is('img');

        if (background != 'none') {
            path = background.replace('url("', '').replace('")','')
        }

        if (isImg) {
            path = $(element).attr('src')
        }

        if (path) return path;
    });

    var setPersents = function (total, current) {

        var persents = Math.ceil(current / total *100);
        $('.js_percents').text(persents + '%');

        if (persents >= 100) {
            preloader.fadeOut();
            cardAnimate.addClass('active');
        }
    };

    var loadImages = function (images) {
        if (!images.length) preloader.fadeOut();

        images.forEach(function (img, i, images) {
            var fakeImages = $('<img>', {
                attr: {
                    src: img
                }
            });

            fakeImages.on('load error', function () {
                persentsTotal++;
                setPersents(images.length, persentsTotal);
            })
        });

    };

    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }
}());

$(function () {
    preloader.init();
});



// Скролл к нижней секции
$('.down_arrow').on('click', function (e) {
    e.preventDefault();
    var headerOffset = $('.scroll_sec').offset().top;
    $('html, body').animate({
        scrollTop: headerOffset
    }, 1000);
});

// Скролл к верху страницы
$('.up_arrow').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 500);
});






//slider__works------------

var sliderCont = (function () {
    var Slider = function (container) {
        var nextBtn = container.find('.js-slide-prev-but'),
            prevBtn = container.find('.js-slide-next-but'),
            items = nextBtn.find('.js-slider-item'),
            display = container.find('.js-slider-screen'),
            title = container.find('.js-slider-title'),
            skills = container.find('.js-slider-tehnologyes'),
            link = container.find('.js-slider-site-link'),
            itemsLength = items.length,
            duration = 500,
            flag = true;

        var timeout;

        this.counter = 0;

        var generateMarkups = function () {
            var list = nextBtn.find('.js-slider-list'),
                markups = list.clone();

            prevBtn
                .append(markups)
                .find('.js-slider-item')
                .removeClass('active-thumb')
                .eq($(this).counter + 1)
                .addClass('active-thumb');
        };

        var getDataArrays = function () {
            var dataObject = {
                pics: [],
                title: [],
                skills: [],
                link: []
            };

            $.each(items, function () {
                var $this = $(this);

                dataObject
                    .pics
                    .push($this.data('full'));
                dataObject
                    .title
                    .push($this.data('title'));
                dataObject
                    .skills
                    .push($this.data('skills'));
                dataObject
                    .link
                    .push($this.data('link'));
            });

            return dataObject;
        };

        var slideInLeftBtn = function (slide) {
            var reqItem = items.eq(slide - 1),
                activeItem = items.filter('.active-thumb');

            activeItem
                .stop(true, true)
                .animate({
                    'top': '100%'
                }, duration);

            reqItem
                .stop(true, true)
                .animate({
                    'top': '0%'
                }, duration, function () {
                    $(this)
                        .addClass('active-thumb')
                        .siblings()
                        .removeClass('active-thumb')
                        .css('top', '-100%')
                });

        };

        var slideInRightBtn = function (slide) {
            var items = prevBtn.find('.js-slider-item'),
                activeItem = items.filter('.active-thumb'),
                reqSlide = slide + 1;

            if (reqSlide > itemsLength - 1) {
                reqSlide = 0;
            }

            var reqItem = items.eq(reqSlide);

            activeItem
                .stop(true, true)
                .animate({
                    'top': '-100%'
                }, duration);

            reqItem
                .stop(true, true)
                .animate({
                    'top': '0%'
                }, duration, function () {
                    $(this)
                        .addClass('active-thumb')
                        .siblings()
                        .removeClass('active-thumb')
                        .css('top', '100%')
                });
        };

        var changeMainPicture = function (slide) {
            var image = display.find('.js-slider-screen-img');
            var data = getDataArrays();

            image
                .stop(true, true)
                .fadeOut(duration / 2, function () {
                    image.attr('src', data.pics[slide]);
                    $(this).fadeIn(duration / 2);
                });
        };

        var changeTextData = function (slide) {
            var data = getDataArrays();

            aviatitle.generate(data.title[slide], title, 'ru');

            aviatitle.generate(data.skills[slide], skills, 'en');

            link.attr('href', data.link[slide]);
        };

        this.setDefaults = function () {
            var _that = this,
                data = getDataArrays();

            generateMarkups();

            nextBtn
                .find('.js-slider-item')
                .eq(_that.counter - 1)
                .addClass('active-thumb');

            prevBtn
                .find('.js-slider-item')
                .eq(_that.counter + 1)
                .addClass('active-thumb');

            display
                .find('.js-slider-screen-img')
                .attr('src', data.pics[_that.counter]);

            // // text___info------------
            // changeTextData(_that.counter);

        };

        this.moveSlide = function (direction) {
            var _that = this;

            var directions = {
                next: function () {

                    if (_that.counter < itemsLength - 1) {
                        _that.counter++;
                    } else {
                        _that.counter = 0;
                    }
                },

                prev: function () {
                    if (_that.counter > 0) {
                        _that.counter--;
                    } else {
                        _that.counter = itemsLength - 1;
                    }
                }
            };

            directions[direction]();

            if (flag) {
                flag = false;

                if (typeof timeout != 'undefined') {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(function () {
                    flag = true;
                }, duration + 50);

                slideInLeftBtn(_that.counter);
                slideInRightBtn(_that.counter);
                changeMainPicture(_that.counter);
                changeTextData(_that.counter);
            }
        }
    };
    return {
        init: function () {
            var slider = new Slider($('.works__slider'));
            slider.setDefaults();

            $('.js-slide-prev-but').on('click', function (e) {
                e.preventDefault();
                slider.moveSlide('prev');
            });

            $('.js-slide-next-but').on('click', function (e) {
                e.preventDefault();
                slider.moveSlide('next');
            });
        }
    }
}());
$(function () {
    if ($('#slider').length) {
        sliderCont.init();
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJsb2dtZW51LmpzIiwiYmx1ci5qcyIsImNvbnRhY3QtZm9ybS5qcyIsImZvcm0uanMiLCJtYXAuanMiLCJtZW51LmpzIiwicGFyYWxsYXguanMiLCJwcmVsb2FkZXIuanMiLCJzY3JvbGwuanMiLCJzbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5cclxuLy8gbWVudS1hdXRvcml6ZWQtZmxpcF9fX19fX19fX19fX19fX19fX1xyXG5cclxudmFyIEF1dGhvcml6YXRpb25CdXR0b24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyXHJcbiAgICAgICAgYXV0aG9yaXphdGlvbiA9ICQoJy5idXR0b25hdXRoX19saW5rJyksXHJcbiAgICAgICAgY2FyZEZsaXAgPSAkKCcudXNlcmNhcnRfX3JvdGF0ZScpLFxyXG4gICAgICAgIGZsaXAgPSAkKCcuZmxpcCcpLFxyXG4gICAgICAgIGZ1bmNmbGlwID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYXV0aG9yaXphdGlvbi50b2dnbGVDbGFzcygnYWN0aXZlLWJ1dHRvbicpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRGbGlwLnRvZ2dsZUNsYXNzKCdmbGlwJyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY2ZsaXBib2R5ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYoIWUpIGUgPSB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgIHZhciBlbGVtcyA9IGUucGF0aCxcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtc1tpXS5pZCA9PT0gXCJhY3RpdmUtYnV0dG9uXCIgfHwgZWxlbXNbaV0uaWQgPT09IFwiaW5wdXRfbG9naW5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3Nzc3NzJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmxhZykge2NvbnNvbGUubG9nKCdlZWVlZWVlJyk7XHJcbiAgICAgICAgICAgIGZ1bmNmbGlwKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uLm9uKCdjbGljaycsZnVuY2ZsaXAgKTtcclxuICAgICAgICAgICAgLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJyxmdW5jZmxpcGJvZHkgKTtcclxuICAgICAgICAgICAgJCgnI25hZ2xhdicpLm9uKCdjbGljaycsIGZ1bmNmbGlwIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoJyNhdXRob3JpemF0aW9uQnV0dG9uJykubGVuZ3RoKSB7XHJcbiAgICAgICAgQXV0aG9yaXphdGlvbkJ1dHRvbi5pbml0KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG4iLCIvL01lbnVfX0Jsb2dfX19fX19fX19fX19fX1xyXG52YXIgc2Nyb2xsTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgJG5ld3MgPSAkKCcuYmxvZ19fY29udGFpbl9fbGlzdF9fbGluaycpLFxyXG4gICAgICAgICRpdGVtID0gJCgnLmJsb2dfX21lbnVfX2xpc3RfX2xpbmsnKSxcclxuICAgICAgICAkd3JhcE1lbnUgPSAkKCcuYmxvZ19fbWVudScpLFxyXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgIGlzUG9zaXRpb25BcnRpY2xlID0gW10sXHJcbiAgICAgICAgb2Zmc2V0SGVpZ2h0ID0gMjAwLFxyXG5cclxuICAgICAgICBwb3NpdGlvbkFydGljbGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gZWxlbWVudC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlzUG9zaXRpb25BcnRpY2xlW2ldID0ge307XHJcbiAgICAgICAgICAgICAgICBpc1Bvc2l0aW9uQXJ0aWNsZVtpXS50b3AgPSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub2Zmc2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvcCAtIG9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgIGlzUG9zaXRpb25BcnRpY2xlW2ldLmJvdHRvbSA9IGlzUG9zaXRpb25BcnRpY2xlW2ldLnRvcCArIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2Nyb2xsUGFnZUZpeE1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGwgPCAkbmV3cy5vZmZzZXQoKS50b3ApIHtcclxuICAgICAgICAgICAgICAgICR3cmFwTWVudS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR3cmFwTWVudS5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjcm9sbFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXNQb3NpdGlvbkFydGljbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gaXNQb3NpdGlvbkFydGljbGVbaV0udG9wICYmIHNjcm9sbCA8PSBpc1Bvc2l0aW9uQXJ0aWNsZVtpXS5ib3R0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYmxvZ19fbWVudV9fbGlzdF9fbGlua19waG9uZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpbmtfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpbmtfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaW5rX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xpY2tPbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkKGUudGFyZ2V0KS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgc2VjdGlvbk9mZnNldCA9ICRuZXdzXHJcbiAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAub2Zmc2V0KClcclxuICAgICAgICAgICAgICAgIC50b3A7XHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZignc2Nyb2xsJywgc2Nyb2xsUGFnZSk7XHJcbiAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICdzY3JvbGxUb3AnOiBzZWN0aW9uT2Zmc2V0XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoZS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsaW5rX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpbmtfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgc2Nyb2xsUGFnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuYmxvZ19fbWVudV9fbGlzdCcpLm9uKCdjbGljaycsIGNsaWNrT25NZW51KTtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBzY3JvbGxQYWdlKTtcclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsIHNjcm9sbFBhZ2VGaXhNZW51KTtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkFydGljbGUoJG5ld3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uQXJ0aWNsZSgkbmV3cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmJsb2dfcGhvbmVfX21lbnVfX2pzX2Rpc2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuYmxvZ19fYXNpZGVfcGhvbmUnKS50b2dnbGVDbGFzcygnYmxvY2tlZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogYWRkTGlzdGVuZXJcclxuICAgIH1cclxufSgpKTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoJyNibG9nJykubGVuZ3RoKSB7XHJcbiAgICAgICAgc2Nyb2xsTWVudS5pbml0KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiLy9ibHVyX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibHVyX19mb3JtJyksXHJcbiAgICAgICAgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmx1cicpLFxyXG4gICAgICAgIGJnU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dG1lJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0KCkge1xyXG4gICAgICAgIHZhciBiZ1dpZHRoID0gYmdTZWN0aW9uLm9mZnNldFdpZHRoLFxyXG4gICAgICAgICAgICBwb3NMZWZ0ID0gLXdyYXAub2Zmc2V0TGVmdCxcclxuICAgICAgICAgICAgcG9zVG9wID0gLXdyYXAub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICBvZmZzZXRJbWdUb3AgPSBiZ1NlY3Rpb24ub2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICBvZmZzZXRUb3AgPSBwb3NUb3AgKyBvZmZzZXRJbWdUb3A7XHJcblxyXG4gICAgICAgIGJnLnN0eWxlLmJhY2tncm91bmRTaXplID0gYmdXaWR0aCArICdweCAnICsgJ2F1dG8nO1xyXG4gICAgICAgIGJnLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHggJyArIG9mZnNldFRvcCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0oKSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCcjYmx1cmlkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgYmx1ci5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcjYmx1cmlkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJsdXIuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4iLCIvL9C60L7QvdGC0LDQutGCINGE0L7RgNC80LBcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXAnKSkge1xyXG4gICAgICAgIHZhciBwb3BVcCA9ICQoJyNwb3B1cCcpLFxyXG4gICAgICAgICAgICBmb3JtU3VibWl0ID0gJCgnLmZvcm1fX3N1Ym1pdCcpLFxyXG4gICAgICAgICAgICBwb3BVcENsb3NlID0gJCgnI3BvcHVwX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQub24gKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhY3RfZm9ybV9uYW1lID0gICAgICQoJyNjb250YWN0X2Zvcm1fbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgY29udGFjdF9mb3JtX2VtYWlsID0gICAgJCgnI2NvbnRhY3RfZm9ybV9lbWFpbCcpLFxyXG4gICAgICAgICAgICAgICAgY29udGFjdF9mb3JtX3RleHQgPSAgICAgJCgnI2NvbnRhY3RfZm9ybV90ZXh0JyksXHJcbiAgICAgICAgICAgICAgICBwb3B1cFRleHQgPSAgICAgICAgICAgICAkKCcjcG9wdXBfdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbnRhY3RfZm9ybV9uYW1lLnZhbCgpID09PSB0cnVlIHx8ICFjb250YWN0X2Zvcm1fZW1haWwudmFsKCkgPT09IHRydWUgfHwgIWNvbnRhY3RfZm9ybV90ZXh0LnZhbCgpID09PSB0cnVlICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvcHVwVGV4dC5pbm5lckhUTUwgPSAn0JfQsNC/0L7Qu9C90LjRgtC1INCy0YHQtSDQv9C+0LvRjyEnO1xyXG4gICAgICAgICAgICAgICAgcG9wVXAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGFjdF9mb3JtX25hbWUudmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RfZm9ybV9lbWFpbC50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGFjdF9mb3JtX3RleHQudmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQl9Cw0L/QvtC70L3QuNGC0LUg0LLRgdC1INC/0L7Qu9GPJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250YWN0X2Zvcm1fbmFtZS52YWwoKSApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29udGFjdF9mb3JtX2VtYWlsLnRleHQoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250YWN0X2Zvcm1fdGV4dC52YWwoKSApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ch0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3QvicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSAnbmFtZT0nICsgY29udGFjdF9mb3JtX25hbWUgKyAnJmVtYWlsPScgKyBjb250YWN0X2Zvcm1fZW1haWwgKyAnJnRleHQ9JyArIGNvbnRhY3RfZm9ybV90ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgJ3VybCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1cFRleHQuaW5uZXJIVE1MID0gJ9Cf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAhJztcclxuICAgICAgICAgICAgICAgICAgICBwb3BVcC5hZGRDbGFzcygnYWN0aXZlLXBvcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBUZXh0LmlubmVySFRNTCA9ICfQodC+0L7QsdGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4hJztcclxuICAgICAgICAgICAgICAgICAgICBwb3BVcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcG9wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBvcFVwQ2xvc2Uub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3BVcC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0oKSk7IiwidmFyIG15Zm9ybSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXJcclxuICAgICAgICBmb3JtID0gJCgnI2F1dGhvcml6YXRpb24nKSxcclxuICAgICAgICBsb2dpbiA9ICQoJyNpbnB1dF9sb2dpbicpLFxyXG4gICAgICAgIHBzd3JkID0gJCgnI2lucHV0X3Bzd3JkJyksXHJcbiAgICAgICAgZXJyX21lc3MgPSAkKCcudG9vbHRpcF9lcnJvcicpLFxyXG4gICAgICAgIGVycl9sb2cgPSAkKCcudG9vbHRpcF9lcnJvci1sb2dpbicpLFxyXG4gICAgICAgIGVycl9wc3dyZCA9ICQoJy50b29sdGlwX2Vycm9yLXBzd3JkJyksXHJcbiAgICAgICAgZXJyX2NoZWMgPSAkKCcudG9vbHRpcF9lcnJvci1jaGVjJyk7XHJcblxyXG4gICAgdmFyIGluaXQsIHNldFVwTGlzdCwgU3VibWl0O1xyXG4gICAgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZXRVcExpc3QoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyggJCgnI2NoZWw6Y2hlY2tlZCcpICk7XHJcbiAgICB9O1xyXG4gICAgc2V0VXBMaXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvcm0ub24oJ3N1Ym1pdCcsIFN1Ym1pdCk7XHJcbiAgICAgICAgJCgnI2lucHV0X2xvZ2luJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlcnJfbG9nLnJlbW92ZUNsYXNzKCdkaXNwLWVyJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI2lucHV0X3Bzd3JkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlcnJfcHN3cmQucmVtb3ZlQ2xhc3MoJ2Rpc3AtZXInKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuZm9ybV9fbGJsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlcnJfY2hlYy5yZW1vdmVDbGFzcygnZGlzcC1lcicpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCQoJyNhdXRob3JpemF0aW9uJykpXHJcblxyXG4gICAgfTtcclxuICAgIFN1Ym1pdCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy/Qn9GA0L7QstC10YDQutCwINC00LDQvdC90YvRhVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgYSA9IGZhbHNlLFxyXG4gICAgICAgICAgICBiID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgICggIWxvZ2luLnZhbCgpID09PSB0cnVlICkge2Vycl9sb2cuYWRkQ2xhc3MoJ2Rpc3AtZXInKX1cclxuICAgICAgICAgICAgZWxzZSB7YSA9IHRydWV9XHJcbiAgICAgICAgaWYgICggIXBzd3JkLnZhbCgpID09PSB0cnVlICkge2Vycl9wc3dyZC5hZGRDbGFzcygnZGlzcC1lcicpfVxyXG4gICAgICAgICAgICBlbHNlIHtiID0gdHJ1ZX1cclxuICAgICAgICBpZiAgKCAhJCgnI2NoZWwnKS5wcm9wKCdjaGVja2VkJykgfHwgISQoJyNub19yb2JvdCcpLnByb3AoJ2NoZWNrZWQnKSApIHtlcnJfY2hlYy5hZGRDbGFzcygnZGlzcC1lcicpfVxyXG4gICAgICAgICAgICBlbHNlIHtjID0gdHJ1ZX1cclxuICAgICAgICBpZiAoIGEgPT09IHRydWUgJiYgYiA9PT0gdHJ1ZSAmJiBjID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQstGB0LUg0L7Quiwg0L7RgtC/0YDQsNCy0LvRj9C10LxcclxuICAgICAgICAgICAgZnVuY19zZW5kKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgLy8gfSxcclxuICAgIC8vIGZ1bmNfc2VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vXHJcbiAgICAvLyAgICAgaWYgKGxvZ2luKSB7XHJcbiAgICAvLyAgICAgICAgIGxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmIChwc3dyZCkge1xyXG4gICAgLy8gICAgICAgICBwc3dyZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZExvZ2luKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvL1xyXG4gICAgLy9cclxuICAgIC8vICAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xyXG4gICAgLy8gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgLy8gICAgICAgICAgICAgbmFtZTogbG9naW4ubmFtZS52YWx1ZVxyXG4gICAgLy8gICAgICAgICB9O1xyXG4gICAgLy8gICAgICAgICBwcmVwYXJlU2VuZCgnL2NvbnRhY3QnLCBsb2dpbiwgZGF0YSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy9cclxuICAgIC8vICAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZExvZ2luKGUpIHtcclxuICAgIC8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgIC8vICAgICAgICAgICAgIGxvZ2luOiBsb2dpbi5sb2dpbi52YWx1ZSxcclxuICAgIC8vICAgICAgICAgICAgIHBhc3N3b3JkOiBsb2dpbi5wc3dyZC52YWx1ZVxyXG4gICAgLy8gICAgICAgICB9O1xyXG4gICAgLy9cclxuICAgIC8vICAgICAgICAgcHJlcGFyZVNlbmQoJy9sb2dpbicsIGxvZ2luLCBkYXRhLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0YPRgdC/0LXRiNC90LAhJykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2FkbWluJztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vXHJcbiAgICAvL1xyXG4gICAgLy8gICAgIHByZXBhcmVTZW5kID0gZnVuY3Rpb24gKHVybCwgZm9ybSwgZGF0YSwgY2IpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGZvcm0ucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xyXG4gICAgLy8gICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xyXG4gICAgLy8gICAgICAgICBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgLy8gICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjYihkYXRhKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vXHJcbiAgICAvLyAvLy0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy9cclxuICAgIC8vICAgICAgZnVuY3Rpb24gKHVybCwgZGF0YSwgY2IpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgLy8gICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAvLyAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgLy8gICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIC8vICAgICAgICAgICAgIHZhciByZXN1bHQ7XHJcbiAgICAvLyAgICAgICAgICAgICB0cnkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY2IoJ9CY0LfQstC40L3QuNGC0LUg0LIg0LTQsNC90L3Ri9GFINC+0YjQuNCx0LrQsCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICAvLyAgICAgICAgIH07XHJcbiAgICAvLyAgICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0KClcclxuICAgIH07XHJcbn0pKCk7IiwiLy9tYXBfX0dvb2dsZS0tLS0tLS0tLS0tLS0tLVxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBNYXBzO1xyXG4gICAgdmFyIFJvdXRlcztcclxuICAgIHZhciBBcHA7XHJcbiAgICB2YXIgVXRpbHM7XHJcbiAgICBVdGlscyA9IHtcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsaWNrRXZlbnQ6ICdjbGljaycsXHJcbiAgICAgICAgbG9nOiBmdW5jdGlvbih3aGF0KSB7XHJcbiAgICAgICAgICAgIGlmICggVXRpbHMuc2V0dGluZ3MuZGVidWcgJiYgd2luZG93LmNvbnNvbGUgKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3aGF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gIGZhc3QgdXNlXHJcbiAgICB2YXIgY2xpY2tFdmVudCA9IFV0aWxzLmNsaWNrRXZlbnQsXHJcbiAgICAgICAgX2xvZyA9IFV0aWxzLmxvZztcclxuICAgIE1hcHMgPSB7XHJcbiAgICAgICAgbG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIF9sb2coIFwiTWFwOiBsb2FkIHNjcmlwdFwiICk7XHJcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/dj0zLmV4cCZzZW5zb3I9ZmFsc2UmJyArXHJcbiAgICAgICAgICAgICAgICAnY2FsbGJhY2s9aW5pdE1hcCZrZXk9QUl6YVN5Q29pbnYwb3AwMHNfbjFjY2xmQTBFeEtHLXlyaENHVHE0JztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdFNldHRpbmdzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgX2xvZyggXCJNYXA6IGluaXQgc2V0dGluZ3NcIiApO1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgICAgIHpvb206IDE0LFxyXG4gICAgICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUxLjcxMTcxMCwgMzkuMTk0ODgwKSxcclxuICAgICAgICAgICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkNWQ1ZDVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkNmQ2ZDZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkNmQ2ZDZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwYmZhNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDBiZmE1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGFuQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHBhbkNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5MRUZUX0NFTlRFUlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5MRUZUX0NFTlRFUlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIF9sb2coIFwiTWFwOiBpbml0IE1hcFwiICk7XHJcbiAgICAgICAgICAgIE1hcHMuaW5pdFNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIE1hcHMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksXHJcbiAgICAgICAgICAgICAgICBNYXBzLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgTWFwcy5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIG1hcDogTWFwcy5tYXAsXHJcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTEuNjk0OTcwLCAzOS4yMDA2NDYpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyAgZnVuY3Rpb24gYXNzaW5jaHJvbmVcclxuICAgIHdpbmRvdy5pbml0TWFwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgTWFwcy5pbml0KCk7XHJcbiAgICB9O1xyXG4gICAgUm91dGVzID0ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBfbG9nKCBcIlJvdXRlczogaW5pdFwiICk7XHJcbiAgICAgICAgICAgIE1hcHMubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcHAgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFJvdXRlcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmICgkKCcjbWFwJykubGVuZ3RoKSB7XHJcbiAgICAgICAgQXBwLmluaXQoKTtcclxuICAgIH1cclxufSk7IiwiLy8gbWVudV9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG52YXIgSGFtYnVyZ2VyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhclxyXG4gICAgICAgIGhhbWJ1cmdlciA9ICQoJy5tZW51X19oYW1idXJnZXJfX2xpbmsnKSxcclxuICAgICAgICBuYXZDb250YWluZXIgPSAkKCcuanMtbmF2aWdhdGlvbicpLFxyXG4gICAgICAgIG5hdkNvbnRlbnQgPSAkKCcubWFpbi1tZW51Jyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZS1ib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZDb250ZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICBuYXZDb250YWluZXIudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoJyNoYW1idXJnZXInKS5sZW5ndGgpIHtcclxuICAgICAgICBIYW1idXJnZXIuaW5pdCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsIi8vIFBhcmFsbGF4X19fX19fX19fX19fX19fX19cclxuXHJcbnZhciBQYXJhbGxheE1vdXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyYWxsYXhDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFyYWxsYXgtbW91c2UnKSxcclxuICAgICAgICAgICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgICAgICBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSBpLzEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwgJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUub1RyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsYXllclN0eWxlLm1zVHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxudmFyIFBhcmFsbGF4U2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wYXJhbGxheC1iZycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wYXJhbGxheC10aXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBhcmFsbGF4LXVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyYWZlID0gd2luZG93U2Nyb2xsLy1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBibG9jay5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnKyBzdHJhZmUgKycsIDApJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudG9wID0gc3RyYWZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUodGl0bGUsIHdTY3JvbGwsIDE1LCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgNSwgNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCcjcGFyYWxsYXgtbW91c2UnKS5sZW5ndGgpe1xyXG4gICAgICAgIFBhcmFsbGF4TW91c2UuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkKCcjcGFyYWxsYXgtU2Nyb2xsJykubGVuZ3RoKSB7XHJcbiAgICAgICAgUGFyYWxsYXhTY3JvbGwuaW5pdCgpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuIiwiLy8gcHJlbG9hZGVyX19fX19fX19fX19cclxuXHJcbnZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyXHJcbiAgICAgICAgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpLFxyXG4gICAgICAgIHBlcnNlbnRzVG90YWwgPSAwLFxyXG4gICAgICAgIGNhcmRBbmltYXRlID0gJCgnLnVzZXJjYXJ0Jyk7XHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKGluZCwgZWxlbWVudCkge1xyXG5cclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgICAgICAgIHBhdGggPSAnJztcclxuICAgICAgICB2YXIgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCcnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzSW1nKSB7XHJcbiAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2V0UGVyc2VudHMgPSBmdW5jdGlvbiAodG90YWwsIGN1cnJlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIHBlcnNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqMTAwKTtcclxuICAgICAgICAkKCcuanNfcGVyY2VudHMnKS50ZXh0KHBlcnNlbnRzICsgJyUnKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcnNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICBjYXJkQW5pbWF0ZS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcclxuICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcsIGksIGltYWdlcykge1xyXG4gICAgICAgICAgICB2YXIgZmFrZUltYWdlcyA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogaW1nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZmFrZUltYWdlcy5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBlcnNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgIHNldFBlcnNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcnNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KTtcclxuXHJcbiIsIlxyXG4vLyDQodC60YDQvtC70Lsg0Log0L3QuNC20L3QtdC5INGB0LXQutGG0LjQuFxyXG4kKCcuZG93bl9hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaGVhZGVyT2Zmc2V0ID0gJCgnLnNjcm9sbF9zZWMnKS5vZmZzZXQoKS50b3A7XHJcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiBoZWFkZXJPZmZzZXRcclxuICAgIH0sIDEwMDApO1xyXG59KTtcclxuXHJcbi8vINCh0LrRgNC+0LvQuyDQuiDQstC10YDRhdGDINGB0YLRgNCw0L3QuNGG0YtcclxuJCgnLnVwX2Fycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgIH0sIDUwMCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIi8vc2xpZGVyX193b3Jrcy0tLS0tLS0tLS0tLVxyXG5cclxudmFyIHNsaWRlckNvbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFNsaWRlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgICAgICB2YXIgbmV4dEJ0biA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGUtcHJldi1idXQnKSxcclxuICAgICAgICAgICAgcHJldkJ0biA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGUtbmV4dC1idXQnKSxcclxuICAgICAgICAgICAgaXRlbXMgPSBuZXh0QnRuLmZpbmQoJy5qcy1zbGlkZXItaXRlbScpLFxyXG4gICAgICAgICAgICBkaXNwbGF5ID0gY29udGFpbmVyLmZpbmQoJy5qcy1zbGlkZXItc2NyZWVuJyksXHJcbiAgICAgICAgICAgIHRpdGxlID0gY29udGFpbmVyLmZpbmQoJy5qcy1zbGlkZXItdGl0bGUnKSxcclxuICAgICAgICAgICAgc2tpbGxzID0gY29udGFpbmVyLmZpbmQoJy5qcy1zbGlkZXItdGVobm9sb2d5ZXMnKSxcclxuICAgICAgICAgICAgbGluayA9IGNvbnRhaW5lci5maW5kKCcuanMtc2xpZGVyLXNpdGUtbGluaycpLFxyXG4gICAgICAgICAgICBpdGVtc0xlbmd0aCA9IGl0ZW1zLmxlbmd0aCxcclxuICAgICAgICAgICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgdGltZW91dDtcclxuXHJcbiAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIGdlbmVyYXRlTWFya3VwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBuZXh0QnRuLmZpbmQoJy5qcy1zbGlkZXItbGlzdCcpLFxyXG4gICAgICAgICAgICAgICAgbWFya3VwcyA9IGxpc3QuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHByZXZCdG5cclxuICAgICAgICAgICAgICAgIC5hcHBlbmQobWFya3VwcylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtc2xpZGVyLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUtdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgLmVxKCQodGhpcykuY291bnRlciArIDEpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZS10aHVtYicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBnZXREYXRhQXJyYXlzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YU9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHBpY3M6IFtdLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2tpbGxzOiBbXSxcclxuICAgICAgICAgICAgICAgIGxpbms6IFtdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goaXRlbXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YU9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5waWNzXHJcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goJHRoaXMuZGF0YSgnZnVsbCcpKTtcclxuICAgICAgICAgICAgICAgIGRhdGFPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAudGl0bGVcclxuICAgICAgICAgICAgICAgICAgICAucHVzaCgkdGhpcy5kYXRhKCd0aXRsZScpKTtcclxuICAgICAgICAgICAgICAgIGRhdGFPYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAuc2tpbGxzXHJcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goJHRoaXMuZGF0YSgnc2tpbGxzJykpO1xyXG4gICAgICAgICAgICAgICAgZGF0YU9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIC5saW5rXHJcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goJHRoaXMuZGF0YSgnbGluaycpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YU9iamVjdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgc2xpZGVJbkxlZnRCdG4gPSBmdW5jdGlvbiAoc2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShzbGlkZSAtIDEpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZS10aHVtYicpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlSXRlbVxyXG4gICAgICAgICAgICAgICAgLnN0b3AodHJ1ZSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtXHJcbiAgICAgICAgICAgICAgICAuc3RvcCh0cnVlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCUnXHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUtdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RvcCcsICctMTAwJScpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlSW5SaWdodEJ0biA9IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBwcmV2QnRuLmZpbmQoJy5qcy1zbGlkZXItaXRlbScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLmFjdGl2ZS10aHVtYicpLFxyXG4gICAgICAgICAgICAgICAgcmVxU2xpZGUgPSBzbGlkZSArIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVxU2xpZGUgPiBpdGVtc0xlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHJlcVNsaWRlID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlcUl0ZW0gPSBpdGVtcy5lcShyZXFTbGlkZSk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtXHJcbiAgICAgICAgICAgICAgICAuc3RvcCh0cnVlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnLTEwMCUnXHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtXHJcbiAgICAgICAgICAgICAgICAuc3RvcCh0cnVlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCUnXHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUtdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RvcCcsICcxMDAlJylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBjaGFuZ2VNYWluUGljdHVyZSA9IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBkaXNwbGF5LmZpbmQoJy5qcy1zbGlkZXItc2NyZWVuLWltZycpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGdldERhdGFBcnJheXMoKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlXHJcbiAgICAgICAgICAgICAgICAuc3RvcCh0cnVlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoZHVyYXRpb24gLyAyLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UuYXR0cignc3JjJywgZGF0YS5waWNzW3NsaWRlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5mYWRlSW4oZHVyYXRpb24gLyAyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBjaGFuZ2VUZXh0RGF0YSA9IGZ1bmN0aW9uIChzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGdldERhdGFBcnJheXMoKTtcclxuXHJcbiAgICAgICAgICAgIGF2aWF0aXRsZS5nZW5lcmF0ZShkYXRhLnRpdGxlW3NsaWRlXSwgdGl0bGUsICdydScpO1xyXG5cclxuICAgICAgICAgICAgYXZpYXRpdGxlLmdlbmVyYXRlKGRhdGEuc2tpbGxzW3NsaWRlXSwgc2tpbGxzLCAnZW4nKTtcclxuXHJcbiAgICAgICAgICAgIGxpbmsuYXR0cignaHJlZicsIGRhdGEubGlua1tzbGlkZV0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZ2V0RGF0YUFycmF5cygpO1xyXG5cclxuICAgICAgICAgICAgZ2VuZXJhdGVNYXJrdXBzKCk7XHJcblxyXG4gICAgICAgICAgICBuZXh0QnRuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlci1pdGVtJylcclxuICAgICAgICAgICAgICAgIC5lcShfdGhhdC5jb3VudGVyIC0gMSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlLXRodW1iJyk7XHJcblxyXG4gICAgICAgICAgICBwcmV2QnRuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlci1pdGVtJylcclxuICAgICAgICAgICAgICAgIC5lcShfdGhhdC5jb3VudGVyICsgMSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlLXRodW1iJyk7XHJcblxyXG4gICAgICAgICAgICBkaXNwbGF5XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXNsaWRlci1zY3JlZW4taW1nJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBkYXRhLnBpY3NbX3RoYXQuY291bnRlcl0pO1xyXG5cclxuICAgICAgICAgICAgLy8gLy8gdGV4dF9fX2luZm8tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgLy8gY2hhbmdlVGV4dERhdGEoX3RoYXQuY291bnRlcik7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubW92ZVNsaWRlID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhhdC5jb3VudGVyIDwgaXRlbXNMZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhhdC5jb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHByZXY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoYXQuY291bnRlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoYXQuY291bnRlci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGF0LmNvdW50ZXIgPSBpdGVtc0xlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZGlyZWN0aW9uc1tkaXJlY3Rpb25dKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZW91dCAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbiArIDUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzbGlkZUluTGVmdEJ0bihfdGhhdC5jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlSW5SaWdodEJ0bihfdGhhdC5jb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1haW5QaWN0dXJlKF90aGF0LmNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlVGV4dERhdGEoX3RoYXQuY291bnRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXIgPSBuZXcgU2xpZGVyKCQoJy53b3Jrc19fc2xpZGVyJykpO1xyXG4gICAgICAgICAgICBzbGlkZXIuc2V0RGVmYXVsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zbGlkZS1wcmV2LWJ1dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXIubW92ZVNsaWRlKCdwcmV2Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNsaWRlLW5leHQtYnV0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlci5tb3ZlU2xpZGUoJ25leHQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKCcjc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgc2xpZGVyQ29udC5pbml0KCk7XHJcbiAgICB9XHJcbn0pOyJdfQ==
