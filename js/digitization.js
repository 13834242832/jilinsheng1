window.onload=function(){
    $.ajax({
        type:'GET',
        url:"data/digitization/3d_Banner.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k=0;k<4;k++){
                var a=$(".banner ul");
                    a.append("<li><a href=''><img width='1400px' height='588px' src='' alt=''></a></li>");

                    // $(".banner ul li").eq(datas[k].FORDER-1).find("a").attr("href",'digitization_details.html?ID='+datas[k].ID);
                    // $(".banner ul li").eq(datas[k].FORDER-1).find("img").attr("src",datas[k].FPICADDRESS);
            }
            for(var i=1;i<5;i++){
                var data=filter("FORDER",i,datas)[0];
                $(".banner ul li").eq(i-1).find("a").attr("href",'digitization_details.html?ID='+data.ID).attr("target","_blank");;
                $(".banner ul li").eq(i-1).find("img").attr("src",data.FPICADDRESS);
            }


            $('#b05').unslider({
                speed: 600,
                dots: true
            })
        }

    });
    $.ajax({
        type:'GET',
        url:"data/digitization/recommend.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k in datas){
                $("[data-hotname='" + (datas[k].FORDER-1) + "']").html(datas[k].FNAME).parent().prev()
                    .attr("href", "digitization_details.html?id=" + datas[k].FGUID + "").attr("target","_blank");;
                    if(datas[k].FORDER=="1"){
                        $("[data-hotname='0']").parent().parent().find("img")
                            .attr('src',datas[k].FPIC).attr("width","468px").attr("height","326px");
                    }else{
                        $("[data-hotname='" + (datas[k].FORDER-1)+ "']").parent().parent().find("img")
                            .attr('src',datas[k].FPIC).attr("width","225px").attr("height","156px");
                }

            }
        }

    });
    $.ajax({
        type:'GET',
        url:"data/digitization/hot_3dM.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k in datas){
                $("[data-name="+k+"]").html(datas[k].FNAME).attr("href","digitization_details.html?ID="+datas[k].FGUID).attr("target","_blank");
                if(datas[k].FPM==-1){
                    $("[data-name="+k+"]").next().addClass("sort3");
                }
                else if(datas[k].FPM==0){
                    $("[data-name="+k+"]").next().addClass("sort2");
                }
                else{
                    $("[data-name="+k+"]").next().addClass("sort1");
                }
            }
        }

    });
    $.ajax({
        type:'GET',
        url:"data/digitization/3d.json",
        dataType:"text",
        success:function(json){
            var datas=eval(json);
            for(var k in datas){
                $("[data-3dname='" + k + "'] u").html(datas[k].FNAME).parent().prev()
                    .attr("href", "appreciate_details.html?ID=" + datas[k].FGUID + "").attr("target","_blank");
                var s=parseInt(k)+1;
                $("[data-3dname='" + k + "']").parent().find("img")
                    .attr('src',datas[k].FPIC);

            }
        }

    });
}

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
