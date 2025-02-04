$(document).ready(function () {
    // 헤더 버튼 클릭 시 섹션 전환
    $('.header-button').click(function () {
        $('.header-button').removeClass('active');
        $(this).addClass('active');

        let id = $(this).data("target");

        $('.main-area').fadeOut(200, function () {
            $("#" + id).fadeIn(200);
        });
    });

    // 상세 버튼 클릭 시 내용 표시
    $('.detail-button').click(function () {
        let id = $(this).data("target");

        $(this).toggleClass('active');
        $("#" + id).slideToggle(300);
    });
});
