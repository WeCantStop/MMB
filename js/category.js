/*
* @Author: Admin
* @Date:   2016-12-01 16:44:18
* @Last Modified by:   Admin
* @Last Modified time: 2016-12-06 19:58:33
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

	//获取分类标题
	$.ajax({
		type:'get',
		// url:'http://mmb.ittun.com/api/getcategorytitle',
		url:'http://'+changeHref+'/api/getcategorytitle',
		dataType:'json',
		success:function(data){
			var html=template('tpl',{data:data.result});
			$('.content_wrap').html(html);

			//点击分类标题 展开列表
			$('.product_item').each(function(index,el){
				var _this=$(this);
				$(el).find('.product_title').on('click',function(){
					
					_this.find('.product_list_wrap').toggleClass('dn');
					if(_this.hasClass('active')){
						_this.removeClass('active');
					}else{
						_this.addClass('active')
					}
					if(_this.hasClass('border_active')){
						_this.removeClass('border_active');
					}else{
						_this.addClass('border_active');
					}
					
					_this.siblings().removeClass('active').removeClass('border_active');
					_this.siblings().children('.product_list_wrap').addClass('dn');
					
					//获取分类列表				
					$.ajax({
						type:'get',
						// url:'http://mmb.ittun.com/api/getcategory?titleid='+data.result[index].titleId,
						url:'http://'+changeHref+'/api/getcategory?titleid='+data.result[index].titleId,
						dataType:'json',
						success:function(data){
							var temp=template('tp2',{data:data.result});
							$(el).find('.product_list').html(temp);
						}
					})

				})

			})

		}

	})
})









