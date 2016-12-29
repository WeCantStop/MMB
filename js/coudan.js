/**
 * Created by lenovo on 2016/11/28.
 */
var changeHref;
function getWay(location){
    var arr=location.split(':');
    return arr[1];
}
console.log(getWay(location.href));
if(getWay(location.href)=='//localhost'){
    changeHref='192.168.50.130:8002';
}else{
    changeHref='mmb.ittun.com';
}
console.log(changeHref);
$(function(){
    var areaid=[];
    var shopid=[];
    var aid=0;
    var sid=0;
    var cd_area=$('.cd_area');
    var list=$('.list');
    var detail=$('.list .detail');
    var left=$('.cd_area .left');
    var right=$('.cd_area .right');
    var search=$('.cd_area').children('.search');
    var area=$('.cd_area .left div');
    var goods=$('.cd_goods');

    area.each(function(index,ele){
        $(ele).on('click',function(){
            detail.eq(index).toggleClass('dn').siblings('div').addClass('dn')
        });
    })

    //搜索
    var flag=true;
    right.on('click',function(){
        if(flag){
            search.addClass('db');
            goods.css('marginTop',51+'px');
            flag=false;
            $(this).css('background','url(img/search_close.png) no-repeat center')
            detail.addClass('dn')
        }else{
            search.removeClass('db');
            goods.css('marginTop',0);
            $(this).css('background','url(img/search.png) no-repeat center')
            flag=true;
        }

    })
    $.ajax({
        type:'get',
        url:'http://'+ changeHref+'/api/getgsshop',
        //url:'http://mmb.ittun.com/api/getgsshop',
        dataType:'jsonp',
        success:function(data){
            var shop=$('.shop');
            for(var i=0;i<data.result.length;i++){
                shopid.push(data.result[i].shopId);
                var html=$('<li><i>'+data.result[i].shopName+'</i><span></span></li>')
                shop.append(html);
            }
        }
    })
    $.ajax({
        type:'get',
        url:'http://'+ changeHref+'/api/getgsshoparea',
        //url:'http://mmb.ittun.com/api/getgsshoparea',
        dataType:'jsonp',
        success:function(data){
            var position=$('.position');
            for(var i=0;i<data.result.length;i++){
                areaid.push(data.result[i].areaId);
//                    console.log(data.result[i].areaId);
                var html=$('<li><i>'+data.result[i].areaName+'</i><span></span></li>')
                position.append(html);
            }

            //在这里获取li 其他
            var ul=$('ul');
            ul.each(function(index,ele){
                $(ele).children('li').on('click',function(){
                    //获取ID
                    if(index==0){//点击第一个ul获取的
                        sid = shopid[$(this).index()];
                    }else if(index==1){//点击第二个获取的
                        aid = areaid[$(this).index()];
                    }
                    $(this).children('span').addClass('db')
                    $(this) .siblings('li').children('span').removeClass('db');
                    //选择完之后自身也会隐藏掉
                    $(this).parent('ul').parent('div').toggleClass('dn');
                    //截取字符串
                    var length=$(this).children('i').html().length;
                    var str=$(this).children('i').html();
                    var newstr='';
                    for(var i=0;i<length;i++){
                        if(str[i]=='（'){
                            break;
                        }
                        newstr+=str[i];
                    }
                    area.eq(index).children('span').html(newstr);
                    $.ajax({
                        type:'get',
                        url:'http://'+ changeHref+'/api/getgsproduct?shopid='+sid+'&areaid='+aid+'',
                        //url:'http://mmb.ittun.com/api/getgsproduct?shopid='+sid+'&areaid='+aid+'',
                        dataType:'jsonp',
                        success:function(data){
                            console.log(data);
                            var html=template('tmp',{goods:data.result})
                            $('.goods').html(html);
                        }
                    })
                })
            })

        }

    })

    $.ajax({
        type:'get',
        url:'http://'+ changeHref+'/api/getgsproduct?shopid='+sid+'&areaid='+aid+'',
        //url:'http://mmb.ittun.com/api/getgsproduct?shopid='+sid+'&areaid='+aid+'',
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var html=template('tmp',{goods:data.result})
            $('.goods').html(html);
        }
    })
})