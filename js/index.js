$(document).ready(function() {
	swiper();
    swiper5();      
	xuanjiu();
	changeAdBox();
});

// 初始化swiper
function swiper() {
	var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
    });
    var mySwiper2 = new Swiper ('.swiper-container2', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
    });
	var mySwiper3 = new Swiper ('.swiper-container3', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
    });
    var mySwiper4 = new Swiper ('.swiper-container4', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
    });
}
function swiper5() {
    var mySwiper5 = new Swiper ('.swiper-container5', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination5',
            clickable :true,
          },
    });
    mySwiper5.pagination.$el.addClass('pagination5'); //为分页器增加样式
    
}
//选酒
function xuanjiu() {
	$('.left-menu').hover(function() {
		$(this).children('.menu-content').show();
	}, function() {
		$(this).children('.menu-content').hide();
	});
}

// 内容1切换效果
function changeAdBox() {
	$('.adBox-title').hover(function() {
        $('.adBox-title').removeClass('adBox-title-active');
        $(this).addClass('adBox-title-active');
		$('.adBox-title').removeClass('adBox-list-active');
        $(this).addClass('adBox-list-active');
    	});
}