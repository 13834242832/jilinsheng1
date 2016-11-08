$.ajax({
    type:'GET',
    url:"data/history/history_slide.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        for(var k in datas){
            $("#b05 ul").append("<li><a target='_blank' href='history_culture_details.html?ID="+datas[k].ID+"'><img src='"+datas[k].FPICADDRESS+"' alt=''></a></li>");
            $("#b05 ol li").eq(k).append("<p class='text'>"+datas[k].FTITLE+"</p>")
        }
        var unslider05 = $('#b05').unslider({
                dots: true,
                delay:3000
            }),
            data05= unslider05.data('unslider');
        $("#b05").css("height","600px");
        for(var k in datas){
            $("#b05 ol li").eq(k).append("<p class='text'>"+datas[k].FTITLE+"</p>")
        }


    }
});
$.ajax({
    type:'GET',
    url:"data/history/section.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("FCOLUMN","非物质文化遗产",datas);
        for(var i=0;i<6;i++){
            $(".right ul").append("<li><a target='_blank' href='history_culture_details.html?ID="+datas[i].ID+"'><img width='311px' height='250px' src='"+datas[i].FCONTENTCOVER+"'><p><span>"+datas[i].FTITLE+"</span></p></a></li>")
        }
    }
})
$.ajax({
    type:'GET',
    url:"data/history/section.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("FCOLUMN","地域文化",datas);
        for(var i=0;i<5;i++){
            $(".modulright ul").append("<li><div><img src='"+datas[i].FCONTENTCOVER+"' width='264px' height='236px' '></div><span>"+datas[i].FTITLE+"</span><h3><p>"+datas[i].FBRIEF+"</p></h3><h4><a target='_blank' href='history_culture_details.html?ID="+datas[i].ID+"'>查看更多&gt;</a></h4></li>")
        }
    }
})
$.ajax({
    type:'GET',
    url:"data/history/section.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        datas=filter("FCOLUMN","历史名人",datas);
        for(var i=0;i<6;i++){
            $('.famous ul').append("<li><a target='_blank' href='history_culture_details.html?ID="+datas[i].ID+"'><img src='.."+datas[i].FContentCover+"'><span>"+datas[i].FTITLE+"</span></a></li>");
        }
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

