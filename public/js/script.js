function roundNum(num) {
  return Math.round(num);
}

$(document).ready(function() {
    //prepare video

    $(window).bind('resize.video', function() {
        $('.video').height($(window).height() - $('header').first().height());
    }).trigger('resize.video');

    $('.video .cont').addClass('visible');

    setTimeout(function() {
        $('.video .sdf, .video .suys, .video .arrow').addClass('visible');
    }, 2000);

    //bg video
    $.backgroundVideo($('#bgVideo'), {
        "align": "centerXY",
        "path": "http://s3-eu-west-1.amazonaws.com/assets.jipio.com/corporate/video/",
        "width": 846,
        "height": 476,
        "filename": "jipioloop",
        "types": ["mp4", "ogg", "webm"]
    });

    //play video
    $('.video .play').click(function() {
        //stop the video
        if (!window.isMobile) {
            $('body').addClass('noscroll').append('<div class="previewer"><div><iframe src="//player.vimeo.com/video/86975957?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><div class="close"></div></div>');

            //pause video
            $('body').addClass('paused');

            $('.previewer').click(function() {
                $('body').removeClass('noscroll');
                $(this).remove();

                //play video back
                $('body').removeClass('paused');
            });
            return false;
        }
    });

    //hide video when tab inactive
    var isActive = true;

    window.onfocus = function() {
        isActive = true;
    };
    window.onblur = function() {
        isActive = false;
    };

    setInterval(function() {
        paused = $('body').hasClass('paused');
        if ((isActive) && (!paused)) {
            $('#video_background').get(0).play();
        } else {
            $('#video_background').get(0).pause();
        }
    }, 500);

    //hide video on scroll
    $(document).scroll(function() {
        if ($(document).scrollTop() > $(window).height() - $('header').first().height() - 50) {
            $('body').addClass('paused');
        } else {
            if ($('body').hasClass('paused')) {
                $('body').removeClass('paused');
            }

            var proportion = 1 - roundNum($(document).scrollTop() / $(window).height());
            var bottomPos = 40 - (40 * roundNum($(document).scrollTop() / $(window).height()));
            $('.video .arrow.visible').attr('style', '-webkit-transition: 0s; -moz-transition: 0s; -ms-transition: 0s; -o-transition: 0s; transition: 0s;bottom:' + bottomPos + 'px;opacity: ' + proportion + '!important');
        }
    });

    $('section.video .control-btn').on('click', function() {
        $.scrollTo($(this).closest('.presenation').next(), {
            axis : 'y',
            duration : 500
        });
        return false;
    });

});
