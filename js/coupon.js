/*
* @Author: xin87
* @Date:   2016-11-28 16:22:38
* @Last Modified by:   Admin
* @Last Modified time: 2016-12-02 08:41:47
*/
var changeHref;
function getWay(location){
	var arr=location.split(':');
	return arr[1];
}
if(getWay(location.href)=='//localhost'){
	changeHref='192.168.50.130:8002';
}else{
	changeHref='mmb.ittun.com';
}
$(function(){
	//获取数据
	$.ajax({
		type:'get',
		// url:'http://mmb.ittun.com/api/getcoupon',
		url:'http://'+changeHref+'/api/getcoupon',
		dataType:'json',
		success:function(data){
			var html=template('tpl',{data:data.result});		
			$('.content_wrap').html(html);
		}
	});

})