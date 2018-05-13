var mySwiper = new Swiper('.main', {
    on: {
        slideChangeTransitionStart: function() {
            var index = this.activeIndex;
            change(index);
        }
    }
});
$('.list li').on('click', function() {
    var index = $(this).index();
    change(index);
    mySwiper.slideTo(index);
});

function change(index) {
    $('.list li').eq(index).addClass('active').siblings().removeClass('active')
};
$('.box').width($('body').width());
$('.box').height($('body').width());

var num = 0;
$('.onePage').children().each(function() {
    num += $(this).height();
});
$('.onePage').css({
    height: num
});
var myIscroll = new IScroll('.swiper-wrapper');
var box = document.querySelector('.box');
box.width = $('body').width();
box.height = $('body').width();
var hb = box.getContext('2d');
var Deg = Math.PI / 180;
var data = [{
    color: '#3AA5FF',
    deg: 120
}, {
    color: '#006600',
    deg: 50
}, {
    color: '#00CC00',
    deg: 30
}, {
    color: '#663300',
    deg: 20
}, {
    color: '#0000CC',
    deg: 10
}, {
    color: '#FFCC00',
    deg: 5
}, {
    color: '#FF3333',
    deg: 5
}, {
    color: '#33FFFF',
    deg: 5
}, {
    color: '#806BCA',
    deg: 20
}, {
    color: '#62C282',
    deg: 10
}, {
    color: '#5CC2AC',
    deg: 15
}, {
    color: '#6BD68E',
    deg: 50
}, {
    color: '#FDAA40',
    deg: 10
}, {
    color: '#A372B4',
    deg: 10
}];
var start = -90;
data.forEach(function(file, i) {
    hb.beginPath();
    var end = start + file.deg;
    hb.moveTo(box.width / 2, box.width / 2);
    hb.arc(box.width / 2, box.width / 2, 100, start * Deg, end * Deg);
    hb.fillStyle = file.color;
    hb.fill();
    start = end;
});
hb.beginPath();
hb.arc(box.width / 2, box.width / 2, 50, -90 * Deg, 360 * Deg);
hb.fillStyle = '#fff';
hb.fill();
hb.beginPath();
hb.fillStyle = '#000';
hb.textAlign = 'center';
hb.textBaseline = 'middle';
hb.font = '22px bold';
hb.fillText('雷神3', box.width / 2, box.width / 2);