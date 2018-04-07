var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));


// 一个范围的随机数 0，6 包括6
function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

// 轮播图
var loopImgArrs = [
	'http://img08.jiuxian.com/bill/2018/0327/9eccdbcce1244ebf9a711cc04f242a62.jpg',
	'http://img09.jiuxian.com/bill/2018/0331/f1051f9aa9424801b9c514807d2023e7.jpg',
	'http://img08.jiuxian.com/bill/2018/0331/28ccc25274f742478bea729a85ea9959.jpg',
	'http://img06.jiuxian.com/bill/2018/0326/8409e04ca94e4957a7722a2963a6b92e.jpg',
	'http://img07.jiuxian.com/bill/2018/0330/c4ed45a6c2034495be55ef28650adebd.jpg',
	'http://img09.jiuxian.com/bill/2018/0326/32621d26d564452ea1111bc86f14dff4.jpg'
];

// 轮播右边提示的图片
var loopPrompImgArrs = [
	'http://img10.jiuxian.com/bill/2017/1127/b5bb8b4be445443094e894fdb4abb9b6.jpg',
	'http://img06.jiuxian.com/bill/2017/1115/df8f4e868bec46fdbcb967a9e5ef8a49.png',
	'http://img06.jiuxian.com/bill/2017/1115/df8f4e868bec46fdbcb967a9e5ef8a49.png',
	'http://img09.jiuxian.com/bill/2017/1124/7b1a1bf0d96e4bb0b756b1f249aed0c1.png',
	'http://img10.jiuxian.com/bill/2017/1115/31ff2840b8084acf9bb4ee6b94ae4b0c.png',
	'http://img10.jiuxian.com/bill/2017/1127/b5bb8b4be445443094e894fdb4abb9b6.jpg'
];

//item 切换的内容
var multiItemImgArrs = [
	'http://img06.jiuxian.com/2017/0105/278b55960b474dffa34479d2c67277f22.jpg',
	'http://img07.jiuxian.com/2014/0605/6fe09906c6274a6bae38dcc006d7dbe32.jpg',
	'http://img08.jiuxian.com/2017/1018/43fb011b99ba4630a07817e05e6b4fac2.jpg',
	'http://img09.jiuxian.com/2016/0331/03c13aa80c9c4dc0b9a5a6c72b04b7752.jpg',
	'http://img06.jximage.com/2015/0706/547035d5b46a4ace9071ed22c6dfaa4b2.jpg'
];

var priceArrs = [100, 200, 300, 400, 500];

function LoopEntry(){

}

LoopEntry.prototype = {
	loopImgUrl:'',
	loopPromptImgArrs:''

};


function createBaseJsonTxt(dataValue) {
	var baseData = {
		code:200,
		message:'success'
	};

	baseData.data = dataValue;
	var baseDataJsonTxt = JSON.stringify(baseData);
	return baseDataJsonTxt;
}		


app.listen(8081, 'localhost',function(){
	console.log('来了没');
});


//轮播图数据接口
app.get('/loopDataList', function(req, response){

	//创建轮播图的数据
	var random = rnd(3, 6);
	var loopDataArrs = new Array();
	for(var i=0; i<random; i++){
		var loopEntry = new LoopEntry();
		loopEntry.loopImgUrl = loopImgArrs[i%loopImgArrs.length];

		var loopPromptArrs = new Array();
		for(var j=0; j<3; j++){
			loopPromptArrs.push(loopPrompImgArrs[i%loopImgArrs.length]);
		}

		loopEntry.loopPromptImgArrs = loopPromptArrs;

		loopDataArrs.push(loopEntry);

	}

	var baseDataJsonTxt = createBaseJsonTxt(loopDataArrs);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});
	response.write(baseDataJsonTxt);
	response.end();
});

