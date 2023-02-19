<script setup>
import { onMounted, watch,reactive } from "@vue/runtime-core";
import cmn from "../../utils/cmn";

  const iconSize=27
  const data = reactive({
    viewHeight: 0
  })
  const asideMenu=[
    "Calendar",
    "Memo",
    "Operation",
    "DataAnalysis",
    "Search",
    "Plus",
  ];


  

  onMounted(()=>{
    data.viewHeight=document.documentElement.clientHeight
    cmn.sHeight=data.viewHeight
    window.onresize = () => {
      return (() => {
        cmn.sHeight=data.viewHeight
        data.viewHeight=document.documentElement.clientHeight
      })()
    }
  })


  // watch(()=>data.viewHeight,function(val){
  //   console.log("有变化",val)
  //   containerStyle.height=val+"px"
  // })
</script>

<template>
    <el-container :style="{height:data.viewHeight+'px'}">
      <div style="height:200px">555</div>
      <el-aside width="350px">
        <el-container :style="{height:data.viewHeight+'px'}">
          <el-Header style="padding:10px;line-height:60px">
            <el-icon :size="iconSize" style="margin-left:20px" v-for="(icon, index) in asideMenu" :key="index">
              <component  :is="icon" style="width: 30px; height:30px;">
                <!-- <el-icon :size="iconSize" style="margin-left:10px"> -->
              </component>
            </el-icon>
          </el-Header>
        </el-container>
      </el-aside>
      <el-main>
          <RouterView />
      </el-main>
    </el-container>
</template>


<style scoped>
.el-aside{
  /* 临时 */
  /* background: rgb(194, 194, 194); */
  border-right: 1px solid #e1e1e1;
}

.el-aside .padding{
  padding: 8px;
  text-align: center;
}

</style>
