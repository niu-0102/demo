$(".btn").click(function() {
    var username = $("#uusername").val();
    var password = $("#password").val();
    $.get("http://jx.xuzhixiang.top/ap/api/login.php", {
        username: $("#username").val(),
        password: $("#password").val()
    }).then(data => {
        if (data.code == 0) {
            $("#errormessage").text("用户名或密码错误");
        } else if (data.code == 1) {
            window.location.href = "index.html";
            localStorage.setItem("username", JSON.stringify($("#username").val()));
        }

    })
})

(function ulogin() {
    //获取用户名和密码,登录成功以后，把用户名存储在session里面，然后显示在首页里面
    var username = $("#uusername").val();
    var password = $("#password").val();
    $.ajax({
        method: 'post',
        url: "http://localhost:8080/LawerSys/user_l.action",
        dataType: "text",
        data: {
            username: username,
            password: password
        },
        success: function(ret) {
            //提示注册成功
            if (ret == "success") {
                //关闭模态框
                $(".btn").click();
                //把用户名密码存储在session里面，首页显示用户名称
                localStorage.setItem("username", username);
                load_data();
            } else {
                alert("用户名或者密码输入错误，请重新输入");
                $("#password").val('');
            }


        },
    })
})()

function load_data() {
    var theme = localStorage.getItem("username");
    if (theme == null || theme == "") {
        $("#cue").show();
        $("#uname").html('');
    } else {
        $("#cue").hide();
        $("#uname").html(theme);
    }
}