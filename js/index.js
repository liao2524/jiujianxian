$(document).ready(function() {
	swiper();
	swiper2();
});

// 初始化wiper
function swiper() {
	var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        
        pagination: {
          el: '.swiper-pagination',
        },
    });
}
function swiper2() {
	var mySwiper = new Swiper ('.swiper-container2', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
    });
}