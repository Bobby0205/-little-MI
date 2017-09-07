$(function () {
    $.ajax({
        url: 'http://localhost:9900/api/nav',
        success: function (data) {
            var navDom = JSON.parse(data);
            $('.header-navs').html(template('topTemp', navDom));
            console.log(data);

        }
    })
    $('.header-navs').on('mouseover', 'li', function () {
        var $this = $(this).attr("type");
        // console.log($this);
        if (!$this) return;
        $('.header-menu').stop().slideDown(500);
        $.ajax({
            url: 'http://localhost:9900/api/nav',
            dataType: 'json',
            data: 'type=' + $this,
            success: function (data) {
                var menuContent = template('menuTemp', data);
                $('.header-menu').html(menuContent);

            }
        })
    })
    $('.header-menu').mouseout(function () {
        $('.header-menu').stop().slideUp(500);
    })
    // 搜索框
    $('.search-ipt').focus(function () {
        $('.header-search').css('borderColor', '#ff6300');
        $('.search-btn').css('border-left-color', '#ff6300');
        $('.hot-word').css('display', 'none');
        $('.search-result').css('display', 'block');
    })
    $('.search-ipt').blur(function () {
        $('.header-search').css('borderColor', '#e0e0e0');
        $('.search-btn').css('border-left-color', '#e0e0e0');
        $('.hot-word').css('display', 'block');
        $('.search-result').css('display', 'none');
    })

    // 左侧导航栏
    $.ajax({
        url: 'http://localhost:9900/api/items',
        dataType: 'json',
        success: function (data) {
            $('.top-side-left').html(template('leftTemp', data));
        }
    })
    // 右侧导航栏
    $('.top-side-left').on('mouseover', 'li', function () {
        var $leftThis = $(this).attr("data-type");
        // $('.site-category-detail').css('display', 'block');
        // console.log($leftThis);
        $.ajax({
            url: 'http://localhost:9900/api/items',
            dataType: 'json',
            data: 'type=' + $leftThis,
            success: function (data) {
                var leftContent = template('rightTemp', data);
                $('.category-items').html(leftContent);
                if ($('.category-goods').length <= 6) {
                    $('.top-banner .site-category-detail ul').css({
                        'width': '265px'
                    })
                } else if ($('.category-goods').length <= 12) {
                    $('.top-banner .site-category-detail ul').css({
                        'width': '530px'
                    })
                } else if ($('.category-goods').length <= 18) {
                    $('.top-banner .site-category-detail ul').css({
                        'width': '795px'
                    })
                }
            }
        })
    })
    $('.site-category').mouseout(function () {
        $('.site-category-detail').hide();
    })
    $('.site-category').mouseover(function () {
        $('.site-category-detail').show();
    })

    // 轮播图部分 
    var spanIndex = 0;
    $.ajax({
        url: 'http://localhost:9900/api/lunbo',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $('.banner').append(template('slideTemp', data))

            $('.top-banner .banner-right').click(function () {
                // console.log($('.slide').length);
                turnRight();
            })
            $('.top-banner .banner-left').click(function () {
                if (spanIndex == 0) {
                    spanIndex = 4;
                } else {
                    spanIndex--;
                }
                var $slide = $('.slide')
                for (var i = 0; i < $('.slide').length; i++) {
                    $('.slide').fadeOut(500);
                }
                $('.slide').eq(spanIndex).fadeIn(500);
            })
            var slideid = setInterval(turnRight, 2000);
            $(".top-banner").on('mouseenter', '.slide', function () {
                clearInterval(slideid);
            })
            $(".top-banner").on('mouseleave', '.slide', function () {
                slideid = setInterval(turnRight, 2000);
            })
        }
    })

    function turnRight() {
        if (spanIndex == 4) {
            spanIndex = 0;
        } else {
            spanIndex++;
        }
        var $slide = $('.slide')
        for (var i = 0; i < $('.slide').length; i++) {
            $('.slide').fadeOut(500);
        }
        $('.slide').eq(spanIndex).fadeIn(500);
    }
    // 轮播图控制


    // 智能硬件部分
    $.ajax({
        url: 'http://localhost:9900/api/hardware',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $('.box-list').html(template('boxsTopTemp', data))
        }
    })
    // 搭配切换部分
    $('.around-container').on('mouseenter', '.goods-top li', function () {
        var spanKey = $(this).attr('data-key');
        // console.log(spanKey);
        $.ajax({
            url: 'http://localhost:9900/api/product',
            dataType: 'json',
            data: 'key=' + spanKey,
            success: function (data) {
                // console.log(data);
                $('.goods-right-content').html(template('qieTemp', data))
            }
        })
    })
    // 配件切换部分
    $('.around-container2').on('mouseenter', '.goods-top li', function () {
        var spanKey = $(this).attr('data-key');
        // console.log(spanKey);
        $.ajax({
            url: 'http://localhost:9900/api/product',
            dataType: 'json',
            data: 'key=' + spanKey,
            success: function (data) {
                // console.log(data);
                $('.goodsRight2').html(template('qieTemp', data))
            }
        })
    })

    // 周边切换部分
    $('.around-container3').on('mouseenter', '.goods-top li', function () {
        var spanKey = $(this).attr('data-key');
        // console.log(spanKey);
        $.ajax({
            url: 'http://localhost:9900/api/product',
            dataType: 'json',
            data: 'key=' + spanKey,
            success: function (data) {
                // console.log(data);
                $('.goodsRight3').html(template('qieTemp', data))
            }
        })
    })
    // 搭配部分
    $.ajax({
        url: 'http://localhost:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'match'
        },
        success: function (data) {
            // console.log(data);
            $('.around-container').html(template('goodsTemp', data))
            $('.top-sub li:first-of-type').addClass('active');
            $('.top-sub').on('mouseover', 'li', function () {

                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            })
        }
    })

    // 配件部分
    $.ajax({
        url: 'http://localhost:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'accessories'
        },
        success: function (data) {
            // console.log(data);
            $('.around-container2').html(template('goods2Temp', data))
            $('.top-sub li:first-of-type').addClass('active');
            $('.top-sub').on('mouseover', 'li', function () {

                $(this).siblings().removeClass('active');
                $(this).addClass('active');

            })
        }
    })

    // 周边部分
    $.ajax({
        url: 'http://localhost:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'around'
        },
        success: function (data) {
            // console.log(data);
            $('.around-container3').html(template('goods3Temp', data))
            $('.top-sub li:first-of-type').addClass('active');
            $('.top-sub').on('mouseover', 'li', function () {

                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            })
        }
    })

    // 为你推荐部分
    $.ajax({
        url: 'http://localhost:9900/api/recommend',
        dataType: 'json',
        data: {
            page: 1
        },
        success: function (data) {
            console.log(data);
            $('.recommend-content').html(template('tuiTemp', data))
        }
    })

    $.ajax({
        url: 'http://localhost:9900/api/recommend',
        dataType: 'json',
        data: {
            page: 2
        },
        success: function (data) {
            console.log(data);
            $('.recommend-content').append(template('tuiTemp', data))
        }
    })

    $.ajax({
        url: 'http://localhost:9900/api/recommend',
        dataType: 'json',
        data: {
            page: 3
        },
        success: function (data) {
            console.log(data);
            $('.recommend-content').append(template('tuiTemp', data))
        }
    })

    $.ajax({
        url: 'http://localhost:9900/api/recommend',
        dataType: 'json',
        data: {
            page: 4
        },
        success: function (data) {
            console.log(data);
            $('.recommend-content').append(template('tuiTemp', data))
        }
    })

    // 为你推荐右边控制
    var conIndex = 0;
    $('.control-right').click(function () {
        conIndex++;
        if (conIndex > 3) {
            $('.icon-arrow-right').addClass('disabled');
            return;
        } else {
            console.log(conIndex)
            $('.recommend-content').css({
                "margin-left": (conIndex * -1224) + "px",
                "transition": "all .3s"
            })
        }
    })

    // 为你推荐左边控制
    $('.control-left').click(function () {
        if (conIndex == 0) {
            $('.icon-arrow-left').addClass('disabled');
            return;
        } else {
            conIndex--;
            console.log(conIndex)
            $('.recommend-content').css({
                "margin-left": (conIndex * -1224) + "px",
                "transition": "all .3s"
            })
        }
    })

    // 热评产品部分
    $.ajax({
        url: 'http://localhost:9900/api/hotcomment',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('.hot-content').html(template('hotTemp', data))
        }
    })

    // 内容部分
    $.ajax({
        url: 'http://127.0.0.1:9900/api/content',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var contentMoban = template('contentMoban', data);
            // console.log(contentMoban);
            $('#content aside').html(contentMoban);

            for (var k = 0; k < $('#content aside li').length; k++) {
                (function (k) {
                    var contentIndex = 0;
                    for (var i = 0; i < 4; i++) {
                        $('#content aside li').eq(k).find('s').eq(i).attr('data-index', i)
                    }
                    //点击向右
                    $('#content aside li').eq(k).find('.turnRight').click(function () {
                        if (contentIndex < 3) {
                            contentIndex++;
                            $('#content aside li').eq(k).find('.bigBox').css({
                                'transform': 'translateX(-' + 295 * (contentIndex) + 'px)',
                                'transition': 'all .5s'
                            })
                            var s = $('#content aside li').eq(k).find('s');
                            s.eq(contentIndex - 1).removeClass('sChange');
                            s.eq(contentIndex).addClass('sChange');
                        }
                    })
                    //点击向左
                    $('#content aside li').eq(k).find('.turnLeft').click(function () {
                        if (contentIndex > 0) {
                            contentIndex--;
                            $('#content aside li').eq(k).find('.bigBox').css({
                                'transform': 'translateX(-' + 295 * (contentIndex) + 'px)',
                                'transition': 'all .5s'
                            })
                            var s = $('#content aside li').eq(k).find('s');
                            s.eq(contentIndex + 1).removeClass('sChange');
                            s.eq(contentIndex).addClass('sChange');
                        }
                    })
                    // 小圆点
                    $('#content aside li').eq(k).find('s').click(function () {
                        for (var j = 0; j < $('#content aside li').eq(k).find('s').length; j++) {
                            $('#content aside li').eq(k).find('s').removeClass('sChange');
                            $(this).addClass('sChange');
                            var sIndex = $(this).attr('data-index');
                            $('#content aside li').eq(k).find('.bigBox').css({
                                'transform': 'translateX(-' + 295 * (sIndex) + 'px)',
                                'transition': 'all .5s'
                            })
                        }
                        contentIndex = sIndex;
                    })
                })(k);
            };
        }
    })
    // 内容部分右边控制

    // 视频部分
    $.ajax({
        url: 'http://localhost:9900/api/video',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('.video-list').html(template('videoTemp', data))
        }
    })
})