<script setup>
import { reactive, ref } from "@vue/reactivity";

import EventInfoBase from "./EventInfoBase.vue";
import EventEdit from "./EventEdit.vue";

import apiItem from "../../api/item";
import apiEvent from "../../api/event";
import cmn from "../../utils/cmn";

import {
  Clock,
  CloseBold,
  FullScreen,
  Edit,
  CircleCloseFilled,
  BottomRight,
  Delete,
  Loading,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  done: {},
  visitToken: {},
  dialog: Boolean,
  dialogBeforeClose: {},
  dialogOpened: {},
  dialogCloseOnPressEscape: {}, //esc 关闭弹窗
});

const isLoading = ref(false);
const dialogShow = ref(false);
const eventInfoBaseRef = ref();
const dialogFullScreen = ref(false);
const eventInfo = ref({});
const editEventShow = ref(false);
const eventEditRef = ref();
const eventItemId = ref();
const eventEId = ref();

onMounted(() => {});

// 事件
const emits = defineEmits([
  // "update:dialogShow",
  "update:dialogFullScreen",
  "addAfter", // (eventInfo)
  "updaterAfter", // (eventInfo)
  "deleteAfter", // (eventInfo)
]);

const addAfter = () => {
  // console.log("添加完成")
  // renderByEventId(eventItemId, eventEId)
  dialogShow.value=false
  // emits("update:dialogShow",false)
  emits("addAfter")
};

const updateAfter = () => {
  // console.log("更新完成")
  // renderByEventId(eventItemId, eventEId)
  dialogShow.value=false
  // emits("update:dialogShow",false)
  emits("updateAfter")
};

const renderByEventId = (itemId, eventId) => {
  isLoading.value = true;
  if (props.dialog == true && !dialogShow.value) {
    dialogShow.value = true;
  }
  eventItemId.value = itemId;
  eventEId.value = eventId;

  // // apiEvent.setVisitToken(props.visitToken)
  apiEvent.getInfo(itemId, eventId, (data) => {
    eventInfo.value = data;
    isLoading.value = false;
  },()=>{
    isLoading.value = false;
  });
};

const editEvent = () => {
  eventEditRef.value.editEvent(eventItemId.value, eventInfo.value.eventId);
};

const deleteEvent = () => {
  cmn.confirm("警告","请确认是否删除该事件吗？",(res)=>{
    if(res==true){
      apiEvent.deleteByIdAndItemId(eventItemId.value, eventEId.value,()=>{
        emits("deleteAfter")
        dialogShow.value = false;
      })
    }
  })
};

const loadAfter = () => {
  isLoading.value = false;
};

// 暴露出去的内容
defineExpose({
  renderByEventId,
});
</script>

<template>
  <div>
    <EventInfoBase
      ref="eventInfoBaseRef"
      :eventTitle="eventInfo.title"
      :eventContent="eventInfo.content"
      :eventTime="cmn.startAndEndTimeFormatShort(eventInfo.startTime, eventInfo.endTime)"
      :eventCreateTime="eventInfo.createTime"
      :dialog="dialog"
      @done="loadAfter"
      v-model:dialogShow="dialogShow"
      v-model:isLoading="isLoading"
    >
      <template #header>
        <span class="toolbar">
          <el-icon @click="editEvent"><Edit /></el-icon>
          <el-icon @click="deleteEvent"><Delete /></el-icon>
        </span>
      </template>
    </EventInfoBase>

    <!-- 事件编辑弹窗 -->
    <EventEdit
      ref="eventEditRef"
      :dialog="true"
      v-model:dialogShow="editEventShow"
      :itemId="eventItemId"
      :visitToken="visitToken"
      :dialogFullScreen="false"
      :defaultData="eventInfo"
      @addAfter="addAfter"
      @updateAfter="updateAfter"
    />
  </div>
</template>
