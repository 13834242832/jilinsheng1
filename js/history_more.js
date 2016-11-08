$.ajax({
    type:'GET',
    url:"data/history/section.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        $("button").on("click",function(){
            location.search="?CLASS="+$(this).html();
        })
        var fcolumn=decodeURI(location.search.split("=")[1]).toString();
        $("button:contains("+fcolumn+")").addClass("active").siblings().removeClass("active")
        datas=filter("FCOLUMN",fcolumn,datas);
        $(".section2>p span").html(fcolumn);
        var len=datas.length;
        var limit=16;
        $(".pager").pager({
            pageIndex:0,
            pageSize:limit,
            itemCount:len,
            maxButtonCount:4,
        });
        $(".table_content ul li").html(" ");
        for(var i=0;i<limit;i++){
            var a=$(".table_content ul li");
            a.eq(i).append("<a href='history_culture_details.html?ID="+datas[i].ID+"'><img width='311px' height='240px' src='"+datas[i].FCONTENTCOVER+"' alt=''><p><span>"+datas[i].FTITLE+"</span></p></a>")
        }
        $(".pager").delegate("a[page]","click",function(){
            var num=$(".pager .curPage").html()-1;
            $(".table_content ul li").html(" ");
            for(var i=0;i<limit;i++){
                var a=$(".table_content ul li");
                a.eq(i).append("<a href='history_culture_details.html?ID="+datas[i+num*limit].ID+"'><img width='311px' height='240px' src='"+datas[i+num*limit].FCONTENTCOVER+"' alt=''><p><span>"+datas[i+num*limit].FTITLE+"</span></p></a>")
            }
        })
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
