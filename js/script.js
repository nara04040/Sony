$(document).ready(function() {
    return 0;
    menuList = $('.menu-list');
    header = $('.header')
    subMenu = $('.sub-menu')
    headerShow = $('.header-show');
    subMenuShow = $('.sub-menu-show')
    // menuList.mouseenter(function () {
    //     // header.addClass('header-show');
    //     subMenu.addClass('sub-menu-show');
    // });
    // menuList.mouseleave(function () {
    //     header.removeClass('header-show');
    //     subMenu.removeClass('sub-menu-show');
    // });
    $('.menu-list').mouseenter(function(){
        $('.header').addClass('header-show');
        $('.sub-menu-list').addClass('sub-menu-show');
    })
    $('.menu-list').mouseleave(function(){
        $('.header').removeClass('header-show');
        $('.sub-menu-list').removeClass('sub-menu-show')
    })

    // swiper
    new Swiper('.sw-container',{ 
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: 'fraction',
        },
    })

})