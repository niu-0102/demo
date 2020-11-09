$(".xl").hover(function() {
    $(this).toggleClass("head_ul_li_hover")
})

$(".td_list").click(function() {
    $(this).addClass("click").siblings().removeClass("click")
})
$(".td_list").hover(function() {
    $(this).toggleClass("hover")
})
$(".J_Cat").hover(function() {
    $(this).toggleClass("on")
    $(".list").toggle()
})
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
//鼠标覆盖停止自动切换
swiper.el.onmouseover = function() {
        swiper.autoplay.stop();
    }
    //鼠标离开开始自动切换
swiper.el.onmouseout = function() {
    swiper.autoplay.start();
}
var swiper1 = new Swiper('.swiper1-container', {
    autoplay: true,
    loop: true,
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
swiper1.el.onmouseover = function() {
        swiper1.autoplay.stop();
    }
    //鼠标离开开始自动切换
swiper1.el.onmouseout = function() {
    swiper1.autoplay.start();
}