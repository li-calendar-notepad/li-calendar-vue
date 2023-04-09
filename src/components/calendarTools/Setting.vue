<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import StipulateTemplate from "./common/stipulateTemplate.vue";
import apiItem from "../../api/item";
import apiSpecialDay from "../../api/specialDay";

import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import cmn from "../../utils/cmn";

const settingFormRef=ref()
const $i18n = useI18n()
const $router = useRouter()
const props =defineProps({
  itemId:Number,
  title: {
    type: String,
    // default:"Setting"
  },
    // 是否为对话框方式展示
  dialog:{
    type: Boolean,
    default:false
  },
  // 显示对话框
  dialogShow:{
    type: Boolean,
    default:false
  },
  visitToken:{},
})


const settingFormRules = reactive({
  required: { required: true, message: $i18n.t("form.required"), trigger: 'blur' },
  title: [
    { required: true, message: $i18n.t("form.required"), trigger: 'blur' },
    { max: 15, message: $i18n.t("form.max", { num: 15 }), trigger: 'blur' },
  ],
  item_description: [
    // { trigger: 'blur', validator: validatePass },
  ],
  password: [
    { trigger: 'blur', validator: cmn.formExpValidateFunc(/^(\s{0}|[0-9a-zA-Z]{4,10})$/, $i18n.t('calendar.common.itemVisitPasswordError')) },
  ],
})

const specialDayList = ref()



// 获取配置项
apiItem.getConfig(props.itemId,(d)=>{
  form.title=d.title;
  form.description=d.description;
  form.password=d.password;

  form.weekStartDay=d.styleConfig.weekStartDay;
  form.monthViewMaxEvent=d.styleConfig.monthViewMaxEvent;
  form.weekNumbers=d.styleConfig.weekNumbers;
  form.dayTimeDisplayMode=d.styleConfig.dayTimeDisplayMode;
  form.specialDayHolidayBackgroundColor = d.styleConfig.specialDayHolidayBackgroundColor;
  form.holidayBackgroundColor = d.styleConfig.holidayBackgroundColor;
  form.specialDaySpecialId = d.styleConfig.specialDaySpecialId;
  form.specialDayTextDisplay = d.styleConfig.specialDayTextDisplay;
})

const form=reactive({
  // title:config.title||"",
  // description:config.description||"",
  // password:config.requirePassword?"******":"",

  // weekStartDay:config.weekStartDay||7,
  // monthViewMaxEvent:config.monthViewMaxEvent||"",
  // weekNumbers:config.weekNumbers||0,
  // dayTimeDisplayMode:config.dayTimeDisplayMode||3,
  // holidayBackgroundColor:config.holidayBackgroundColor||"",
})

const onSubmit = (settingFormRef)=>{
  settingFormRef.validate((valid)=>{
    if(valid){
      apiItem.saveConfig(props.itemId, form, () => {
        // 判断是否修改密码，如果修改密码将刷新
        ElMessage({
          duration: 3000,
          message: $i18n.t("common.save_success"),
          type: 'success'
        });
        $router.go(0)
      })
    }
  })
}


const onDelete = () => {
  ElMessageBox.prompt($i18n.t('calendar.setting.delete_item_warning_content', {itemTitle:form.title})
  , $i18n.t('common.warning'), {
  }).then(({ value }) => {
    if (form.title == value){
      apiItem.setVisitToken(props.visitToken).deleteOne(props.itemId,(d)=>{
        ElMessage.success($i18n.t('common.delete_success'))
        $router.push({path:"/home"})
      })
    }else{
      ElMessage.warning($i18n.t('calendar.setting.delete_item_check_error', { itemTitle: form.title }))
    }
  })
}



const emits=defineEmits([
  "update:dialogShow"
])

const dialogClose=()=>{
  emits("update:dialogShow",false)
}

onMounted(() => {
  apiSpecialDay.getList((d)=>{
    specialDayList.value=d.list
  })
})

</script>

