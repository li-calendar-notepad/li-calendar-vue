<template>
  <div :id="vditorId" />
</template>

<script setup >
import { ref, onMounted ,toRaw} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import cmn from "../utils/cmn"

const vditorId = ref("vditor_" + cmn.randomCode(10))

const contentEditor = ref(null);

const props=defineProps({
  content:{
    default:"请输入内容..."
  },
  lang:{
    default:"zh_CN"
  },
  options:{}
})

const emits=defineEmits([
  "input",'focus','blur','esc','ctrlEnter','select',"after"
])

onMounted(() => {
  contentEditor.value = new Vditor(vditorId.value, {
    after() {
      emits('after', toRaw(contentEditor.value));
      contentEditor.value.setValue(props.content);
    },
    ...props.options,
      //
      // console.log(contentEditor)
    // lang:props.lang,
    // lang:props.lang,
  });
  // contentEditor.value = new Vditor('vditor', props.options);
  // console.log("--------------------",contentEditor.value)

});


</script>