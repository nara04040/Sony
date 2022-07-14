$(document).ready(function () {
    // header
    let header = $('.header');
    let gnb = $('.gnb');
    let depth_1 = $('.depth1');
    let depth_1_List = $('.depth1 > li')
    let depthUnderLine = $('.depth1 > li::after')
    let depth_2 = $('.depth2');
    let gnbMaxHeight = gnb.outerHeight();
    let gnbMinHeight = header.outerHeight();

    depth_1.mouseenter(function () {
        header.css('height', gnbMaxHeight);

    })
    depth_1.mouseleave(function () {
        header.css('height', gnbMinHeight);
    });
    

})



window.onload = function () {


    //visual
    let swiperVisual = new Swiper('.sw-visual', {
        loop:true,
        navigation : {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })


    // 마우스 따라다니기
    // const arrowBtn = document.querySelector('.swiper-button-next');

    // document.addEventListener('mousemove', (e) => {
    //     const mouseX = e.clientX;
    //     const mouseY = e.clientY;
    //     arrowBtn.style.left = mouseX + 'px';
    //     arrowBtn.style.top = mouseY + 'px';
    // })
}