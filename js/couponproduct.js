/*
* @Author: xin87
* @Date:   2016-11-28 17:28:53
* @Last Modified by:   Admin
* @Last Modified time: 2016-12-02 08:42:09
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
	var id=getId(location.href).couponid;	

	//改变页面文字
	if(id==0){
		$('.yh_header h1').html('肯德基优惠券');
		$('.tit').html('肯德基优惠券');
	}
	if(id==1){
		$('.yh_header h1').html('必胜客优惠券');
		$('.tit').html('必胜客优惠券');
	}	
	if(id==2){
		$('.yh_header h1').html('棒约翰优惠券');
		$('.tit').html('棒约翰优惠券');
	}	
	if(id==3){
		$('.yh_header h1').html('哈根达斯优惠券');
		$('.tit').html('哈根达斯优惠券');
	}	

	// 页面获取数据并加载		
	$.ajax({
		type:'get',
		// url:'http://mmb.ittun.com/api/getcouponproduct?couponid='+id,
		url:'http://'+changeHref+'/api/getcouponproduct?couponid='+id,
		dataType:'json',
		success:function(data){
			var html=template('tpl',{data:data.result});
			$('.content_wrap').html(html);
			var html2=template('tp2',{data:data.result});
			$('.pic_info').html(html2);
			//模态框消失	
			$('.pic_info').on('click',function(){
				$('.prop_screen').addClass('dn');
			})
			//模态框展示
			$('.content .pic').on('click',function(){
				idx=$(this).data('id');
				if(id==1){
					idx=idx-57;
				}
				if(id==2){
					idx=idx-58;
				}
				if(id==3){
					idx=idx-59;
				}
				$('.prop_screen').removeClass('dn');
				$('.pic_info ul').css('left',-idx*200);	
			})

			//左箭头注册事件
			var left=0;
			var idx;
			var length=$('.pic_info ul li').length;
			$('.prop_screen .left').on('click',function(){
				left=parseInt($('.pic_info ul').css('left'));
				if(left>=0){
					$('.pic_info ul').css('left',0);
					idx=0;
				}else{
					idx--;
					$('.pic_info ul').css('left',-idx*200);					
					if(idx<=1){
						idx=1;
					}
				}																	
			})
			//右箭头点击事件
			$('.prop_screen .right').on('click',function(){
				left=parseInt($('.pic_info ul').css('left'));
				if(left<=-(length-1)*200){
					$('.pic_info ul').css('left',-(length-1)*200);
					idx=length-1;
				}else{
					idx++;
					$('.pic_info ul').css('left',-idx*200);	
					if(idx>=length-1){
						idx=length-1;
					}
				}					
			})
		}
	})

	
})