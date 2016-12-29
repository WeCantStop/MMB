/*
* @Author: Admin
* @Date:   2016-12-01 22:14:01
* @Last Modified by:   Admin
* @Last Modified time: 2016-12-06 20:22:34
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
	function request(id1,id2,id3,fn){
		$.ajax({
			type:'get',
			url:'http://'+changeHref+'/api/getproductlist?categoryid='+id1+'&pageid='+id2+'&category='+id3,
			// url:'http://mmb.ittun.com/api/getproductlist?categoryid='+id1+'&pageid='+id1+'&category='+id3,
			dataType:'json',
			success:function(data){
				console.log(data.result);
				var html=template('tpl',{data:data.result});
				$('.content_wrap').html(html);
				if(fn){
					fn(data);
				}
				var needs=document.querySelectorAll('.need');
				var header_title=document.querySelector('.header_title')
				console.log(needs)
				for(var i = 0 ;i<needs.length;i++){
					needs[i].href+=needs[i].href+header_title.innerHTML;
				}
			}
		})
	}
	var categoryid=getId(location.href).categoryid;
	var pageid=getId(location.href).pageid;
	var category=getId(decodeURI(location.href)).category;
	var max=0;
	$('.header_title').html(category);
	//初始化页面
	request(categoryid,pageid,category,function(data){
		var arr=[];
		max=Math.ceil(data.totalCount/data.pagesize);
		for(var i=1;i<=max;i++){
			if(i==1){
				arr[i]='<option value="'+i+'" selected="selected">'+i+'/'+max+'</option>';
			}else{
				arr[i]='<option value="'+i+'">'+i+'/'+max+'</option>';
			}	
		}
		var str=arr.join('');
		$('.select').html(str);					
	});
	
	$('.select option:nth-child('+pageid+')').attr('selected','selected');


	// 上一页按钮功能
	$('.prev').on('click',function(){
		
		if(pageid<=1){
			pageid=1;
			return;
		}
		pageid--;
		//$('.select option:nth-child('+pageid+')').attr('selected','selected').siblings().removeAttr('selected');
		$('.select option:nth-child('+pageid+')')[0].selected=true;
		request(categoryid,pageid,category);
	})

	// 下一页按钮功能
	$('.next').on('click',function(){
	
		if(pageid>=max){
			pageid=max;
			return;
		}
		pageid++;
		//$('.select option:nth-child('+pageid+')').attr('selected','selected').siblings().removeAttr('selected');
		$('.select option:nth-child('+pageid+')')[0].selected=true;
		request(categoryid,pageid,category);
	})

	//select选择按钮
	$('.select').on('change',function(){
		var opts=$(this)[0].children;
		for(var i=0;i<opts.length;i++){
			var opt=opts[i];
			if(opt.selected){
				pageid=parseInt(opt.value);
				//$('.select option:nth-child('+pageid+')').attr('selected','selected').siblings().removeAttr('selected');
				request(categoryid,pageid,category);
			}
		}	
	})
	//下拉的点击事件
	/*var val;
	$('.select').on('mousedown',function(){
		val=$(this).val();
	})
	$('.select').on('mouseup',function(){
		pageid = $(this).val();
		if(pageid==val){//这是为了在当前页不发送请求
			return;
		}
		console.log(pageid);
		request(categoryid,pageid,category);
	})*/

})


