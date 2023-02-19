<template>
    <div class="register-container">
        <el-form size="large" :model="form" ref="ruleFormRef" :rules="rules" class="register-form">
            <h3 class="register-title  e-primary-text">{{ $t('common.appName') }} - {{ $t('resetPassword.title') }}</h3>
            <el-form-item class="register-input" prop="username">
                <el-input prefix-icon="Message" :placeholder="$t('register.usernamePlaceholder')" v-model="form.username" type="text">
                </el-input>
            </el-form-item>
            <el-form-item class="register-input" prop="emailcode">
                <el-input :placeholder="$t('register.vCodePlaceholder')" style="width: 200px;" v-model="form.mailcode">
                </el-input>
                <el-button @click="sendmail(ruleFormRef)" style="margin-left: auto;" :disabled="checkCodeBtn.disable"
                    type="primary">
                    {{
                    checkCodeBtn.text
                    }}
                </el-button>
            </el-form-item>
            <el-form-item v-if="form.mailcode" class="register-input" prop="passwd">
                <el-input prefix-icon="lock" :placeholder="$t('register.passwordPlaceholder')" v-model="form.passwd" type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item v-if="form.mailcode" class="register-input" prop="passwd_again">
                <el-input prefix-icon="lock" :placeholder="$t('register.passwordAgainPlaceholder')" v-model="form.passwd_again" type="password"
                    show-password></el-input>
            </el-form-item >
            <el-form-item>
                <el-button type="primary" @click="summit(ruleFormRef)" class="register-button">{{ $t('common.commit')}}</el-button>
            </el-form-item>
            <el-form-item label-width="0">
                <el-link type="primary" @click="goToLogin()">{{ $t('register.goToLogin')}}</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>



<script setup>
import { ref, reactive } from 'vue';
import router from '../../router/index'
import apiLogin from '../../api/login.js'
import { useI18n } from 'vue-i18n'
import { flatMap } from 'lodash';
import { ElMessage } from 'element-plus';

const $18n = useI18n()
const form = reactive({
    email: "",
    username: "",
    passwd: "",
    passwd_again: "",
    mailcode: ""
})
const ruleFormRef = ref()

let checkCodeBtn = reactive({
    text: $18n.t('common.getVCode'),
    duration: 60,
    timer: null,
    disable: false,
})

const checkPasswd = (rule, value, callback) => {
    if (value == "") {
        return callback(new Error($18n.t('form.passwordAgain')))
    }
    if (form.passwd != value) {
        return callback(new Error($18n.t('form.twoPasswordNotAlike')))
    }
    callback()
}


const rules = reactive({
    // email: [
    //     { type: "email", required: true, message: $18n.t("register.email_empty"), trigger: 'blur' }
    // ],
    username: [
        { required: true, message: $18n.t("form.required"), trigger: 'blur' },
        { type: "email", required: true, message: $18n.t("form.required"), trigger: 'blur' }
    ],
    passwd: [
        { required: true, message: $18n.t("form.required"), trigger: 'blur' }
    ],
    passwd_again: [
        { required: true, message: $18n.t("form.twoPasswordNotAlike"), trigger: 'blur' },
        { validator: checkPasswd, trigger: "blur" }
    ],
})

const goToLogin=()=>{
    router.push({ path:"/login" });
}



function summit(ruleFormRef) {
    addEmailValid()
    ruleFormRef.validate((valid) => {
        if (valid) {
            apiLogin.resetPasswordByVCode(form.username, form.passwd, form.mailcode, () => {
                ElMessage({
                    // duration: 5000,
                    showClose: true,
                    dangerouslyUseHTMLString:true,
                    type: "success",
                    message:$18n.t("resetPassword.success")
                })
                setTimeout(() => {
                    goToLogin()
                }, 2000);
            })
        }
    })

}

function addEmailValid() {
    rules.mailcode = [
        { required: true, message: $18n.t("register.email_code_empty"), trigger: 'blur' },
    ]
}
function deleteEmailValid() {
    delete rules.mailcode
}

function sendmail(ruleFormRef) {
    deleteEmailValid()
    ruleFormRef.validate((valid) => {
        if (valid) {
            checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
            apiLogin.sendResetPasswordVCode(form.username,()=>{
                if (checkCodeBtn.disable != 60) {
                    checkCodeBtn.disable = true
                }
                ElMessage.success($18n.t("common.sendVCodeMailSuccess"))
                checkCodeBtn.timer = setInterval(() => {
                    const tmp = checkCodeBtn.duration--
                    checkCodeBtn.text = `${tmp} S`
                    if (tmp <= 0) {
                        clearInterval(checkCodeBtn.timer)
                        checkCodeBtn.duration = 60
                        checkCodeBtn.text = $18n.t("common.getAgain")
                        checkCodeBtn.disable = false
                    }
                }, 1000)
            },()=>{
                
            })
        }

    })
}


</script>

<script>
export default {
    name: "register"
}
</script>

<style scoped>
.register-form {
    width: 350px;
    margin: 180px auto;
    box-shadow: 0 0 15px #d4d4d4;
    /* background: #fff; */
    padding: 35px 35px 15px 35px;
    border-radius: 10px;
}

.register-title {
    text-align: center;
    margin: 0 40px auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, Arial, sans-serif;
}

.register-input {
    margin: 15px auto;
    padding: 8px 8px 10px 5px;
}

.register-button {
    width: 100%;
    padding: 8px 8px 10px 5px;
    margin-left: 5px;
    margin-right: 5px;
}

</style>