//多类型数据接口
app.get('/mulCategoryData', function(req, response){

	var categorys = ['疯狂抢购','整箱优惠','爆款精选','口粮钜惠','大牌特卖'];

	var entryNameArrs = ['【清仓】52°贵州茅台集团封坛1992铂金版500ml',
						'52°五粮液股份公司金六福双福星475ml（6瓶装）',
						'【超级秒杀日】52°白水杜康一坛老酒1000ml（双坛装）',
						'53°玻瓶汾酒475ml（3瓶装）',
						'53°汾酒商务蓝475ml'];
	

	var multiCatEntryList = new Array();

	for(var i=0; i<categorys.length; i++){

		var categoryEntryList = new Array();
		var multiCategroryEntry = new Object();
		for(var j=0; j<10; j++){

			// var categoryEntry = new Object();

			// categoryEntry.imgUrl = multiItemImgArrs[(i%(multiItemImgArrs.length - 1))];
			// categoryEntry.des = entryNameArrs[(i%entryNameArrs.length)];
			// categoryEntry.price = priceArrs[(i%priceArrs.length)];
			var categoryEntry = createWineEntry(multiItemImgArrs[(i%(multiItemImgArrs.length - 1))],
							entryNameArrs[(i%entryNameArrs.length)],
							priceArrs[(i%priceArrs.length)]);
			categoryEntryList.push(categoryEntry);
		}

		multiCategroryEntry.name = categorys[i%(categorys.length - 1)];
		multiCategroryEntry.categoryEntryList = categoryEntryList;

		multiCatEntryList.push(multiCategroryEntry);

	}
	
	var baseDataJsonTxt = createBaseJsonTxt(multiCatEntryList);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});
	response.write(baseDataJsonTxt);
	response.end();
});

function createWineEntry(wineImgUrl, wineTitle, winePrice) {
	var categoryEntry = new Object();
    categoryEntry.imgUrl = wineImgUrl;
    categoryEntry.des = wineTitle;
    categoryEntry.price = winePrice;

    return categoryEntry;
}

