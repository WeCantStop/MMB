/**
 * Created by yxy on 2016/12/7.
 */


//��ҳ
function getUrl(url){
    var obj={};
    var string=url.split('?')[1];
    string.split('&').forEach(function(ele){//������ѭ����
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
        //section��ķ�ҳ �ȶ�̬���ɺ�
        for(var i=0;i<ye;i++){
            var option=$("<option value='"+(i+1)+"'>"+(i+1)+'/'+ye+"</option>");
            $('#sel').append(option);
        }

        // ��optionע���¼� ��ǰ��page��1��
        var pageid=1;
        //ע������¼� ���ǰ��ͷ(�ڵ�ǰ��page�ϼ�һ)  ������ͷ���ڵ�ǰ��page��һ��
        $('.prev').on('click',function(){
            if(pageid>1){
                pageid--;
                //������Ҳ��
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
                //�������ķ����仯
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


        //�����ĵ���¼�
        var val;
        $('#sel').on('mousedown',function(){
            val=$(this).val();
        })
        $('#sel').on('mouseup',function(){
            pageid = $(this).val();
            if(pageid==val){//����Ϊ���ڵ�ǰҳ����������
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


