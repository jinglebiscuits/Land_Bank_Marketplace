//$('#tableview').click(function () {
//
//    $("#table").toggle();
//});
//
//$("#menu,.ul>li").click(function () {
//    console.log("hey you click something");
//    $('.active').removeClass('active');
//    console.log(this);
//    $(this).addClass('active');
//});
//var selector = ;

$('.nav li').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
});