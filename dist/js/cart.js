var user = JSON.parse(localStorage.getItem("username"));
var ct = "";
axios.get("http://localhost:3000/carts", {
    params: {
        username: user
    }
}).then(cart => {
    console.log(cart);
    if (cart.data.length != 0) {
        for (let i in cart.data) {
            ct += `
        <li data-id="${cart.data[i].id}">
            <input type="checkbox" class="ck">
            <img src="${cart.data[i].imgUrl}">
            <span>${cart.data[i].title}</span>
            <span class="perPrice">${cart.data[i].price}</span>
            <span class="minus" uid="${cart.data[i].id}">-</span>
            <input type="text" value="${cart.data[i].shu}" class="num" uid="${cart.data[i].id}">
            <span class="plus" uid="${cart.data[i].id}">+</span>
            <span class="perTotalPrice">${cart.data[i].price*cart.data[i].shu}</span>
            <span class="del" uid="${cart.data[i].id}">x</span>
        </li>
        `;
            var zj = $("#totalPrice").text()
            zj += $(".perTotalPrice").text()
        }
        $("#cartList").html(ct)
        $(".del").click(function() {
            axios.delete(`http://localhost:3000/carts/${$(this).attr("uid")}`, location.reload())
        })
        $(".minus").click(function() {
            var num = $(this).next().val()
            num--
            axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
                shu: num
            }).then(function() {
                location.reload()
            })
        })
        $(".plus").click(function() {
            var num = $(this).prev().val()
            num++
            axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
                shu: num
            }).then(function() {
                location.reload()
            })
        })
        $(".num").blur(function() {
            var num = $(this).val()
            axios.patch(`http://localhost:3000/carts/${$(this).attr("uid")}`, {
                shu: num
            }).then(function() {
                location.reload()
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
    }
})