var language = navigator.language || navigator.browserLanguage;

$(function() {
    $('#page').mCustomScrollbar({
        theme: 'minimal',
        mouseWheelPixels: 200,
        scrollInertia: 400
    });

    $('#about-link').click(function() {
        setHistoryState('about');
    });
    $('#music-link').click(function() {
        setHistoryState('music');
    });
    $('#foto-link').click(function() {
        setHistoryState('foto');
    });
    $('#contact-link').click(function() {
        setHistoryState('contact');
    });

    $(window).load(function() {
        setTimeout(function() {
        $('body').fadeIn('slow', function() {
            if (window.location.hash != null) {
                goToHash();
            }
        });
        }, 250);
    });
});

function scrollToElement(element) {
    $('#page').mCustomScrollbar('scrollTo', $(element).offset().top, {
        scrollInertia: 600,
        scrollEasing: 'easeInOut'
    });
}

function setHistoryState(url) {
    if (history.pushState) {
        history.pushState(null, null, '#' + url);
        goToHash();
    }
}

function goToHash() {
    var hash = window.location.hash;
    switch(hash) {
        case '#about':
            scrollToElement($('#about'));
            break;
        case '#music':
            scrollToElement($('#music'));
            break;
        case '#foto':
            scrollToElement($('#foto'));
            break;
        case '#contact':
            scrollToElement($('#contact'));
            break;
        default:
            break;
    }
}

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };