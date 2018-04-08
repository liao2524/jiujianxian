$(document).ready(function() {
  xuanjiu();
  discountData();
  tavernChange();
  changeAdBox();
  changeActive();
  activityData();
	swiper();
});




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
//活动数据获取
function activityData() {
    $.get('http://localhost:8081/activityData', function(data) {
      var activityData = JSON.parse(data);
      var dataList = activityData.data;
      for (var i = 0; i < dataList.length; i++) {
        var html = '<a href=""><img src="'+dataList[i]+'" alt=""></a>';
        $('.contentTowMain').append(html);
      }
    });
}
//优惠推荐数据获取
function discountData() {
    $.get('http://localhost:8081/discountData', function(data) {
      var discountData = JSON.parse(data);
      var dataList = discountData.data;
      var listCount = dataList.length/6;
      var countLi = 0;
      for (var listIndex = 0; listIndex < listCount; listIndex++) {
          var html_slide = '<div class="swiper-slide">'+
                              '<div class="raceList">'+
                                  '<ul></ul>'+ 
                              '</div>'+
                            '</div>';
          $('.swiper5').append(html_slide);
          creatediscountBox(listIndex,countLi,dataList);
          countLi+=6;
      }
    });
}
//创建一个优惠推荐Box
function creatediscountBox(listIndex,countLi,dataList) {
    for (var i = countLi; i <countLi+6 ; i++) {
          var html_li = '<li>'+
                              '<div class="raceListPic">'+
                                '<a href="">'+
                                 ' <img src="'+dataList[i].imgUrl+'" alt="">'+
                                '</a></div>'+  
                              '<div class="raceListTit">'+
                               ' <a href="">'+dataList[i].title+'</a>'+  
                              '</div>'+
                              '<div>'+
                                '<p>￥'+dataList[i].price+'</p>'+
                              '</div>'+
                              '<div class="raceListTime"><p>剩余:58小时48分钟40秒</p></div>'+
                          '</li>';
      $('.raceList').eq(listIndex).children().append(html_li);
      }
}
//白酒管
function tavernChange() {
  $.get('http://localhost:8081/tavernData', function(data) {
    var tavernData = JSON.parse(data);
    var dataArrays = tavernData.data;

    var loopImgArrs = dataArrays.loopImgArrs;//右边轮播图数据
    for (var i = 0; i < loopImgArrs.length; i++) {
      var html = '<a href=""><img src="'+loopImgArrs[i]+'" alt=""></a>';
      $('.swiper6').eq(i+1).append(html);
    }

    var hotRecomArrs = dataArrays.hotRecomArrs;//热门推荐数据
    for (var j = 0; j < hotRecomArrs.length; j++) {
      var html_hot = '<a href="">'+hotRecomArrs[j]+'</a>';
      $('.hotRecom').append(html_hot);
    }

    var beautyPlace = dataArrays.beautyPlace;//品牌推荐数据
    for (var n = 0; n < beautyPlace.length; n++) {
      var html_brand = '<a href="">'+beautyPlace[n]+'</a>';
      $('.brand').append(html_brand);
    }

    var wineEntryList = dataArrays.wineEntryList;//品牌推荐数据
    for (var m = 0; m <wineEntryList.length; m++) {
          var html_li = '<li>'+
                              '<div class="raceListPic">'+
                                '<a href="">'+
                                 ' <img src="'+wineEntryList[m].imgUrl+'" alt="">'+
                                '</a></div>'+  
                              '<div class="raceListTit">'+
                               ' <a href="">'+wineEntryList[m].des+'</a>'+  
                              '</div>'+
                              '<div class="raceListPrice">'+
                                '<p>￥'+wineEntryList[m].price+'</p>'+
                              '</div>'+
                          '</li>';
      $('.tavernMidRight ul').append(html_li);
      }
  });
}

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
}