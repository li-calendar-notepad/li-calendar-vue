<template>
  <div :style='pageStyleObj'>

    <!-- 蒙版 -->
    <div class="mask">
      <div>
        <el-form ref="ruleFormRef" @keyup.enter="onSubmit(ruleFormRef)" size="large" :model="form" :rules="rules" label-width="80px" class="login-box">
          <h3 class="login-title e-primary-text">{{ $t('common.appName') }} - {{ $t('login.login') }}</h3>
          <el-form-item prop="username" label-width="0">
            <div class="login-form-item" style="width:100%">
              <el-input type="text" prefix-icon="avatar" :placeholder="$t('common.username')" v-model="form.username" />
            </div>
          </el-form-item>
          <el-form-item prop="password" label-width="0">
            <div class="login-form-item" style="width:100%">
              <el-input type="password" prefix-icon="lock" :placeholder="$t('common.password')"
                v-model="form.password" />
            </div>
          </el-form-item>
          <el-form-item prop="vcode" :inline="true" v-if="loginCaptchaDisplay" label-width="0" style="width:100%;">
            <span
              style="width:120px;cursor: pointer;display:flex;border-radius: 5px; overflow:hidden;height:38px;border: 1px solid #dcdfe6"
              :title="$t('login.clickCaptcha')">
              <el-image style="width: 100%;height:100%" :src="vCodeImgSrc" @click="vcodeReplace"> </el-image>
            </span>
            <span style="width:calc(100% - 130px);margin-left:auto;display:flex;">
              <el-input type="text" :placeholder="$t('login.captchaPlaceholder')" v-model="form.vcode" />
            </span>
          </el-form-item>
          <el-form-item label-width="0">
            <div class="login-form-item" style="text-align: center;width:100%">
              <el-button type="primary" v-on:click="onSubmit(ruleFormRef)" style="width: 100%;">{{ $t('login.login') }}
              </el-button>
            </div>
          </el-form-item>

          <!-- 注册账号模块和找回密码 -->
          <el-form-item label-width="0">
            <el-link v-if="registerDisplay" type="primary" @click="goToPage('register')">{{ $t('login.register') }}
            </el-link>
            <el-link style="margin-left:auto" type="primary" @click="forgetPassword">{{ $t('login.forget_password') }}
            </el-link>
          </el-form-item>
        </el-form>

        <!-- <el-dialog title="温馨提示" :v-model="dialogVisible" width="30%">
          <span>请输入账号和密码</span>
          <template v-slot:footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </template>
        </el-dialog> -->
      </div>
    </div>
  </div>


</template>

<script setup>
import apiLogin from '../../api/login.js'
import apiOpen from '../../api/open.js'
import Storage from '../../utils/storage.js'
import { onMounted, reactive, ref, } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import storage from '../../utils/storage.js'
import router from '../../router'


const ruleFormRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  vcode: ''
})

const captchaId = ref("");
const vCodeImgSrc = ref("");
const registerDisplay = ref(false);
const loginCaptchaDisplay = ref(false);
const pageStyleObj = reactive({
  // backgroundImage:'url(' + require("../assets/image/login-bg.png") + ')',
  top: 0,
  left: 0,
  width: '100%',
  height: '480px',
  position: 'absolute',
})

const dialogVisible = ref(false)
const $router = useRouter();
const $18n = useI18n()

const rules = reactive({
  username: [
    { required: true, message: $18n.t('login.username_empty'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: $18n.t('login.password_empty'), trigger: 'blur' }
  ],
  vcode: [
    { required: false, message: $18n.t('login.v_code_empty'), trigger: 'blur' },
    { max: 6, min: 4, message: $18n.t('login.v_code_format'), trigger: 'blur' }
  ]
})



const onSubmit = (ruleFormRef) => {
  ruleFormRef.validate((valid) => {
    if (valid) {
      apiLogin.login(form.username, form.password, form.vcode, (data) => {
        storage.setValue("userInfo", "token", data.token)
        ElMessage({
          type: "success",
          message: $18n.t('login.loginSuccess', { "name": data.name})
        })
        $router.push({ "path": "/" });
      }, () => {
        vcodeReplace()
      })
    } else {
      // dialogVisible.value = true;
      return
    }
  })

}
const vcodeReplace = () => {
  const num = Math.ceil(Math.random() * 1000) // 生成一个随机数（防止缓存）
  // this.vCodeImgSrc = "/api/captcha/img/" + this.captchaId + "?" + num
  // this.vCodeImgSrc =  require("../../assets/test/yzm.png") 
  vCodeImgSrc.value = "/api/v1/captach/getImage?v=" + num
}
const goToPage = (path) => {
  router.push({ path });
}
const forgetPassword = () => {
  goToPage("forgotPassword")
}

apiOpen.getOpenConfig((d)=>{
  if (d.openRegister){
    registerDisplay.value=true
  }
  if (d.loginCaptcha) loginCaptchaDisplay.value=true
})

onMounted(() => {
  vcodeReplace()
  // 获得验证码id
  // captcha.getImgId((d) => {
  //   this.captchaId = d.img_id
  //   this.vcodeReplace()
  // })

  // apiAuth.getConfig("register",(d)=>{
  //   this.registerDisplay = (d.register.register_open == 1) ? true :false
  // })
})


</script>

<style scoped>
.login-box {
  /* border: 1px solid #DCDFE6; */
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-shadow: 0 0 15px #d4d4d4;
  /* background: #fff; */
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, Arial, sans-serif;
}

.login-form-item {
  margin-top: 15px;
}


.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 蒙版过渡 */
  /* background: -moz-linear-gradient(top, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 2%, rgba(255, 255, 255, 1) 68%, rgba(255, 255, 255, 1) 100%); */
  /* background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 2%, rgba(255, 255, 255, 1) 68%, rgba(255, 255, 255, 1) 100%); */
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 2%, rgba(255, 255, 255, 1) 68%, rgba(255, 255, 255, 1) 100%); */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e6ffffff', endColorstr='#ffffff', GradientType=0);
}



/* 自适应 <= */
@media (max-width: 470px) {

  .login-box {
    width: 70%;
  }

}
</style>