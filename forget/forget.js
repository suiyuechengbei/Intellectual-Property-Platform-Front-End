var step = 1;
var ban = false;
var sendCode = $("#sendCode");
var stepOne = $(".container_right_center_stepOne");
var stepTwo = $(".container_right_center_stepTwo");
var stepThree = $(".container_right_center_stepThree");
var circleMiddle = $(".container_right_center_number_circle-middle");
var circleRight = $(".container_right_center_number_circle-right");
var numberMiddle = $("p:eq(4)");
var numberRight = $("p:eq(5)");
var circleMiddleText = $("p:eq(7)");
var circleRightText = $("p:eq(8)");
var eye = $(".container_right_center_eye");
var pwdUpper = $(".container_right_center_stepTwo_pwdBox_pwd-upper");
var pwdLower = $(".container_right_center_stepTwo_pwdBox_pwd-lower");
var isCloseUpper = true;
var isCloseLower = true;
var alertText = $(".container_right_center_alert");

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
function setTime(num) {
    if (num == 1) {
        num = 60;
        sendCode.text("发送验证码");
        sendCode.removeClass("disabled");
        ban = false;
    } else {
        num--;
        sendCode.text(num + "秒后再发送");
        setTimeout(function () {
            setTime(num);
        }, 1000);
    }
}

sendCode.on('click', function () {
    event.preventDefault();
    if (!checkTel($("#input-telephone").val())) {
        alertText.html("该账号不存在");
        return;
    } else {
        alertText.html("");
    }
    if (!ban) {
        ban = true;
        sendCode.addClass("disabled");
        setTime(60);
    } else {
        alert("操作太频繁，稍后再操作");
    }
});

/**
* 验证输入合法性
*/
function isValid() {
    if (step === 1) {
        if ($("#input-telephone").val() == '' || $("#code").val() == '') {
            alertText.html("手机号码/验证码不能为空");
            return false;
        } else if (!checkTel($("#input-telephone").val())) {
            alertText.html("该账号不存在");
            return false;
        } else {
            alertText.html("");
            step = 2;
            flush(step);
            return true;
        }
    } else {
        if (pwdUpper.val() == '' || pwdLower.val() == '') {
            alertText.html("密码/确认密码不能为空");
            return false;
        } else if (pwdUpper.val() != pwdLower.val()) {
            alertText.html("密码与确认密码不一致");
            return false;
        } else {
            alertText.html("");
            step = 3;
            flush(step);
            return true;
        }
    }
}

/**
* 验证手机号是否符合格式
*/
function checkTel(tel) {
    var reg = /^1\d{10}$/;
    if (reg.test(tel)) return true;
    else return false;
}

for (let i = 0; i < 3; i++) {
    eye.eq(i).click(function () {
        if (isCloseUpper) {
            isCloseUpper = false;
            eye.eq(0).hide();
            eye.eq(1).hide();
            eye.eq(2).show();
            pwdUpper.attr("type", "text");
        } else {
            isCloseUpper = true;
            eye.eq(0).show();
            eye.eq(1).show();
            eye.eq(2).hide();
            pwdUpper.attr("type", "password");
        }
    });
}

for (let i = 3; i < 6; i++) {
    eye.eq(i).click(function () {
        if (isCloseLower) {
            isCloseLower = false;
            eye.eq(3).hide();
            eye.eq(4).hide();
            eye.eq(5).show();
            pwdLower.attr("type", "text");
        } else {
            isCloseUpper = true;
            eye.eq(3).show();
            eye.eq(4).show();
            eye.eq(5).hide();
            pwdLower.attr("type", "password");
        }
    });
}

$(".container_right_center_stepThree_login_btn").click(function () {
    window.location.href = "../login/login.html";
});