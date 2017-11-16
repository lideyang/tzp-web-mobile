/**
 * Created by lidy on 2017/11/15.
 */
//设置rem
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

+function () {
    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");
    var $regForm = $('#regForm').validate({
        // 验证规则
        rules: {
            userMobile: {
                required: true,
                isMobile: true
            },
            userPassword: {
                required: true,
                minlength: 6
            },
            code: {
                required: true,
                minlength: 7,
                maxlength: 7
            }
        },
        // 设置错误信息
        messages: {
            userMobile: {
                required: "请输入手机号",
                isMobile: "请输入正确的手机号码"
            },
            userPassword: {
                required: '请输入登录密码',
                minlength: '请输入正确的密码',
            },
            code: {
                required: "请输入验证码",
                isNumber: "请输入正确的验证码",
                minlength: "请输入7位验证码",
                maxlength: "验证码错误"
            }
        },
        // 错误信息显示
        errorPlacement: function (error, element) {
        },
        //验证成功
        success: function (error, element) {
        },
        // 错误信息显示
        invalidHandler: function (form, validator) { //错误提示
            $.each(validator.errorList, function (key, value) {
                alert(value.message);
                return false;
            });
        },
        submitHandler: function (form) { //验证通过提交表单
            if ($('#agreeCheckbox').is(':checked')) {
                $(form)[0].submit();
            } else {
                alert('必须同意注册协议');
            }
        }
    });
    //发送验证码
    $("#sendCodeBtn").on('click', function () {
        if ($regForm.element($("#userMobile"))) {
            $(this).CountDown({
                data: {
                    Mobile: $('#userMobile').val()
                },
                isMsg: false,
                isCallBack: function(){

                },//回调信息字段
                start: true,
                isSeed: true,
                isClick: false,
                url: '/mock/seedCode.json'
            });
        }
    });
}();