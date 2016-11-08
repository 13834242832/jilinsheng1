$('#header').delegate("#nav ul li a","click",function(e){
   $(this).parent().addClass('navactived').siblings().removeClass('navactived');
})