$(document).ready(function() {
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
        navigation: {
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            type: 'fraction',
        },
    })
    // 마우스 따라다니기
    const arrowBtn = document.querySelector('.swiper-button-next');

    document.addEventListener('mousemove', (e) =>{
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        arrowBtn.style.left = mouseX + 'px';
        arrowBtn.style.top = mouseY + 'px';
    })
})