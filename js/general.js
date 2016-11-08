$.ajax({
    type:"GET",
    url: 'data/name.json',
    dataType:"text",
    success: function(data){
        var datas=eval('('+data+')');
        for(var k in datas){
            $("#map").append("<div class='position'  data-id='"+datas[k].MID+"'><p class='positiontext'><span class='positionspan'></span></p><a href='museum_details.html?ID="+datas[k].MID+"'></a></div>");
            $("[data-id='"+datas[k].MID+"']").attr('data-level',datas[k].FMLEVEL);
            if(datas[k].FMLEVEL=="一级博物馆"){
                $("[data-id='"+datas[k].MID+"'] a").addClass("positiona"+1);
            }
            else if(datas[k].FMLEVEL=="二级博物馆"){
                $("[data-id='"+datas[k].MID+"'] a").addClass("positiona"+2);
            }
            else if(datas[k].FMLEVEL=="三级博物馆"){
                $("[data-id='"+datas[k].MID+"'] a").addClass("positiona"+3);
            }

            $("[data-id='"+datas[k].MID+"']").css("left",datas[k].FLONGITUDE+"px").css('top',datas[k].FLATITUDE+"px");
            $("[data-id='"+datas[k].MID+"'] .positionspan").html(datas[k].FMUSEUMNAME);
        };
    }
})

$(function (){
    $("#left-nav li").click(function() {
        var n = $(this).index();
        $(this).addClass("point");
        $(this).siblings().removeClass('point');
        if (n == 1) {
            $("[data-level='一级博物馆']").show();
            $("[data-level='二级博物馆']").hide();
            $("[data-level='三级博物馆']").hide();
        }
        else if (n == 2) {
            $("[data-level='二级博物馆']").show();
            $("[data-level='一级博物馆']").hide();
            $("[data-level='三级博物馆']").hide();
        }
        else if (n == 3) {
            $("[data-level='三级博物馆']").show();
            $("[data-level='一级博物馆']").hide();
            $("[data-level='二级博物馆']").hide();
        }
        else {
            $("[data-level='一级博物馆']").show();
            $("[data-level='二级博物馆']").show();
            $("[data-level='三级博物馆']").show();
        }
    })
})


