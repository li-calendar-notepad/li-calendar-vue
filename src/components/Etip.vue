<template>
    <div>
        <el-popover
            ref="popoverRef"
            :visible="show"
            :content="props.content"
            :placement="props.placement"
            :effect="props.effect"
            virtual-triggering
            :show-after="props.showAfter"
            :hide-after="props.hideAfter"
            :virtual-ref="triggerRef"
            :tabindex="props.tabindex"
            :popper-class="props.popperClass"
            :width="props.width"
            :auto-close="autoClose"
            :show-arrow="showArrow"
            :offset="20"
        >
        <slot></slot>
        </el-popover>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { onMounted, onUnmounted } from "@vue/runtime-core"


const props=defineProps({
    effect:{
        default:"light"
    },
    content:{
        default:""
    },
    placement:{
        default:"bottom"
    },
    showAfter:{
        default:500
    },
    hideAfter:{
        default:0
    },
    visible:{},
    popperClass:{
        default:"etip-style"
    },
    width:{
      default:200
    },
    autoClose:{},
    showArrow:{}

})



const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})

const show = ref(false)
const realtimeOffset=ref()
const popoverRef=ref()

const autoCloseSetTimeoutNumber=ref(0)

const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  },
})


const setXY=(clientX,clientY)=>{
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: clientX,
    y: clientY,
  })
}

const getOffset=()=>{
  return { x: realtimeOffset.value.clientX, y: realtimeOffset.value.clientY }
}

const updateXY=()=>{
  return getOffset()
}

const setRealtimeOffset = (e)=>{
  realtimeOffset.value=e
}

onMounted(() => {
  document.addEventListener("mousemove", setRealtimeOffset)
})

onUnmounted(() => {
  document.removeEventListener("mousemove", setRealtimeOffset)
})


const emits=defineEmits(["update:visible"])
const autoCloseCode=()=>{
  // 存在定时器将关闭
  if(autoCloseSetTimeoutNumber.value!=0){
    // console.log('清理定时器',autoCloseSetTimeoutNumber.value)
    clearTimeout(autoCloseSetTimeoutNumber.value)
  }
  autoCloseSetTimeoutNumber.value=setTimeout(() => {
    show.value=false
    // 定时器自然执行完成后重置
    autoCloseSetTimeoutNumber.value=0
  }, props.autoClose);
  // console.log("创建自动关闭定时器",autoCloseSetTimeoutNumber.value)
}

// 暴露出去的内容
defineExpose({
  hide(){
    setTimeout(() => {
      show.value=false
    }, props.hideAfter);
  },
  // 获取鼠标当前位置自动显示
  show(){
    setTimeout(() => {
      const eShow=updateXY();
      show.value=true
      setXY(eShow.x,eShow.y)

      if(props.autoClose){
        autoCloseCode()
      }
    }, props.showAfter);
  },
  // 根据坐标显示
  showByJsEvent(event){
    const e = event;  //标准化事件对象
    // console.log('当前运行定时器',autoCloseSetTimeoutNumber.value)
    setTimeout(() => {
      // const currentOffset = getOffset()
      // 历史坐标和现在坐标无变化显示
      // if (e.x == currentOffset.x && e.y == currentOffset.y){
        show.value = true
        setXY(e.x, e.y)
        if (props.autoClose) {
          autoCloseCode()
        } 
      // }
      
    }, props.showAfter);
  },
})
</script>

<style>
.etip-style{
    z-index: 99999 !important;
}
</style>