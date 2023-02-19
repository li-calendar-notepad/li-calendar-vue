<script setup>
import { watch } from "@vue/runtime-core";
import Edialog from "../../Edialog.vue";
const props = defineProps({
  title: {
    type: String,
    default:"日历记事本"
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
  // 点击蒙版关闭
  dialogCloseOnClickModal:{
    default:true
  },
  // 添加到body
  dialogAppendToBody:{

  },

  // 延时关闭
  dialogDestroyOnClose:{

  },
  dialogAppendToBody:{

  },

  // 显示关闭按钮
  dialogShowClose:{
    default:true
  },

  // 弹窗宽度
  dialogWidth:{},

  // 全屏
  dialogFullScreen:{
    default:false,
  },

  // 关闭前
  dialogBeforeClose:{},

  // 最大宽度
  dialogBigScreenWidth:{},

  // 最小高度
  dialogMinHeight:{},

  // esc关闭
  dialogCloseOnPressEscape:{},

  // draggable
  dialogDraggable:{}
})

const emits=defineEmits([
  'dialogOpen',
  'dialogOpened',
  'dialogClose',
  'dialogClosed',
  'update:dialogShow'
])


const onOpen=()=>{
  emits("dialogOpen")
}

const onOpened=()=>{
  emits("dialogOpened")
}

const onClose=()=>{
  emits("dialogClose")
  emits("update:dialogShow",false)
}

const onClosed=()=>{
  emits("dialogClosed")
}
</script>

<template>
  <div style="height:100%;" >
    <div style="height:100%" v-if="dialog==false">
      <h3>{{ title }}</h3>
      <!-- <slot name="title" /> -->
      <slot> -- content -- </slot>
      <slot name="footer"></slot>
    </div>
    <div v-if="dialog==true">
      <Edialog 
      v-model:visible="dialogShow" 
      :title="title" 
      :closeOnClickModal="dialogCloseOnClickModal"
      :width="dialogWidth"
      :appendToBody="dialogAppendToBody"
      :destroyOnClose="dialogDestroyOnClose"
      :fullscreen="dialogFullScreen"
      :beforeClose="dialogBeforeClose"
      :bigScreenWidth="dialogBigScreenWidth"
      :show-close="dialogShowClose"
      :draggable="dialogDraggable"
      :closeOnPressEscape="dialogCloseOnPressEscape"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
      
      > 
        <div :style="{minHeight:dialogMinHeight}">
          <slot> -- content -- </slot>
        </div>
        
        <template v-slot:header>
          <slot name="header"></slot>
        </template>
        <template v-slot:footer>
          <slot name="footer"></slot>
        </template>
      </Edialog>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
