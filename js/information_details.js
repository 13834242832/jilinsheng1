$(function(){
    $.ajax({
        type:'GET',
        url:"data/information/text_details.json",
        dataType:"text",
        success:function(json){
            var datas=eval("("+json+")");
            var id=location.search.split("=")[1];
            var data=filter("ID",id,datas);
            $(".wrapper h4").html(data[0].NAME);
            $(".wrapper h6 span").html(data[0].TIME);
            $(".wrapper h6 u").html(data[0].LY);
            $(".wrapper .content").html(data[0].INTRODUCE);
            $(".wrapper .content");
            if(data[0].index<=0){

                $(".prev a").html("无");
                $(".next a").attr("href","information_details.html?ID="+datas[data[0].index+1].ID).html(datas[data[0].index+1].NAME);
            }
            else if(data[0].index>=datas.length-1){
                $(".prev a").attr("href","information_details.html?ID="+datas[data[0].index-1].ID).html(datas[data[0].index-1].NAME);
                $(".next a").html("无");
            }else{
                $(".next a").attr("href","information_details.html?ID="+datas[data[0].index+1].ID).html(datas[data[0].index+1].NAME);
                $(".prev a").attr("href","information_details.html?ID="+datas[data[0].index-1].ID).html(datas[data[0].index-1].NAME);
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