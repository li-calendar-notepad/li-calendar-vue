<template>
  <div>
    <el-dialog
      :title="title"
      v-model="visible"
      :before-close="beforeClose"
      :closeOnClickModal="closeOnClickModal"
      :width="width!='auto'?width:autoWidth()"
      :appendToBody="appendToBody"
      :destroyOnClose="destroyOnClose"
      :draggable="draggable"
      :fullscreen="fullscreen"
      :show-close="showClose"
      :close-on-press-escape="closeOnPressEscape"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
      >
      
      <slot></slot>

      <template v-slot:header>
        <slot name=header></slot>
      </template>

      <template v-slot:footer>
        <slot name=footer></slot>
      </template>
      
    </el-dialog>
  </div>
</template>

<script setup>
const props =defineProps({
  title:{
    default:"",
  },
  visible:{
    default:false,
  },
  width:{
    default:"auto",
  },
  closeOnClickModal:{
    default:false,
  },
  // "pc-width":{
  //   default:"",
  // },
  appendToBody:{
    default:false,
  },
  destroyOnClose:{
    default:false,
  },
  fullscreen:{
    default:false,
  },
  showClose:{
    default:true,
  },
  beforeClose:{},
  bigScreenWidth:{},// 宽屏时宽度
  closeOnPressEscape:{},
  // 可拖拽
  draggable:{
    default:true
  }
})
const emits = defineEmits([
  'onEventClick',
  'open',
  'opened',
  'close',
  'closed',
  'update:visible',
])


const onOpen=()=>{
  emits("open")
}

const onOpened=()=>{
  emits("opened")
}

const onClose=()=>{
  emits("close")
  emits("update:visible",false)
}

const onClosed=()=>{
  emits("closed")
}

const autoWidth=()=>{
  const windowWidth=document.documentElement.clientWidth
  if(windowWidth<700){
    return "95%"
  }else{
    return props.bigScreenWidth?props.bigScreenWidth:"50%"
  }
}

</script>

