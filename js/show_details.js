$.ajax({
    type:"GET",
    url: 'data/index/show_details.json',
    dataType:"text",
    success: function(data){
        var datas=eval('('+data+')');
        var id=location.search.split("=")[1];
        var data=filter("ID",id,datas)[0];
        $(".picture img").attr("src",data.FCONTENTCOVER);
        var a=$(".message table");
        a.find("tr td:nth-child(2)").html(data.NAME);
        a.find("tr td:nth-child(4)").html(data.FEXHIBITIONBTIME+"~"+data.FEXHIBITONETIME);
        a.find("tr td:nth-child(6)").html(data.FPLACE);
        if(data.PW==1){
            a.find("tr td:nth-child(8)").html("免费");
        }
        else{
            a.find("tr td:nth-child(8)").html("收费");
        }
        $(".text").html(data.INTRODUCE);


    }
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