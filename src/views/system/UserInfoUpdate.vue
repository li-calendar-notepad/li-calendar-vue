<template>
    <el-main style="padding:20px;max-width:500px">
        <h2>{{$t('userInfoUpdate.title')}}</h2>

        <el-divider content-position="left">{{$t('userInfoUpdate.subTitleInfoUpdate')}}</el-divider>
        <el-form :model="userInfo" ref="updateInfoRef" label-width="auto" :rules="userInfoRules">
            <el-form-item :label="$t('userInfoUpdate.headImage')">
                <el-upload
                    class="avatar-uploader"
                    name="imgfile"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="{ token: request.getToken()}"
                >
                    <div class="block" :title="$t('userInfoUpdate.editInfo')" @click="goToPage('/system/userInfoUpdate')">
                        <el-icon v-if="userInfo.headImage==''" style="height:80px;width:80px;" class="el-avatar el-avatar--square"><Plus/></el-icon>
                        <el-avatar v-else shape="square" :size="80" :src="userInfo.headImage" />
                        <div class="e-secondary-text" style="font-size:13px" >{{$t('userInfoUpdate.clickImageUpdate')}}</div>
                    </div>
                </el-upload>
            </el-form-item>
            
            <el-form-item :label="$t('userInfoUpdate.nickname')" prop="name">
                <el-input v-model="userInfo.name" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit(updateInfoRef)">{{$t('userInfoUpdate.submit')}}</el-button>
            </el-form-item>
        </el-form>

        <el-divider content-position="left">{{$t('userInfoUpdate.subTitlePassUpdate')}}</el-divider>
        <el-form :model="passform" ref="updatePasswordRef" label-width="auto" :rules="updatePasswordRules">
            <el-form-item :label="$t('userInfoUpdate.oldPass')" prop="oldPassword">
                <el-input type="password" v-model="passform.oldPassword" />
            </el-form-item>

            <el-form-item :label="$t('userInfoUpdate.newPass')" prop="newPassword">
                <el-input type="password" v-model="passform.newPassword" />
            </el-form-item>

            <el-form-item :label="$t('userInfoUpdate.newPass')" prop="newPasswordAgain">
                <el-input type="password" v-model="passform.newPasswordAgain" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="passformOnSubmit(updatePasswordRef)">{{$t('userInfoUpdate.submit')}}</el-button>
                <!-- <el-button>Cancel</el-button> -->
            </el-form-item>
        </el-form>
   
    </el-main>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from '@vue/reactivity'
import inputValidate from "../../utils/validate";
import apiFile from "../../api/file";
import apiUser from "../../api/user";
import {useI18n} from "vue-i18n"
import request from "../../api/request";

const $i18n=useI18n()
const $t=$i18n.t

const imageUrl = ref('')
const userInfo=ref({})
const updatePasswordRef=ref()
const updateInfoRef=ref()

const uploadUrl=apiFile.getUploadImageUrl()
const passform=reactive({
    oldPassword:"",
    newPassword:"",
    newPasswordAgain:"",
})


const validatePass = (rule, value, callback) => {
  if(!inputValidate.isPasswd(value)){
    // 密码可选范围
    callback($t('userInfoUpdate.password_range'))
  }else{
    callback()
  }
  
}

const validatePassAgain=(rule, value, callback)=>{
  if(passform.newPassword!=value){
    callback($t('userInfoUpdate.twice_pass_disaccord'))
  }else{
    callback()
  }
}

const userInfoRules=reactive({
  name:[
    { required: true, message: $t('form.required'), trigger: 'blur' },
    // { message: '长度必须为5-20个字符',max:20,min:5, trigger: 'blur' },
    { message: $t('form.limit_length',{value:"3-15"}),max:15,min:3, trigger: 'blur' },
  ],
})

const updatePasswordRules=reactive({
  oldPassword:[
    { required: true,message:$t("form.required"),trigger: 'blur'},
    { trigger: 'blur' ,validator:validatePass},
  ],
  newPassword:[
    { required: true,message:$t("form.required"),trigger: 'blur'},
    { trigger: 'blur' ,validator:validatePass},
  ],
  newPasswordAgain:[
    { required: true,message:$t("form.required"),trigger: 'blur'},
    { trigger: 'blur' ,validator:validatePass},
    { trigger: 'blur' ,validator:validatePassAgain},
  ],
})

const onSubmit=(updateInfoRef)=>{
    updateInfoRef.validate((valid)=>{
      if(valid){
        apiUser.updateInfo({
          name:userInfo.value.name,
          headImage:userInfo.value.headImage,
        },()=>{
          // 个人资料保存成功
          ElMessage.success($t('common.save_success'))
        })
      }
      return false;
    })
}

const passformOnSubmit=(updatePasswordRef)=>{
  updatePasswordRef.validate((valid)=>{
    if(valid){
      apiUser.updatePasssword({
        newPassword:passform.newPassword,
        oldPassword:passform.oldPassword,
      },()=>{
        ElMessage.success($t('common.save_success'))
      })
    }else{
      return false;
    }
  })
}

const handleAvatarSuccess = ( response, uploadFile ) => {
  console.log(response,uploadFile)
  if(response.code==0){
    userInfo.value.headImage=response.data.imageUrl
  }else{
    // 头像上传错误
    ElMessage.error($t("userInfoUpdate.headImageUploadError")+response.msg)
  }
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else 
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error($t('userInfoUpdate.headImageSizeOverflow',{size:"2MB"}))
    return false
  }
  return true
}

apiUser.getInfo((d)=>{
  userInfo.value=d
})


</script>
