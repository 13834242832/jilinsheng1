$.ajax({
    type:'GET',
    url:"data/information/text_more_information.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");
        $("button").on("click",function(){
            location.search="?CLASS="+$(this).html()+"&ly="+decodeURI(location.search.split("&")[1].split("=")[1]);
        })
        var fcolumn=decodeURI(location.search.split("&")[0].split("=")[1]).toString();
        var key=decodeURI(location.search.split("&")[1].split("=")[1]).toString();
        $("button:contains("+fcolumn+")").addClass("active").siblings().removeClass("active")
        $(".section2>p span").html(fcolumn);
        var data=filter("FCOLUMN",fcolumn,datas);
        if(key!="all"){
            data=filter("LY",key,data);
        }
        console.log(data);
        var len=data.length;
        var limit=22;
        if(len==0){
            $('.pager').hide();
        }else{
            $(".pager").pager({
                pageIndex:0,
                pageSize:limit,
                itemCount:len,
                maxButtonCount:5
            });
        }
        $("table tbody tr td").html(" ");
        for(var i=0;i<limit;i++){
            if(data[i]){
                $("table tbody tr:nth-child("+(i+1)+") td:first-child").append("<a>"+data[i].NAME+"</a>")
                    .find("a").attr("href","information_details.html?ID="+data[i].ID).attr("target","_blank");
                $("table tbody tr:nth-child("+(i+1)+") td:nth-child(2)").html(data[i].LY);
                $("table tbody tr:nth-child("+(i+1)+") td:nth-child(3)").html(data[i].TIME);
            }
        }
        $(".pager").delegate("a[page]","click",function(){
            var num=$(".pager .curPage").html()-1;
            console.log(num);
            $("table tbody tr td").html(" ");
            for(var i=0;i<limit;i++){
                if(data[i].NAME===undefined){
                    return
                }else{
                    $("table tbody tr:nth-child("+(i+1)+") td:first-child").append("<a>"+data[i+num*limit].NAME+"</a>")
                        .find("a").attr("href","information_details.html?ID="+data[i+num*limit].ID).attr("target","_blank");
                    $("table tbody tr:nth-child("+(i+1)+") td:nth-child(2)").html(data[i+num*limit].LY);
                    $("table tbody tr:nth-child("+(i+1)+") td:nth-child(3)").html(data[i+num*limit].TIME);
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