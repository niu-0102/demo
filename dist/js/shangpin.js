let Id = location.search.split("=")[1];
var user = JSON.parse(localStorage.getItem("username"));
$(".xl").hover(function() {
    $(this).toggleClass("head_ul_li_hover")
})
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

var a = ""
axios.get("http://localhost:3000/protucts", {
    params: {
        id: Id
    }
}).then(aaa => {
    a = aaa.data.length
    if (a != 0) {
        axios.get("http://localhost:3000/protucts", {
            params: {
                id: Id
            }
        }).then(aaa => {
            let oDetail = document.getElementById("detail");
            oDetail.innerHTML = `
            <img src="${aaa.data[0].imgUrl}">
            <p>${aaa.data[0].title}</p>
            <p>${aaa.data[0].people}</p>
            <span>-</span><input type="text" value="1"><span>+</span>
            <input type="button" value="加入购物车" id="addBtn">
        `;
            $("#detail span").eq(0).click(function() {
                let num = $("input").eq(0).val();
                num--;
                if (num < 1) {
                    num = 1;
                }
                $("#detail input").eq(0).val(num);
            })
            $("#detail span").eq(1).click(function() {
                let num = $("#detail input").eq(0).val();
                num++;
                $("#detail input").eq(0).val(num);
            })
            $("#detail input").eq(0).change(function() {
                let num = $("#detail input").eq(0).val();
                if (num < 1) {
                    num = 1;
                }
                $("#detail input").eq(0).val(num);
            })
            if (user) {
                $("#addBtn").click(function() {
                    axios.get("http://localhost:3000/carts", {
                        params: {
                            username: user,
                            id: Id
                        }
                    }).then(add => {
                        if (add.data.length == 0) {
                            axios.post("http://localhost:3000/carts", {
                                username: user,
                                id: Id,
                                title: $("#detail p:first").text(),
                                price: $("#detail p:last").text(),
                                imgUrl: $("#detail img").attr("src"),
                                shu: $("#detail :text").val()
                            })
                        } else {
                            axios.get("http://localhost:3000/carts", {
                                username: user,
                                id: Id
                            }).then(gai => {
                                let num = Math.floor(gai.data[0].shu);
                                num += Math.floor($("#detail :text").val())
                                axios.patch(`http://localhost:3000/carts/${Id}`, {
                                    shu: num
                                })
                            })

                        }
                    })
                })
            } else {
                alert("请先登录")
            }
        })
    } else {
        axios.get("http://localhost:3000/productlist", {
            params: {
                id: Id
            }
        }).then(bbb => {
            let oDetail = document.getElementById("detail");
            oDetail.innerHTML = `
            <img src="${bbb.data[0].imgUrl}">
            <p>${bbb.data[0].title}</p>
            <p>${bbb.data[0].price}</p>
            <span>-</span><input type="text" value="1"><span>+</span>
            <input type="button" value="加入购物车" id="addBtn">
        `;
            $("#detail span").eq(0).click(function() {
                let num = $("#detail input").eq(0).val();
                num--;
                if (num < 1) {
                    num = 1;
                }
                $("#detail input").eq(0).val(num);
            })
            $("#detail #detail span").eq(1).click(function() {
                let num = $("input").eq(0).val();
                num++;
                $("#detail input").eq(0).val(num);
            })
            $("#detail input").eq(0).change(function() {
                let num = $("#detail input").eq(0).val();
                if (num < 1) {
                    num = 1;
                }
                $("#detail input").eq(0).val(num);
            })
            if (user) {
                $("#addBtn").click(function() {
                    axios.get("http://localhost:3000/carts", {
                        params: {
                            username: user,
                            id: Id
                        }
                    }).then(add => {
                        if (add.data.length == 0) {
                            axios.post("http://localhost:3000/carts", {
                                username: user,
                                id: Id,
                                title: $("#detail p:first").text(),
                                price: $("#detail p:last").text(),
                                imgUrl: $("#detail img").attr("src"),
                                shu: $("#detail :text").val()
                            })
                        } else {
                            axios.get("http://localhost:3000/carts", {
                                params: {
                                    username: user,
                                    id: Id
                                }
                            }).then(gai => {
                                let num = Math.floor(gai.data[0].shu);
                                num += Math.floor($("#detail :text").val())
                                axios.patch(`http://localhost:3000/carts/${Id}`, {
                                    shu: num
                                })
                            })

                        }
                    })
                })
            } else {
                alert("请先登录") ++
                    window.location.href = "login.html"
            }
        })
    }
})