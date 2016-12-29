/*
 * @Author: Admin
 * @Date:   2016-12-03 23:02:33
 * @Last Modified by:   Admin
 * @Last Modified time: 2016-12-06 20:20:27
 */
var changeHref;
function getWay(location) {
    var arr = location.split(':');
    return arr[1];
}
if (getWay(location.href) == '//localhost') {
    changeHref = '192.168.50.130:8002';
} else {
    changeHref = 'mmb.ittun.com';
}
$(function () {
    var replaces = window.location.hash;
    console.log(replaces);
    replaces = replaces.split('#')[2]
    var replace = document.querySelector('.replace');
    replace.innerHTML = replaces;
    var productid = getId(location.href).productId;
    console.log(productid);
    var comment = getId(decodeURI(location.href)).comment;
    comment=comment.split("#")[0];
    $('.product_com').html(comment);
    //获取头部信息数据
    $.ajax({
        type: 'get',
        // url:'http://mmb.ittun.com/api/getproduct?productid='+productid,
        url: 'http://' + changeHref + '/api/getproduct?productid=' + productid,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('.header_title').html(data.result[0].productName);
            $('.product_title').html(data.result[0].productName);
            $('.product_img').html(data.result[0].productImg);
            $('.product_tab').html(data.result[0].bjShop);

        }
    })

    //获取评论信息
    $.ajax({
        type: 'get',
        // url:'http://mmb.ittun.com/api/getproductcom?productid='+productid,
        url: 'http://' + changeHref + '/api/getproductcom?productid=' + productid,
        dataType: 'json',
        success: function (data) {
            var html = template('tpl', {data: data.result});
            $('.product_comment_wrap').html(html);
        }
    })
    $('.replace').on('click', function () {
        window.history.back();
    })
})