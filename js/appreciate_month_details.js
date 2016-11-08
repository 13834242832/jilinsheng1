$(function(){
    $.ajax({
        type:'GET',
        url:"data/appreciate/banner.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            var id=location.search.split("=")[1];
            var data=filter("FGUID",id,datas);
            $(".wrapper h4").html(data[0].FTITLE);
            $(".wrapper h6 span").html(data[0].MID);
            $(".wrapper h6 u").html(data[0].TIME);
            $(".wrapper .content").html(data[0].FCONTENT);
            if(data[0].index<=0){
                $(".prev a").html("无");
                $(".next a").attr("href","appreciate_month_details.html?ID="+datas[data[0].index+1].FGUID).html(datas[data[0].index+1].FTITLE);
            }
            else if(data[0].index>=datas.length-1){
                $(".prev a").attr("href","appreciate_month_details.html?ID="+datas[data[0].index-1].FGUID).html(datas[data[0].index-1].FTITLE);
                $(".next a").html("无");
            }else{
                $(".next a").attr("href","appreciate_month_details.html?ID="+datas[data[0].index+1].FGUID).html(datas[data[0].index+1].FTITLE);
                $(".prev a").attr("href","appreciate_month_details.html?ID="+datas[data[0].index-1].FGUID).html(datas[data[0].index-1].FTITLE);
            }

        }
    });
})
function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            data[i].index=i
            output.push(data[i]);
        }
    }
    return output;
}