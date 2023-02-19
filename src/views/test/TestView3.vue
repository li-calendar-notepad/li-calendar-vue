<script setup>
import { reactive, ref } from '@vue/reactivity'
import Edialog from '../../components/Edialog.vue'
import vditor from '../../components/Vditor.vue'
// export default {
//   data(){
//     return {
//         dialogShow: false,
//     };
//   },
//   components:{
//     Edialog
//   }
// }

const dialogShow=ref(false)

const open=()=>{
  dialogShow.value=true
}

const close=()=>{
  console.log(55555555555)
  // dialogShow.value=false
}

const options=reactive({
  height:500,
  width:"80%",
  typewriterMode:true,
  input:(v)=>{
    console.log("input",v)
  },
  blur:(v)=>{
    console.log("blur",v)
  },
  toolbar: ['emoji', 'br', 'bold', '|', 'line'],
})
</script>

<template>
<div>
<!-- <Edialog title="删除文件" :visible="data.display" >
    <span>请确定是否删除选中文件并加入到回收站</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="data.display = false">取消</el-button>
        <el-button size="mini" type="primary" >确定</el-button>
      </span>
    </template>
    
</Edialog> -->
<!-- <vditor :options="options" /> -->

<Edialog title="删除文件" v-model:visible="dialogShow"   >
    <span>请确定是否删除选中文件并加入到回收站</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button size="" @click="dialogShow = false">取消</el-button>
        <el-button size="" type="primary" >确定</el-button>
      </span>
    </template>
    
</Edialog>

<!-- <el-dialog v-model="dialogShow" title="Tips" width="30%" >
  <span>It's a draggable Dialog</span>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogShow = false">Cancel</el-button>
      <el-button type="primary" @click="dialogShow = false"
        >Confirm</el-button
      >
    </span>
  </template>
</el-dialog> -->
<!-- <button @click="dialogShow=dialogShow?false:true">打开或关闭弹窗</button> -->
<button @click="open">打开或关闭弹窗</button>
</div>
 
</template>