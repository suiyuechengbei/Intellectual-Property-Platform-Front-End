/**
 * @author cmf
 * @file 验证表单数据
 */
/**
 * 获取用户信息
 */
window.onload = function () {
    $.ajax({
        type: 'GET',
        url: "http://60.205.224.92/data/gtchMain/test/account/getUserInfo",
        beforeSend: function (xhr) {
            console.log(localStorage.getItem('mrpc-auth-id'));
            xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data, status, xhr) {
            if(data.status==='UNAUTHORIZATION'){
                window.location.href = "../login/login.html";
                return;
            }
            console.log(data);
            localStorage.setItem('mrpc-auth-id', xhr.getResponseHeader('mrpc-auth-id'));
            $(".top_bar_right_username").text(data.data.username);
            $("#form_account").val(data.data.phone);
            $("#form_name").val(data.data.name);
            $("#form_company").val(data.data.company);
            $("#form_role").val(data.data.role);
            $("#form_program").val(data.data.project);
            $("#form_registrationTime").val(data.data.registerDate);
            $("#form_recentLogin").val(data.data.lastLoginTime);
        }
    });
    $("#personalData").addClass("selected");
    $(".personalData-box").show();
    $(".managePassword-box").hide();
}

/**
 * 验证表单数据不为空
 * 更新资料
 */
$("#form_submit").click(function () {
    let map = new Map([['form_account', '账号'],
    ['form_name', '姓名'],
    ['form_company', '单位名称'],
    ['form_role', '角色'],
    ['form_program', '管理项目'],
    ['form_registrationTime', '注册时间'],
    ['form_recentLogin', '最近登录']]);
    let flag = true;
    map.forEach(function (value, key) {
        if ($("#" + key).val() == '') {
            flag = false;
            alert(value + "不为空");
        }
    });
    if (flag) {
        $.ajax({
            type: "POST",
            url: "http://60.205.224.92/data/gtchMain/test/account/modifyUserInfo",
            beforeSend: function (xhr) {
                console.log(localStorage.getItem('mrpc-auth-id'));
                xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                name: $("#form_name").val(),
                company: $("#form_company").val()
            },
            success: function (data, status, xhr) {
                console.log(data);
                localStorage.setItem('mrpc-auth-id', xhr.getResponseHeader('mrpc-auth-id'));
                alert("更新资料成功");
            }
        });
    }
});

/**
 * 验证表单数据不为空
 * 修改密码
 */
$("#password_submit").click(function () {
    let map = new Map([['form_original', '原密码'],
    ['form_new', '新密码'],
    ['form_confirm', '确认密码']]);
    let flag = true;
    map.forEach(function (value, key) {
        if ($("#" + key).val() == '') {
            flag = false;
            alert(value + "不为空");
        }
    });
    if ($("#form_new").val() != $("#form_confirm").val()) {
        alert("两次密码不一致");
    }
    if (flag) {
        $.ajax({
            type: "POST",
            url: "http://60.205.224.92/data/gtchMain/test/account/modifyPassword",
            beforeSend: function (xhr) {
                console.log(localStorage.getItem('mrpc-auth-id'));
                xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                oldPassword: $("#form_original").val(),
                newPassword: $("#form_new").val()
            },
            success: function (data, status, xhr) {
                console.log(data);
                localStorage.setItem('mrpc-auth-id', xhr.getResponseHeader('mrpc-auth-id'));
                alert("修改密码成功");
            }
        });
    }
});

/**
* 验证手机号是否符合格式
* @param {Number}tel 手机号码
*/
function checkTel(tel) {
    var reg = /^1\d{10}$/;
    if (reg.test(tel)) return true;
    else return false;
}

/**
* 选择“个人资料”
*/
$("#personalData").click(function () {
    $(".userInfo").show();
    $("#personalData").addClass("selected");
    $(".userPwd").hide();
    $("#managePassword").removeClass("selected");
});

/**
* 选择“密码管理”
*/
$("#managePassword").click(function () {
    $(".userInfo").hide();
    $("#personalData").removeClass("selected");
    $(".userPwd").show();
    $("#managePassword").addClass("selected");
});