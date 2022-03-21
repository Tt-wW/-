import {
    extend,
    localize
} from "vee-validate";
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';


extend('required',required)
extend('confirmed',{
    ...confirmed,
    message:'两次密码不正确哦'
})


// 正则==》电话号码
extend('isPhone',{
    validate:value=>{ 
        return /^1\d{10}$/.test(value)
    },
    message:'请输入正确的手机号'
})

extend('isCheck',{
    validate:value=>{
        return value
    },
    message:'请勾选协议'
})

localize({
    'zh-CN': {
        names: {
            phone: '手机号',
            code: '验证码',
            password: '密码',
            password1: '确认密码',
            isCheck: '协议'
        },
        messages: {
            ...zh_CN.messages,
            required:'请输入{_field_}',
            phone:'请输入手机号码',
            code:'验证码错误',
            isCheck:'请勾选协议',
            password1:'密码不一致'
        }
    }
})

localize('zh-CN')