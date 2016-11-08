$.ajax({
    type:'GET',
    url:"data/history/history_details.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        var id=location.search.split("=")[1];
        var data=filter("ID",id,datas)[0];
        $(".wrapper p span u").html(data.FTITLE);
        $(".title h4").html(data.FTITLE);
        $(".time").html(data.TIME);
        $(".from").html(data.FMUSEUMID);
        $(".text").html(data.FCONTENT);
        if(data.index<=0){
            $(".prev a").html("无");
            $(".next a").attr("href","history_culture_details.html?ID="+datas[data.index+1].ID).html(datas[data.index+1].FTITLE);
        }
        else if(data.index>=datas.length-1){
            $(".prev a").attr("href","history_culture_details.html?ID="+datas[data.index-1].ID).html(datas[data.index-1].FTITLE);
            $(".next a").html("无");
        }else{
            $(".next a").attr("href","history_culture_details.html?ID="+datas[data.index+1].ID).html(datas[data.index+1].FTITLE);
            $(".prev a").attr("href","history_culture_details.html?ID="+datas[data.index-1].ID).html(datas[data.index-1].FTITLE);
        }
    }
});
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
