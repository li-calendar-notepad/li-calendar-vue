<template>
    <el-main style="padding:20px;max-width:500px">
        <!-- <h2>邮箱设置</h2> -->
        <el-form :model="appSetting" ref="appSettingRef" :rules="appSettingRules" label-width="auto">
            <el-divider content-position="left">{{$t('login.login')}}{{$t('common.setting')}}</el-divider>
            <el-form-item :label="$t('adminSiteSetting.TurnOnGraphicCaptcha')">
                <el-switch v-model="appSetting.loginCaptcha" />
            </el-form-item>
            <el-divider content-position="left">{{$t('login.register')}}{{$t('common.setting')}}</el-divider>
            <el-form-item :label="$t('adminSiteSetting.registerOpenUp')">
                <el-switch v-model="appSetting.openRegister" />
            </el-form-item>
            <el-form-item :label="$t('adminSiteSetting.registerRestrictMailSuf')">
                <el-input v-model="appSetting.emailSuffix" type="text" placeholder="eg:@qq.com" />
                
                <div class="e-secondary-text" style="line-height:normal;">{{$t('adminSiteSetting.registerRestrictMailSufContent')}}</div>
            </el-form-item>
            <el-divider content-position="left">{{$t('common.other')}}</el-divider>
            <el-form-item :label="$t('adminSiteSetting.siteAddress')" prop="webSiteUrl">
                <el-input v-model="appSetting.webSiteUrl" :placeholder="$t('adminSiteSetting.siteAddressPlaceholder')" />
                <el-button size="small" style="margin-top:10px" @click="appSetting.webSiteUrl=getCurrentDomain()">{{$t('adminSiteSetting.siteGetCurrentUrl')}}</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="passformOnSubmit(appSettingRef)">{{$t('common.save')}}</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import apiSystemSetting from "../../api/admin/systemSetting";
import inputValidate from "../../utils/validate";
import { useI18n } from "vue-i18n";
const $i18n=useI18n();
const appSettingRef=ref()
const validatorUrl = (rule, value, callback) => {
    if (!inputValidate.isURL(value)) {
        callback($i18n.t('adminSiteSetting.siteAddressFormatError'))
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
                ElMessage.success($i18n.t('common.save_success'))
            }, (d) => {
                ElMessage.warning($i18n.t('common.save_error') +","+ d.msg)
            })
        }

    })

}

const getCurrentDomain = () => {
    return location.protocol + "//" + location.hostname + (location.port == "" ? "" : (":" + location.port));
}
</script>
