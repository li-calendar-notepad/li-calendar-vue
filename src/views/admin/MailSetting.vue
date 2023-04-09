<template>
    <el-main style="padding:20px;max-width:500px">
        <!-- <h2>邮箱设置</h2> -->
        <el-form :model="mailInfo" ref="mailInfoFormRef" :rules="mailInfoFormRules" label-width="auto">
            
            <el-form-item :label="$t('adminEmail.host')" prop="host">
                <el-input v-model="mailInfo.host" :placeholder="$t('adminEmail.hostPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('adminEmail.port')" prop="port">
                <el-input v-model.number="mailInfo.port" type="number" :placeholder="$t('adminEmail.portPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('adminEmail.email')" prop="mail">
                <el-input v-model="mailInfo.mail" :placeholder="$t('adminEmail.emailPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('adminEmail.password')" prop="password">
                <el-input v-model="mailInfo.password" type="password" :placeholder="$t('adminEmail.passwordPlaceholder')" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="passformOnSubmit(mailInfoFormRef)">{{$t('common.save')}}</el-button>
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
const props = defineProps({
  setAdminTitle:{}
})
const mailInfoFormRef=ref()
const validatorEmail=(rule, value, callback)=>{
  if(!inputValidate.isEmail(value)){
    callback($i18n.t('adminEmail.mailFormatError'))
  }else{
    callback()
  }
}
const mailInfoFormRules=reactive({
  "host":[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
  ],
  "port":[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
  ],
  "mail":[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
    { validator:validatorEmail,trigger: 'blur'},
  ],
  "password":[
    { required: true,message:$i18n.t('form.required'),trigger: 'blur'},
  ],
})
const mailInfo=ref({
  host:"",
  port:null,
  mail:"",
  password:"",
})

apiSystemSetting.getEmail((d)=>{
  mailInfo.value=d
})

const passformOnSubmit=(mailInfoFormRef)=>{

    // console.log("获取值",mailInfo.value)
  mailInfoFormRef.validate((valid)=>{
    if(valid){
      apiSystemSetting.setEmail(mailInfo.value,(d)=>{
        ElMessage.success($i18n.t('common.save_success'))
      },(d)=>{
        ElMessage.warning($i18n.t('common.save_error')+","+d.msg)
      })
    }
    
  })
    
}

</script>
