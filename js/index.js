$(document).ready(function() {
	swiper();
	xuanjiu();
	changeAdBox();
  changeActive();
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


    var mySwiper5 = new Swiper ('.swiper-container5', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination5',
          clickable :true,
          type: 'custom',
          bulletClass : 'pagination5-answered',
          bulletActiveClass: 'pagination5-active',
          renderCustom: function (swiper, current, total) {
                    var _html = '';
                                for (var i = 1; i <= total; i++) {
                                  if (current == i) {
                                    _html += '<span class="pagination5-answered pagination5-active">'  + '</span>';
                                  }else{
                                    _html += '<span class="pagination5-answered">'  + '</span>';
                                  }
                                }
                                return _html;//返回所有的页码html
                  }
        },
    });
    mySwiper5.pagination.$el.addClass('pagination5'); //为分页器增加样式



    var mySwiper6 = new Swiper ('.swiper-container6', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination6',
          clickable :true,
          type: 'custom',
          bulletClass : 'pagination6-answered',
          bulletActiveClass: 'pagination6-active',
          renderCustom: function (swiper, current, total) {
                    var _html = '';
                                for (var i = 1; i <= total; i++) {
                                  if (current == i) {
                                    _html += '<span class="pagination6-answered pagination6-active">' +1+ '</span>';
                                  }else{
                                    _html += '<span class="pagination6-answered">' +2+ '</span>';
                                  }
                                }
                                return _html;//返回所有的页码html
                  }
        },
    });
    mySwiper6.pagination.$el.addClass('pagination6'); //为分页器增加样式



/*    var mySwiper7 = new Swiper ('.swiper-container7', {
        loop: true,
        pagination: {
          el: '.swiper-pagination7',
          clickable :true,
          type: 'custom',
          bulletElement : 'li',
          bulletClass : 'pagination6-answered',
          bulletActiveClass: 'pagination6-active',
          renderCustom: function (swiper, current, total) {
                    var _html = '';
                                for (var i = 1; i <= total; i++) {
                                  if (current == 1) {
                                    _html += '<li class="pagination7-active"><a href="#nogo">' +i+ '</a> <span>|</span>';
                                  }else{
                                    _html += '<li class="pagination7-active"><a href="#nogo">' +i+ '</a> <span>|</span>';
                                  }
                                }
                                return _html;//返回所有的页码html
                  }
        },
    });
    mySwiper6.pagination.$el.addClass('pagination7'); //为分页器增加样式*/
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
// 白酒管的排行榜切换效果
function changeActive() {
    $('.pagination7').hover(function() {
        var index = $(this).index();
        $('.pagination7').removeClass('active');
        $(this).addClass('active');
        $('.typeList').removeClass('active') ;
        $('.typeList').eq(index).addClass('active');
    }); 
}
function getData() {
    
}
