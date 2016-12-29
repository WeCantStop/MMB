/*
* @Author: Administrator
* @Date:   2016-11-23 15:53:11
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-23 16:19:44
*/

'use strict';
// rem 算法 , 不需要添加入口函数，先让JS计算出来，在基于计算后的font-size去渲染css
// 获取根目录
var oHtml = document.documentElement;
function getSize(){
	// 获取屏幕的大小
	var screenWidth = oHtml.offsetWidth;
	if(screenWidth >= 540){
		oHtml.style.fontSize = '40px';
	}else if(screenWidth <= 320 ){
		oHtml.style.fontSize = '23.7037px';
	}else{
		// 动态去计算这个屏幕下的font-size值
	oHtml.style.fontSize = screenWidth/(540/40)+'px';
	}
	
}
// 最开始先调用一次
getSize();
// 当缩放的时候自动去计算
window.addEventListener('resize', getSize);