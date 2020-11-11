var btn = document.querySelectorAll("button")
var su = ""
btn[0].onclick = function() {
    var name = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    axios.get("http://localhost:3000/user", {
        params: {
            username: name,
            password: pass
        }
    }).then(res => {
        console.log(res);
        su = res.data.length
        if (su == 0) {
            alert("用户名或密码错误")
        } else {
            window.location.href = "index.html";
            localStorage.setItem("username", JSON.stringify($("#username").val()))
        }
    })
}