var user = JSON.parse(localStorage.getItem("username"));
if (user) {
    $(".login").addClass("user")
    $(".user").html(user + "<div></div>").css({ "width": "79px", "background-color": "#f5f5f5", "text-align": "center" });
    $(".zhu").html("<button>注销</button>")
    $(".user").attr("href", "")
    $(".zhu").attr("href", "")
}
$(".zhu button").click(function() {
    localStorage.removeItem("username")
    window.location.reload()
})
var su = ""
axios.get("http://localhost:3000/protucts", {}).then(res => {
    for (let i in res.data) {
        su += `
                <a href="shangpinxiangqing.html?id=${res.data[i].id}" target="_blank" data-id="${res.data[i].id}">
                    <div class="img-warp">
                        <img src="${res.data[i].imgUrl}" alt="">
                    </div>
                    <div class="info">
                        <h4>${res.data[i].title}</h4>
                        <p>${res.data[i].con}</p>
                        <p class="info_p">
                            ${res.data[i].people}
                        </p>
                    </div>
                </a>
                    `
    }
    $(".li_1_div").html(su)

})
var like = ""
axios.get("http://localhost:3000/productlist", {}).then(data => {
    console.log(data.data[0]);

    for (let i = 0; i < 20; i++) {
        var a = Math.floor(Math.random() * 100 + 1);
        like += `
                <div class="list" data-id="${data.data[a].id}">
                    <a href="shangpinxiangqing.html?id=${data.data[a].id}" target="_blank" class="a_1">
                        <div>
                            <img src="${data.data[a].imgUrl}" alt="">
                        </div>
                        <h4>${data.data[a].title}</h4>
                    </a>
                    <p class="p_0">
                        <em>￥</em> ${data.data[a].price}
                    </p>
                    <a href="" class="a_2">
                            <p class="p-1">找相似</p>
                            <p class="p-2">发现更多相似的宝贝</p>
                        </a>
                </div>
                    `
    }
    $(".shop").html(like)

})












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
var flag = true;
$(window).scroll(function() {
    if (flag) {
        var sT = $(this).scrollTop();
        if (sT >= 534) {
            $("#floorNav").css({ "position": "fixed", "top": "75px" })
            $(".Top").fadeIn();
        } else {
            $(".Top").fadeOut();
            $("#floorNav").css({ "position": "absolute", "top": "609px" })
        }

        $(".content_ul>li").each(function() {
            if (sT >= $(this).offset().top - $(this).outerHeight() / 2) {
                var index = $(this).index();
                $(".floor_ul>li:lt(4)").eq(index).addClass('on').siblings().removeClass(
                    'on');
            }
        })
    }
})
$(".floor_ul>li:lt(4)").click(function() {
    flag = false;
    var index = $(this).index();
    $("html,body").stop().animate({
        "scrollTop": $(".content_ul>li").eq(index).offset().top
    }, 500, function() {
        flag = true;
    });
    $(this).addClass("on").siblings().removeClass("on");
});
$(".Top").click(function() {
    flag = false;
    $("html,body").stop().animate({
        "scrollTop": 0
    }, 500, function() {
        flag = true;
    });
})
$("#floorNav li").hover(function() {
    $(this).toggleClass("hover")
})