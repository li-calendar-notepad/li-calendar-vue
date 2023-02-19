<template>
    <el-main style="padding:20px;max-width:500px">
        <!-- <h2>邮箱设置</h2> -->
        <el-form :model="appSetting" ref="appSettingRef" :rules="appSettingRules" label-width="120px">
            <el-divider content-position="left">登录设置</el-divider>
            <el-form-item label="开启图形验证码">
                <el-switch v-model="appSetting.loginCaptcha" />
            </el-form-item>
            <el-divider content-position="left">注册设置</el-divider>
            <el-form-item label="开放注册">
                <el-switch v-model="appSetting.openRegister" />
            </el-form-item>
            <el-form-item label="限制邮箱后缀">
                <el-input v-model="appSetting.emailSuffix" type="text" placeholder="eg:@qq.com" />
                
                <div class="e-secondary-text" style="line-height:normal;">限制新注册邮箱的后缀，一般用于企业邮箱。后台添加用户不受影响</div>
            </el-form-item>
            <el-divider content-position="left">其他</el-divider>
            <el-form-item label="站点地址" prop="webSiteUrl">
                <el-input v-model="appSetting.webSiteUrl" placeholder="应用于外部跳转到主站，例如邮件内等" />
                <el-button size="small" style="margin-top:10px" @click="appSetting.webSiteUrl=getCurrentDomain()">获取当前地址</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="passformOnSubmit(appSettingRef)">保存</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import apiSystemSetting from "../../api/admin/systemSetting";
import inputValidate from "../../utils/validate";

const appSettingRef=ref()
const validatorUrl = (rule, value, callback) => {
    if (!inputValidate.isURL(value)) {
        callback("网站地址格式不正确")
    } else {
        callback()
    }
}

const appSettingRules = reactive({
    "webSiteUrl": [
        { validator: validatorUrl, trigger: 'blur' },
    ],
})

const appSetting = ref({
    emailSuffix: "",
    openRegister: false,
    webSiteUrl: "",
})

apiSystemSetting.getApplicationSetting((d) => {
    appSetting.value = d
})

const passformOnSubmit = (appSettingRef) => {
    console.log(appSetting.value)
    appSettingRef.validate((valid) => {
        if (valid) {
            apiSystemSetting.setApplicationSetting(appSetting.value, (d) => {
                ElMessage.success("保存成功")
            }, (d) => {
                ElMessage.warning("保存失败，" + d.msg)
            })
        }

    })

}

const getCurrentDomain = () => {
    return location.protocol + "//" + location.hostname + (location.port == "" ? "" : (":" + location.port));
}
</script>
