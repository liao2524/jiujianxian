// 图片放大 
/*使用jqzoom*/
$(function() {
  $(".jqzoom").jqzoom({
    xzoom: 420, //放大图的宽度(默认是 200)
    yzoom: 420, //放大图的高度(默认是 200)
    offset: 10, //离原图的距离(默认是 10)
    position: "right", //放大图的定位(默认是 "right")
    preload: 1
  });
});