<template>
  <div>
    <StipulateTemplate style="color:#303133" :title="title?title:$t('calendar.setting.title')" :dialog="dialog" v-model:dialogShow="dialogShow" @dialogClose="dialogClose">
      <el-form :model="form" label-width="auto" ref="settingFormRef" :rules="settingFormRules">
        <!-- 基础设置 -->
        <el-divider content-position="left">{{$t("calendar.setting.base.title")}}</el-divider>
        <el-form-item :label='$t("calendar.setting.base.item_name")' prop ="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item :label='$t("calendar.setting.base.item_description")' prop="item_description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item :label='$t("calendar.setting.base.item_password")' prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('calendar.setting.base.item_password_placeholder')" />
        </el-form-item>

        <!-- 风格设置 -->
        <el-divider content-position="left">{{$t("calendar.setting.style.title")}}</el-divider>
        <el-form-item :label='$t("calendar.setting.style.weekStartDay")'>
          <el-select v-model="form.weekStartDay" :placeholder='$t("calendar.setting.style.weekStartDayItem.placeholder")'>
            <el-option :label='$t("calendar.setting.style.weekStartDayItem.sun")' :value="7" />
            <el-option :label='$t("calendar.setting.style.weekStartDayItem.mon")' :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="false" :label='$t("calendar.setting.style.monthViewMaxEvent")'>
          <el-input v-model="form.monthViewMaxEvent" type="number" :placeholder='$t("calendar.setting.style.monthViewMaxEvent_placeholder")'/>
        </el-form-item>

        <el-form-item :label='$t("calendar.setting.style.weekNumbers")'>
          <el-radio-group v-model="form.weekNumbers">
            <el-radio :label="1" >{{$t("common.yes")}}</el-radio>
            <el-radio :label="0" >{{$t("common.no")}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label='$t("calendar.setting.style.dayTimeDisplayMode")'>
          <el-radio-group v-model="form.dayTimeDisplayMode">
            <el-radio :label="1">{{$t("calendar.setting.style.dayTimeDisplayModeItem.all")}}</el-radio>
            <el-radio :label="2">{{$t("calendar.setting.style.dayTimeDisplayModeItem.onlyStart")}}</el-radio>
            <el-radio :label="3">{{$t("calendar.setting.style.dayTimeDisplayModeItem.noOne")}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 风格设置 -->
        <el-divider content-position="left">{{ $t("calendar.setting.specialDay.title")}}</el-divider>
        <el-form-item :label='$t("calendar.setting.specialDay.specialDaySpecial.title")'>
          <el-select v-model="form.specialDaySpecialId" :placeholder='$t("calendar.setting.specialDay.specialDaySpecial.placeholder")'>
            <el-option label='无' :value="0" />
            <el-option v-for="(item, index) in specialDayList" :key="index" :label='item.name' :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item :label='$t("calendar.setting.specialDay.textDisplay")'>
          <el-radio-group v-model="form.specialDayTextDisplay">
            <el-radio :label="true">{{$t("common.yes")}}</el-radio>
            <el-radio :label="false">{{$t("common.no")}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-show="false" :label='$t("calendar.setting.specialDay.holidayBackgroundColor")'>
          <el-color-picker v-model="form.specialDayHolidayBackgroundColor" />
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <!-- <el-form label-width="120px"> -->
          <!-- <el-form-item> -->
            <el-button type="danger" @click="onDelete">{{$t("calendar.setting.delete_button")}}</el-button>
            <el-button type="primary" @click="onSubmit(settingFormRef)">{{$t("calendar.setting.save_button")}}</el-button>
            
          <!-- </el-form-item> -->
        <!-- </el-form> -->
      </template>
    </StipulateTemplate>
    
  </div>
</template>

<style scoped>
.detalles {
  margin-top: 50px;
}

.detalles-item{
  color: #606266;
  margin-bottom: 20px;
}

.detalles-item-content{
  margin-left: 20px;
  margin-top: 10px;
}
</style>
