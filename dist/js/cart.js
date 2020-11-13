var user = JSON.parse(localStorage.getItem("username"));
var ct = "";
axios.get("http://localhost:3000/carts", {
    params: {
        username: user
    }
}).then(cart => {
    console.log(cart);

    for (let i in cart.data) {
        ct += `
        <li data-id="${cart.data[i].id}">
            <input type="checkbox" class="ck">
            <img src="${cart.data[i].imgUrl}">
            <span class="span1">${cart.data[i].title}</span>
            <span class="perPrice">${cart.data[i].price}</span>
            <span class="minus" uid="${cart.data[i].id}">-</span>
            <input type="text" value="${cart.data[i].shu}" class="num" uid="${cart.data[i].id}">
            <span class="plus" uid="${cart.data[i].id}">+</span>
            <span class="perTotalPrice">${parseInt(cart.data[i].price*cart.data[i].shu)}</span>
            <span class="del" uid="${cart.data[i].id}">x</span>
        </li>
        `;
        var dj = $(".perPrice").text()
        var dzj = parseInt($(".perTotalPrice").text())
        var zj = $("#totalPrice").text()
        zj += $(".perTotalPrice").text()
    }
    $("#cartList").html(ct)
    $(".del").click(function() {
        $(this).parent("li").remove()
        axios.delete(`http://localhost:3000/carts/${$(this).attr("uid")}`, {

        }).then(arr => {
            getTotal()
            $("#checkAll").change(function() {
                //先判断这个全选的是不是选中了
                if ($("#checkAll").prop("checked") == true) {
                    //选中了就下面所有的checked选中
                    $(".ck").prop("checked", true);
                } else {
                    $(".ck").prop("checked", false);
                }
                getTotal();
            });
            $(".ck").change(function() {
                var lis = $(".ck");
                var liss = true;
                //for循环判断每个商品的选择框是不是选中了
                for (var i = 0; i < $(".ck").length; i++) {
                    if (liss = liss && $(lis[i]).prop("checked") == true) {
                        $("#checkAll").prop("checked", true);
                    } else {
                        $("#checkAll").prop("checked", false);
                    }
                }
                getTotal();
            });
        })

    })
    $(".minus").click(function() {
        var num = $(this).next().val()
        num--
        $(this).next().val(num)
        var dzj = $(this).next().next().next().text()
        var dj = $(this).prev().text()
        dzj = parseInt(dj * num);
        $(this).next().next().next().text(dzj)
        getTotal()
        axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
            shu: num
        })
    })
    $(".plus").click(function() {
        var num = $(this).prev().val()
        num++
        $(this).prev().val(num)
        var dzj = $(this).next().text()
        var dj = $(this).prev().prev().prev().text()
        dzj = parseInt(dj * num);
        $(this).next().text(dzj)
        getTotal()
        axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
            shu: num
        })
    })
    $(".num").blur(function() {
        var num = $(this).val()
        var dj = $(this).prev().prev().text()
        var dzj = $(this).next().next().text()
        dzj = parseInt(dj * num)
        $(this).next().next().text(dzj)
        axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
            shu: num
        })
    })
    $("#checkAll").change(function() {
        //先判断这个全选的是不是选中了
        if ($("#checkAll").prop("checked") == true) {
            //选中了就下面所有的checked选中
            $(".ck").prop("checked", true);
        } else {
            $(".ck").prop("checked", false);
        }
        getTotal();
    });
    $(".ck").change(function() {
        var lis = $(".ck");
        var liss = true;
        //for循环判断每个商品的选择框是不是选中了
        for (var i = 0; i < $(".ck").length; i++) {
            if (liss = liss && $(lis[i]).prop("checked") == true) {
                $("#checkAll").prop("checked", true);
            } else {
                $("#checkAll").prop("checked", false);
            }
        }
        getTotal();
    });

    function getTotal() {
        var sum = 0;
        $(".ck").each(function() {
            if (this.checked == true) {
                var id = $(this).parent().find('.perTotalPrice').text();
                sum += Number(id);
            }
        })
        $("#totalPrice").text(sum);
    }

})