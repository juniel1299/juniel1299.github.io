$(document).ready(function () {
    // $(document).bind('keydown',function(e){
    //     if(e.keyCode ==123){
    //         e.preventDefault();
    //         e.returnValue = false;
    //     }
    // })
});

$('.header-button').click(function () {
    $('.header-button').removeClass('active');
    $(this).addClass('active');
    id = $(this).data("target");

    $('.main-area').hide();
    $("#"+id).show();

});

$('.detail-button').click(function () {
    $('.detail-button').removeClass('active');
    $(this).addClass('active');
    id = $(this).data("target");

    $('.carrer-inside-detail').hide();
    $("#"+id).show();
});

// document.onmousedown=disableclick;
// function disableclick(event){
//     if (event.button==2) {
//         const status="우클릭 방지";
//         alert(status);
//         return false;
//     }
// }
