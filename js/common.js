/**
 * Created by yxy on 2016/12/7.
 */


//分页
function getUrl(url){
    var obj={};
    var string=url.split('?')[1];
    string.split('&').forEach(function(ele){//这里是循环的
        var b=ele.split('=');
        // ["id", "1"]
        obj[b[0]]=b[1]?b[1]:'';
    })
    return obj;
}
//    getUrl(location.href)
var id=getUrl(location.href).id;
$.ajax({
    type: 'get',
    url:'http://192.168.50.130:8002/api/getproductlist?categoryid='+id,
    success:function(data){
        var ye=Math.ceil(data.totalCount/data.pagesize);
        var html=template('tpl',{num: data.result});
        $('.tv').html(html);
        //section里的分页 先动态生成好
        for(var i=0;i<ye;i++){
            var option=$("<option value='"+(i+1)+"'>"+(i+1)+'/'+ye+"</option>");
            $('#sel').append(option);
        }

        // 给option注册事件 当前的page是1的
        var pageid=1;
        //注册相关事件 点击前箭头(在当前的page上减一)  点击后箭头（在当前的page加一）
        $('.prev').on('click',function(){
            if(pageid>1){
                pageid--;
                //让下拉也变
                var option=$('#sel option');
                option[pageid-1].selected=true;
                $.ajax({
                    type: 'get',
                    url:'http://192.168.50.130:8002/api/getproductlist?categoryid='+id+'&pageid='+pageid,
                    success:function(data){
                    }
                })
            }
        })
        $('.next').on('click',function(){
            if(pageid<ye){
                pageid++;
                //让下拉的发生变化
                var option=$('#sel option');
                option[pageid-1].selected=true;
                $.ajax({
                    type: 'get',
                    url:'http://192.168.50.130:8002/api/getproductlist?categoryid='+id+'&pageid='+pageid,
                    success:function(data){

                    }
                })
            }
        })


        //下拉的点击事件
        var val;
        $('#sel').on('mousedown',function(){
            val=$(this).val();
        })
        $('#sel').on('mouseup',function(){
            pageid = $(this).val();
            if(pageid==val){//这是为了在当前页不发送请求
                return;
            }
            console.log(pageid);
            $.ajax({
                type: 'get',
                url: 'http://192.168.50.130:8002/api/getproductlist?categoryid=' + id + '&pageid=' + pageid,
                success: function (data) {
                }
            })
        })
    }
})


