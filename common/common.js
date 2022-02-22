/**
 * @author cmf
 * @file 验证手机号
*/
var step = 1;
var firstBan = false;
var secondBan = false;
var firstCode = $("#stepOne_sendCode");
var secondCode = $("#stepTwo_sendCode");
var stepOne = $(".container_right_center_stepOne");
var stepTwo = $(".container_right_center_stepTwo");
var stepThree = $(".container_right_center_stepThree");
var circleMiddle = $(".container_right_center_number_circle-middle");
var circleRight = $(".container_right_center_number_circle-right");
var numberMiddle = $("#number-middle");
var numberRight = $("#number-right");
var circleMiddleText = $(".container_right_center_number_circle-middle-text");
var circleRightText = $(".container_right_center_number_circle-right-text");
var alertText = $(".container_right_center_alert");

/**
* 步骤1刷新状态
*/
if (step == 1) {
    circleMiddle.addClass("circle");
    circleRight.addClass("circle");
    numberMiddle.addClass("number");
    numberRight.addClass("number");
    circleMiddleText.addClass("text");
    circleRightText.addClass("text");
    stepTwo.hide();
}

/**
* 更改当前状态
*@param {Number}step 当前步骤
*/
function flush(step) {
    if (step == 2) {
        circleMiddle.removeClass("circle");
        numberMiddle.removeClass("number");
        numberMiddle.addClass("nextNumber");
        circleMiddleText.removeClass("text");
        stepOne.hide();
        stepTwo.show();
    } else if (step == 3) {
        circleRight.removeClass("circle");
        numberRight.removeClass("number");
        numberRight.addClass("nextNumber");
        circleRightText.removeClass("text");
        stepTwo.hide();
        stepThree.show();
    }
}

/**
* 倒计时
*@param {Number}num 倒计时秒数
*/
function firstTime(num) {
    if (num == 1) {
        num = 60;
        firstCode.text("发送验证码");
        firstCode.removeClass("gray");
        firstBan = false;
    } else {
        num--;
        firstCode.text(num + "秒后再发送");
        setTimeout(function () {
            firstTime(num);
        }, 1000);
    }
}

/**
* 倒计时
*@param {Number}num 倒计时秒数
*/
function secondTime(num) {
    if (num == 1) {
        num = 60;
        secondCode.text("发送验证码");
        secondCode.removeClass("gray");
        secondBan = false;
    } else {
        num--;
        secondCode.text(num + "秒后再发送");
        setTimeout(function () {
            secondTime(num);
        }, 1000);
    }
}

firstCode.on('click', function () {
    event.preventDefault();
    if (!checkTel($("#stepOne_telephone").val())) {
        alertText.html("手机号不符合格式");
        return;
    } else {
        alertText.html("");
        $.ajax({
            type: "GET",
            url: "http://60.205.224.92/data/gtchMain/test/account/sendValidationCode",
            beforeSend: function (xhr) {
                console.log(localStorage.getItem('mrpc-auth-id'));
                xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                type: "OLD"
            },
            success: function (data, status,xhr) {
                localStorage.setItem('mrpc-auth-id',xhr.getResponseHeader('mrpc-auth-id'));
                alert(data.data.validationCode);
            }
        });
    }
    if (!firstBan) {
        firstBan = true;
        firstCode.addClass("gray");
        firstTime(60);
    } else {
        alert("操作太频繁，稍后再操作");
    }
});

secondCode.on('click', function () {
    event.preventDefault();
    if (!checkTel($("#stepTwo_telephone").val())) {
        alertText.html("手机号不符合格式");
        return;
    } else {
        alertText.html("");
        $.ajax({
            type: "GET",
            url: "http://60.205.224.92/data/gtchMain/test/account/sendValidationCode",
            beforeSend: function (xhr) {
                console.log(localStorage.getItem('mrpc-auth-id'));
                xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                type: "NEW",
                newPhone: $("#stepTwo_telephone").val()
            },
            success: function (data, status,xhr) {
                localStorage.setItem('mrpc-auth-id',xhr.getResponseHeader('mrpc-auth-id'));
                alert(data.data.validationCode);
            }
        });
    }
    if (!secondBan) {
        secondBan = true;
        secondCode.addClass("gray");
        secondTime(60);
    } else {
        alert("操作太频繁，稍后再操作");
    }
});

/**
* 验证输入合法性
*/
function isValid() {
    if (step === 1) {
        if ($("#stepOne_telephone").val() == '' || $("#stepOne_code").val() == '') {
            alertText.html("手机号码/验证码不能为空");
            return false;
        } else if (!checkTel($("#stepOne_telephone").val())) {
            alertText.html("该账号不存在");
            return false;
        } else {
            alertText.html("");
            $.ajax({
                type: "POST",
                url: "http://60.205.224.92/data/gtchMain/test/account/modifyPhone",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    phone: $("#stepOne_telephone").val(),
                    validationCode: $("stepOne_code").val()
                },
                success: function (data, status,xhr) {
                    localStorage.setItem('mrpc-auth-id',xhr.getResponseHeader('mrpc-auth-id'));
                    step = 2;
                    flush(step);
                    return true;
                }
            });
        }
    } else {
        if ($("#stepTwo_telephone").val() == '' || $("#stepTwo_code").val() == '') {
            alertText.html("手机号码/验证码不能为空");
            return false;
        } else if (!checkTel($("#stepTwo_telephone").val())) {
            alertText.html("该账号不存在");
            return false;
        } else {
            alertText.html("");
            $.ajax({
                type: "POST",
                url: "http://60.205.224.92/data/gtchMain/test/account/modifyPhone",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('mrpc-auth-id', localStorage.getItem('mrpc-auth-id'));
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    phone: $("#stepTwo_telephone").val(),
                    validationCode: $("stepTwo_code").val()
                },
                success: function (data, status,xhr) {
                    localStorage.setItem('mrpc-auth-id',xhr.getResponseHeader('mrpc-auth-id'));
                    step = 3;
                    flush(step);
                    return true;
                }
            });
        }
    }
}

/**
* 验证手机号是否符合格式
* @param {Number}tel 手机号码
*/
function checkTel(tel) {
    return true;//test
    var reg = /^1\d{10}$/;
    if (reg.test(tel)) return true;
    else return false;
}

$(".container_right_center_stepThree_login_btn").click(function () {
    window.location.href = "#";
});

$(".container_right_close").click(function () {
    window.location.href = "#";
});