/**
 * Created by Will on 2016.12.7.
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
    //  折扣 ajax 加载时渲染
$.ajax({
    type: 'get',
        url: 'http://'+changeHref+'/api/getmoneyctrl',
//    url: 'http://mmb.ittun.com/api/getmoneyctrl',
    success: function (data) {
        var str = template('pro_items', {item: data.result});
        $('.discount > .product').html(str);
    }
})


// 点击上一页，下一页功能
var pageNum = 0;
$('.pagener > a').on('click', function () {

    //上一页
    if ($(this).index() == 0) {
        pageNum--;
        if (pageNum < 0) {
            pageNum = 0;
        }
    } else {
        //下一页
        pageNum++;
        if (pageNum > 14) {
            pageNum = 14;
        }
    }

    var location = 'http://'+changeHref+'/api/getmoneyctrl';
    //var location = 'http://mmb.ittun.com/api/getmoneyctrl';
    location = location + '?pageid=' + pageNum;
    $.ajax({
        type: 'get',
        url: location,
        success: function (data) {
            var str = template('pro_items', {item: data.result});
            $('.discount > .product').html(str);
        }
    })
    $('#select > option').prop('selected', false)
    $('#select > option').eq(pageNum).prop('selected', true)

})

$('#select').change(function () {
    pageNum = $('#select').val();
        var location = 'http://'+changeHref+'/api/getmoneyctrl';
    //var location = 'http://mmb.ittun.com/api/getmoneyctrl';
    location = location + '?pageid=' + pageNum;
    $.ajax({
        type: 'get',
        url: location,
        success: function (data) {
            var str = template('pro_items', {item: data.result});
            $('.discount > .product').html(str);
        }
    })
})