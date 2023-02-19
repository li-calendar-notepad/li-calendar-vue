<template>
  <div style="height:100%">
    <StipulateTemplate :title="title?title:$t('calendar.search.title')" :dialog="dialog" v-model:dialogShow="dialogShow" @dialogClose="dialogClose">
      <div class="mt-4">
        <el-input
          v-model="searchWord"
          placeholder="请输入标题或内容包含的关键字"
          class="input-with-select"
          @keyup.enter="startSerach(searchWord)"
        >
          <!-- <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template> -->
          <template #append>
            <el-button @click="startSerach(searchWord)" :icon="Search" />
          </template>
        </el-input>
      </div>
      <el-scrollbar style="margin:20px 0;" height="100%" class="e-scrollbar">
        <el-col style="margin: 8px;">
          <el-card @click="clickResItem(v.eventId)" style="margin:10px 0" shadow="hover" :body-style="{padding:'15px'}" v-for=" v ,index in searchResultList" :key="index"> 
            <div>{{v.title}} </div>
            <div style="font-size:12px;margin-top:2px" class="e-disabled-text content">{{v.content}}</div>
            <div style="font-size:12px;margin-top:10px" class="e-placeholder-text">{{cmn.startAndEndTimeFormatShort(v.startTime,v.endTime)}}</div>
          </el-card>

          <!-- <el-card  style="margin-top:5px;" shadow="hover"> 
            <div>#运动# </div>
            <div style="font-size:12px;margin-top:2px" class="e-disabled-text">我是详情</div>
            <div style="font-size:12px;margin-top:10px" class="e-placeholder-text">2022-12-20 16:35:54 ~ 2022-12-20 16:36:08</div>
          </el-card> -->
        </el-col>
      </el-scrollbar>
    </StipulateTemplate>
    <EventInfo 
      ref="eventInfoRef"
      :dialog="true" 
      :visit-token="visitToken"
          />
  </div>
</template>

<script setup>
import StipulateTemplate from "./common/stipulateTemplate.vue";
import EventInfo from "./EventInfo.vue";
import {Search } from "@element-plus/icons-vue";
import apiEvent from "../../api/event";
import { ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import cmn from "../../utils/cmn";


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


const eventInfoRef=ref()
const searchWord=ref()
const searchResultList=ref()

// 开始查询事件
const startSerach=(searchWord)=>{
  if(!searchWord){
    ElMessage.warning("搜索关键字不可以为空")
    return
  }
  apiEvent.setVisitToken(props.visitToken).searchWord(props.itemId,searchWord,(data)=>{
    searchResultList.value=data.list
    if(data.total==0){
      ElMessage.warning("没有查询到任何事件")
    }else{
      ElMessage.success("共查询到"+data.total+"条记录")
    }
  })
}

const clickResItem=(eventId)=>{
  eventInfoRef.value.renderByEventId(props.itemId,eventId)
}

const emits=defineEmits([
  "update:dialogShow"
])

const dialogClose=()=>{
  emits("update:dialogShow",false)
}


</script>

<style scoped>
.content{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>