<template>
    <el-main style="padding:20px;max-width:500px">
        <!-- <h2>邮箱设置</h2> -->
        <el-form :model="mailInfo" ref="mailInfoFormRef" :rules="mailInfoFormRules" label-width="120px">
            
            <el-form-item label="服务器地址" prop="host">
                <el-input v-model="mailInfo.host" placeholder="SMTP服务器地址" />
            </el-form-item>
            <el-form-item label="服务器端口" prop="port">
                <el-input v-model.number="mailInfo.port" type="number" placeholder="SMTP服务器端口(一般为25,465,587)" />
            </el-form-item>
            <el-form-item label="发信人邮箱" prop="mail">
                <el-input v-model="mailInfo.mail" placeholder="邮箱地址" />
            </el-form-item>
            <el-form-item label="邮箱密码" prop="password">
                <el-input v-model="mailInfo.password" type="password" placeholder="密码或授权码" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="passformOnSubmit(mailInfoFormRef)">保存</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import apiSystemSetting from "../../api/admin/systemSetting";
import inputValidate from "../../utils/validate";

const props = defineProps({
  setAdminTitle:{}
})
const mailInfoFormRef=ref()
const validatorEmail=(rule, value, callback)=>{
  if(!inputValidate.isEmail(value)){
    callback("邮箱格式不正确")
  }else{
    callback()
  }
}
const mailInfoFormRules=reactive({
  "host":[
    { required: true,message:"必填项",trigger: 'blur'},
  ],
  "port":[
    { required: true,message:"必填项",trigger: 'blur'},
  ],
  "mail":[
    { required: true,message:"必填项",trigger: 'blur'},
    { validator:validatorEmail,trigger: 'blur'},
  ],
  "password":[
    { required: true,message:"必填项",trigger: 'blur'},
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
        ElMessage.success("保存成功")
      },(d)=>{
        ElMessage.warning("保存失败，"+d.msg)
      })
    }
    
  })
    
}

</script>
