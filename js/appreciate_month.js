$.ajax({
    type:'GET',
    url:"data/appreciate/banner.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        var data=datas;
        var len=data.length;
        var limit=8;
        $(".pager").pager({
            pageIndex:0,
            pageSize:limit,
            itemCount:len,
            maxButtonCount:4,
        });
        $(".content ul").html(" ");
        for(var i=0;i<limit;i++){
            var a=$(".content ul");
            if(data[i]){
                a.append("<li><a href='appreciate_month_details.html?ID="+data[i].FGUID+"'><img src='"+data[i].FCONTENTCOVER+"' width='160px' height='120px' alt=''><div class='rmsg'><h3>"+data[i].FTITLE+"</h3><h5><span>"+data[i].MID+"</span><u>"+data[i].TIME+"</u></h5><p>"+data[i].FBRIEF+"</p></div></a></li>")
            }
        }
        $(".pager").delegate("a[page]","click",function(){
            var num=$(".pager .curPage").html()-1;
            $(".content ul").html(" ");
            for(var i=0;i<limit;i++){
                var a=$(".content ul");
                if(data[i]){
                    a.append("<li><img src='"+data[i+num*limit].FCONTENTCOVER+"' width='160px' height='120px' alt=''><div class='rmsg'><h3>"+data[i+num*limit].FTITLE+"</h3><h5><span>"+data[i+num*limit].MID+"</span><u>"+data[i+num*limit].TIME+"</u></h5><p>"+data[i].FBRIEF+"</p></div></li>")
                }
            }
        })

    }
});
function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
    }
    return output;
}