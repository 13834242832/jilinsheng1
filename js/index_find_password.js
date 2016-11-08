$(".btn").on("click",function(){
    var index=parseInt($(this).attr("class").split(" ")[1].slice(3,4))+1;
    $(".state ul li:nth-child("+index+")").addClass("active").siblings().removeClass("active")
    $(this).parent().hide().next().show()
})