$(".xl").hover(function() {
    $(this).toggleClass("head_ul_li_hover")
})
$(".td_list").click(function() {
    $(this).addClass("click").siblings().removeClass("click")
})
$(".td_list").hover(function() {
    $(this).toggleClass("hover")
})