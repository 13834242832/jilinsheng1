var id=location.search.split("=")[1];
if(id.length>32){
    id=id.substring(0,32);
}
$.ajax({
    type:'GET',
    url:"data/datas/alldatas.json",
    dataType:"text",
    success:function(json){
        var datas=eval("("+json+")");

        showData(datas);
        var data=filter("FGUID",id,datas);
        $(".banner ul li").find("img").attr("src",data[0].FPICADDRESS);
        $(".nd").html(data[0].FYEAR);
        $(".mc").html(data[0].FCOLLECTIONCNAME);
        $(".lx").html(data[0].FCOLLECTIONTYPE);
        $(".jb").html(data[0].FCOLLECTIONLEVEL);
        $(".dw").html(data[0].MID);
        $(".cc").html(data[0].FSIZE);
    }
});

//显示数据
function showData(datas){
    var len=datas.length;
    var limit=6;
    $(".pager").pager({
        pageIndex:0,
        pageSize:limit,
        itemCount:len,
        maxButtonCount:4,
    });
    $(".img_list").html(" ")
    for(var i=0;i<6;i++){
        if(datas[i]) {
            if(datas[i]) {
                $(".img_list").append("<li><a href='data_details.html?id="+datas[i].FGUID+"'><img width='166px' height='128px' src='"+datas[i].FPICADDRESS+"' alt=''><p><span>"+datas[i].FCOLLECTIONCNAME+"</span></p></a></li>")
            }
        }
    }
    $(".pager").delegate("a[page]","click",function(){
        var num=$(".pager .curPage").html()-1;
        $(".img_list").html(" ")
        for(var i=0;i<limit;i++){
            if(datas[i]) {
                if(datas[i+num*limit]){
                    $(".img_list").append("<li><a href='data_details.html?id="+datas[i+num*limit].FGUID+"'><img src='"+datas[i+num*limit].FPICADDRESS+"' width='166px' height='128px' alt=''><p><span>"+datas[i+num*limit].FCOLLECTIONCNAME+"</span></p></a></li>")
                }
            }
        }
    })
}
//过滤器
function filter(property,val,data){
    var output=[];
    for(var i=0,len=data.length;i<len;i++){
        var kw=data[i][property];
        if(val==kw){
            output.push(data[i]);
        }
        else if(val=="全部"){
            output=data;
        }
    }
    return output;
}