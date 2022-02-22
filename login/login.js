var eye = $(".container_right_center_pwdBox_pwd-eye");
var pwd = $("#input-password");
var isClose = true;

for (let i = 0; i < eye.length; i++) {
    eye.eq(i).click(function () {
        if (isClose) {
            isClose = false;
            eye.eq(0).hide();
            eye.eq(1).hide();
            eye.eq(2).show();
            pwd.attr("type", "text");
        } else {
            isClose = true;
            eye.eq(0).show();
            eye.eq(1).show();
            eye.eq(2).hide();
            pwd.attr("type", "password");
        }
    });
}


/**
* 验证手机号是否符合格式
*/
function checkTel(tel) {
    return true;    //test
    var reg = /^1\d{10}$/;
    if (reg.test(tel)) return true;
    else return false;
}

/**
* 验证输入合法性
*/
$("#input-submit").click(function isValid() {
    var telAlert = $(".container_right_center_tel-alert");
    var pwdAlert = $(".container_right_center_pwd-alert");
    if ($("#input-telephone").val() == '') {
        telAlert.html("账号不能为空");
        telAlert.show();
        pwdAlert.hide();
        return false;
    } else if ($("#input-password").val() == '') {
        telAlert.hide();
        pwdAlert.show();
        return false;
    } else if (!checkTel($("#input-telephone").val())) {
        telAlert.html("该账号不存在");
        telAlert.show();
        pwdAlert.hide();
        return false;
    } else {
        telAlert.hide();
        pwdAlert.hide();
        let telephone = $("#input-telephone").val();
        let password = $("#input-password").val();
        $.ajax({
            type: 'POST',
            url: "http://60.205.224.92/data/gtchMain/test/account/login",
            data: {
                username: telephone,
                password: password
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data, status, xhr) {
                if (data.status == "SUCCESS") {
                    localStorage.setItem('mrpc-auth-id',xhr.getResponseHeader('mrpc-auth-id'));
                    window.location.href = "../personalCenter/personalCenter.html";
                } else {
                    alert("用户名或密码错误");
                }
            }
        });
    }
});

$(".container_right_center_forget_text").click(function () {
    window.location.href = "../forget/forget.html";
});