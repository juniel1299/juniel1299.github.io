$(document).ready(function () {
    $('#home-area').click();
});

$('.header-button').click(function () {
    $('.header-button').removeClass('active');
    $(this).addClass('active');
    id = $(this).data("target");

    $('.main-area').hide();
    $("#"+id).show();

});