//活动数据接口
app.get('/activityData', function(req, response) {

    //活动的地址列表
    var discountsImgArrs = [
        'http://img10.jiuxian.com/bill/2018/0402/1b328edb7e264426b095e26e5c8b82bb.png',
        'http://img10.jiuxian.com/bill/2018/0403/4ca3451bc91a41a79975b92a04038476.png',
        'http://img08.jiuxian.com/bill/2018/0326/4f635c7dd88c4e99a8b93338d3cb8b51.png'
    ];
    var baseDataJsonTxt = createBaseJsonTxt(discountsImgArrs);

    response.writeHead(200, {
        'Content-Type': "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    response.write(baseDataJsonTxt);
    response.end();
});


//推荐数据接口
app.get('/discountData', function(req, response) {

    //活动的地址列表
    //优惠推荐图片数组
    var discountsImgArrs = [
        'http://img09.jximage.com/2017/0317/38cf9dfd1f3a4b3bb95a19f3f72a1b002.jpg',
        'http://img09.jximage.com/2017/0227/31f189c611994d0984c88620a059b6b82.jpg',
        'http://img09.jximage.com/2018/0123/31a0cfca47fa4ef285a4dd965567a4232.jpg'
    ];

    var titleArrs = ['42°汾酒集团优级杏花村500ml',
        '42°汾酒集团优级杏花村500ml',
        '42°汾酒集团优级杏花村500ml'
    ];


    var random = rnd(2, 3);
    var dataSize = 6 * random;
    var currTimeMill = new Date().getTime();
    var entryList = new Array();
    for (var i = 0; i < dataSize; i++) {
        var discountEntry = new Object();
        discountEntry.imgUrl = discountsImgArrs[i % discountsImgArrs.length];
        discountEntry.title = titleArrs[i % titleArrs.length];
        discountEntry.price = priceArrs[i % priceArrs.length];

        //随机一个或两个小时
        var hourRandom = rnd(1, 2);
        console.log(hourRandom);
        discountEntry.restTime =  currTimeMill + (hourRandom * 60 * 60 * 1000);
        entryList.push(discountEntry);
    }


    var baseDataJsonTxt = createBaseJsonTxt(entryList);

    response.writeHead(200, {
        'Content-Type': "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    response.write(baseDataJsonTxt);
    response.end();
});

//酒馆数据接口
app.get('/tavernData', function(req, response) {

   	var imgUrlArrs = ['http://img07.jiuxian.com/2016/1018/353f92b2a5bb429bbb62a52d06a334172.jpg',
   					  'http://img07.jiuxian.com/2017/1206/78bf986293d94cd1987f24702efd88962.jpg',
   					  'http://img07.jiuxian.com/2018/0119/6dd1803ef5fc4236821d487d444f830f2.jpg'];
   	var titleArrs = ['【清仓】53°茅台集团国隆酱酒500ml',
   					 '52°汾酒集团帝王黄封坛原酒475ml（6瓶装）',
   					 '52°泸州老窖三人炫1000ml（双瓶装）+52°泸州老窖三人炫100ml+手提袋'];
   	var priceArrs = [59.00, 199.00, 208.00];

    var tavernEntry = new Object();
    tavernEntry.title = '白酒馆';
    tavernEntry.categoryArrs = ['贵州',
    							'四川',
    							'山西',
    							'北京',
    							'江苏',
    							'山东',
    							'安徽'];
   	tavernEntry.loopImgArrs = ['http://img06.jiuxian.com/bill/2018/0316/51ad130653cd4ffb98dabfe8465b9cfa.jpg'];
   	tavernEntry.hotRecomArrs = ['整箱够', '婚庆用酒', '大坛专场'];
   	tavernEntry.beautyPlace = ['茅台', '五粮液', '剑南春', '汾酒', '郎酒', '泸州老窖'];


   	var wineEntryList = new Array();
   	for(var i=0; i<10; i++){
   		var wineEntry = createWineEntry(imgUrlArrs[i%imgUrlArrs.length],
   						titleArrs[i%titleArrs.length],
   						priceArrs[i%priceArrs.length]);

   		if(0 === i){
   			wineEntry.activeType = '清仓特卖';
   		} else if(9 === i){
   			wineEntry.activeType = '立减100';
   		} else{
   			wineEntry.activeType = '';
   		}

   		wineEntryList.push(wineEntry);
   	}

   	tavernEntry.wineEntryList = wineEntryList;


    var baseDataJsonTxt = createBaseJsonTxt(tavernEntry);

    response.writeHead(200, {
        'Content-Type': "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    response.write(baseDataJsonTxt);
    response.end();
});

//酒详情界面
app.get('/wineDetail', function(req, response) {


    var wineId = req.query.wineId;
    console.log(wineId);
    var baseDataJsonTxt;


    if(undefined === wineId){
      var baseData = {
        code:200,
        message:'success'
      };

      baseData.code = 50;
      baseData.message = '没有wineId参数';
      baseData.data = '';

      baseDataJsonTxt = JSON.stringify(baseData);

    } else if('010004047' === wineId){
      var imgBigArrs = ['http://img08.jiuxian.com/2014/0425/f732953497c34dfb86c74ef7c4cc237b6.jpg', 
                        'http://img08.jiuxian.com/2014/0327/b996cf45203544aca0a6c0e7e609a7f96.jpg', 
                        'http://img06.jiuxian.com/2014/0327/baa466226f0243f696b0b28a5c7046166.jpg', 
                        'http://img10.jiuxian.com/2014/0327/e7a427b14f214ef5801ba650579730346.jpg'];

      var imgListArrs = ['http://img09.jiuxian.com/2014/0425/f732953497c34dfb86c74ef7c4cc237b1.jpg', 
                        'http://img07.jiuxian.com/2014/0327/b996cf45203544aca0a6c0e7e609a7f91.jpg', 
                        'http://img07.jiuxian.com/2014/0327/baa466226f0243f696b0b28a5c7046161.jpg', 
                        'http://img06.jiuxian.com/2014/0327/e7a427b14f214ef5801ba650579730341.jpg'];

      var title = '53°青花20汾酒500ml';
      var desc = '醇柔汾酒 清香飘远 低价实惠';
      var disconutPrice = 388.00;
      var clubPrice = 385.00;
      var discountDescArrs = ['抄底价', '汾酒特卖'];
      var accumuNum = 70676;
      var evaluGrade = '5.0';
      var goldNum = 194;
      var selecteCategory = ['53°青花20汾酒500ml', '53°青花20汾酒500ml'];
      var isUseDiscount = false;

      var wineDetailEntry = new Object();
      wineDetailEntry.wineId = wineId;
      wineDetailEntry.imgBigArrs = imgBigArrs;
      wineDetailEntry.imgListArrs = imgListArrs;
      wineDetailEntry.title = title;
      wineDetailEntry.desc = desc;
      wineDetailEntry.disconutPrice = disconutPrice;
      wineDetailEntry.clubPrice = clubPrice;
      wineDetailEntry.discountDescArrs = discountDescArrs;
      wineDetailEntry.accumuNum = accumuNum;
      wineDetailEntry.evaluGrade = evaluGrade;
      wineDetailEntry.goldNum = goldNum;
      wineDetailEntry.selecteCategory = selecteCategory;
      wineDetailEntry.isUseDiscount = isUseDiscount;

      baseDataJsonTxt = createBaseJsonTxt(wineDetailEntry);

    } else{

      var baseData = {
        code:200,
        message:'success'
      };

      baseData.code = 51;
      baseData.message = '商品信息不对';
      baseData.data = '';

      baseDataJsonTxt = JSON.stringify(baseData);

    }
   

    response.writeHead(200, {
        'Content-Type': "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    response.write(baseDataJsonTxt);
    response.end();
});



//购物车列表界面 暂时只提供两个商品
app.get('/shopCar', function(req, response) {


    var wineId = '010004047';
    var imgUrl = 'https://img10.jiuxian.com/2014/0425/f732953497c34dfb86c74ef7c4cc237b4.jpg';
    var title = '53°青花20汾酒500ml';
    var desc = '醇柔汾酒 清香飘远 低价实惠';
    var disconutPrice = 388.00;
    var clubPrice = 385.00;
    var discountDescArrs = ['抄底价', '汾酒特卖'];
    var accumuNum = 70676;
    var evaluGrade = '5.0';
    var goldNum = 194;
    var selecteCategory = ['53°青花20汾酒500ml', '53°青花20汾酒500ml'];
    var isUseDiscount = false;

    var shopCarEntry = new Object();
    shopCarEntry.wineId = wineId;
    shopCarEntry.imgUrl = imgUrl;
    shopCarEntry.title = title;
    shopCarEntry.desc = desc;
    shopCarEntry.disconutPrice = disconutPrice;
    shopCarEntry.clubPrice = clubPrice;
    shopCarEntry.discountDescArrs = discountDescArrs;
    shopCarEntry.accumuNum = accumuNum;
    shopCarEntry.evaluGrade = evaluGrade;
    shopCarEntry.goldNum = goldNum;
    shopCarEntry.selecteCategory = selecteCategory;
    shopCarEntry.isUseDiscount = isUseDiscount;

    wineId = 'tz000624';
    imgUrl = 'https://img10.jiuxian.com/2016/0331/03c13aa80c9c4dc0b9a5a6c72b04b7754.jpg';
    title = '53°玻瓶汾酒475ml（3瓶装）';
    desc = '醇柔汾酒 清香飘远 低价实惠';
    disconutPrice = 120.00;
    clubPrice = 119.99;
    discountDescArrs = ['抄底价', '汾酒特卖'];
    accumuNum = 70676;
    evaluGrade = '5.0';
    goldNum = 60;
    selecteCategory = ['53°青花20汾酒500ml', '53°青花20汾酒500ml'];
    isUseDiscount = false;


    var otherEntry = new Object();
    otherEntry.wineId = wineId;
    otherEntry.imgUrl = imgUrl;
    otherEntry.title = title;
    otherEntry.desc = desc;
    otherEntry.disconutPrice = disconutPrice;
    otherEntry.clubPrice = clubPrice;
    otherEntry.discountDescArrs = discountDescArrs;
    otherEntry.accumuNum = accumuNum;
    otherEntry.evaluGrade = evaluGrade;
    otherEntry.goldNum = goldNum;
    otherEntry.selecteCategory = selecteCategory;
    otherEntry.isUseDiscount = isUseDiscount;

    var shopCarEntryList = new Array();
    shopCarEntryList.push(shopCarEntry);
    shopCarEntryList.push(otherEntry);

    var baseDataJsonTxt = createBaseJsonTxt(shopCarEntryList);

    response.writeHead(200, {
        'Content-Type': "text/html; charset=utf-8",
        'Access-Control-Allow-Origin': '*'
    });
    response.write(baseDataJsonTxt);
    response.end();
});


//注册接口 四个参数cellphone vertiCode messageVertiCode password
app.post('/register', function(req, response){

  var cellphone = req.body.cellphone;
  var vertiCode = req.body.vertiCode;
  var messageVertiCode = req.body.messageVertiCode;
  var password = req.body.password;
  
  var registerEntry = new Object();
  registerEntry.cellphone = cellphone;
  registerEntry.name = '我是谁';
  
  var baseDataJsonTxt = createBaseJsonTxt(registerEntry);

  response.writeHead(200, {
    'Content-Type':"text/html; charset=utf-8",
    'Access-Control-Allow-Origin':'*'
  });
  response.write(baseDataJsonTxt);
  response.end();
});
//登录接口
// 三个参数 username password vertiCode
app.post('/login', function(req, response){

  console.log(req.body.username);
  var username = req.body.username;
  var password = req.body.password;
  var vertiCode = req.body.vertiCode;
  
  var baseData = {
    code:200,
    message:'success'
  };


  if('18923701111' === username){

    if('123456' === password) {

      var loginEntry = new Object();
      loginEntry.username = username;
      loginEntry.nickname = '我是谁?';
      loginEntry.token = 'xagdadada';

      baseData.data = loginEntry;

    } else{
        baseData.code = 41;
        baseData.message = '密码不正确';
        baseData.data = '';
    }

  } else{
    baseData.code = 40;
    baseData.message = '账号不正确';
    baseData.data = '';
  }

  
  var baseDataJsonTxt = JSON.stringify(baseData);

  response.writeHead(200, {
    'Content-Type':"text/html; charset=utf-8",
    'Access-Control-Allow-Origin':'*'
  });
  response.write(baseDataJsonTxt);
  response.end();
});