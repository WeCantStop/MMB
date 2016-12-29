/*
* @Author: xin87
* @Date:   2016-11-28 19:11:50
* @Last Modified by:   xin87
* @Last Modified time: 2016-11-28 19:12:00
*/

function getId (url) {
			var obj={};
			var str=url.split('?')[1];
			str.split('&').forEach(function(el){
				var arr=el.split('=');
				obj[arr[0]]=arr[1]?arr[1]:'';
			})
			return obj;
		}
