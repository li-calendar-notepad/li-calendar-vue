<script setup>
  import { onMounted ,reactive,ref,} from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import apiUser from "../../api/user";
  import apiLogin from "../../api/login";
  import storage from '../../utils/storage.js'
  import {Expand } from "@element-plus/icons-vue";
  import { ElMessage } from 'element-plus';
  import cmn from "../../utils/cmn"
  
  const $router = useRouter()
  const $i18n = useI18n()


  const iconSize=30
  const headImageSrc=ref("")
  const menuDropdown = ref()

  
  
  let reactiveData = reactive({
    viewHeight:document.documentElement.clientHeight,
  })


  const asideMenu=reactive([
    // {
    //   text:"项目",
    //   icon:"Notebook"
    // },
    {
      text: $i18n.t("common.home"),
      icon:"House",
      path:"/home"
    },
    {
      text: $i18n.t("common.shorthand"),
      icon:"Memo",
      path:""
    },
    {
      text: $i18n.t("common.message"),
      icon:"Bell"
    },
    {
      text: $i18n.t("common.setting"),
      icon:"Setting",
      path:"/system/UserSetting"
    },
    // {
    //   text:"管理",
    //   icon:"Monitor",//Platform,Pointer,Management
    //   path:"/admin"
    // },

    
  ])



onMounted(()=>{
  window.onresize = () => {
    return (() => {
      reactiveData.viewHeight=document.documentElement.clientHeight
    })()
  }
})

const goToPage=(path)=>{
  $router.push({"path":path});
}


const logout=()=>{
  
  apiLogin.logout(()=>{
    cmn.confirm($i18n.t("common.warning"), $i18n.t("homeLayout.logout"), (res) => {
      if(res){
        ElMessage.success($i18n.t("homeLayout.logoutSuccess"))
        setTimeout(() => {
          // 删除本地token
          storage.setValue("userInfo", null)
          goToPage('/login')
        }, 1000)
      }
    })
    
    return false
  })

}

apiUser.getInfo((d)=>{
  headImageSrc.value=d.headImage
  if(d.role==1){
    asideMenu.push({
      text: $i18n.t("common.manage"),
      icon: "Monitor",//Platform,Pointer,Management
      path: "/admin"
    })
  }
})

</script>

<template>
    <el-container :style="{height:reactiveData.viewHeight+'px'}">
      <el-aside class="el-aside" width="60px" direction="vertical">
        <div class="padding">
          <!-- <el-icon  :size="20" ><Expand /></el-icon> -->
          <el-dropdown ref="menuDropdown" trigger="contextmenu" style="margin-right: 30px">
            <div class="block" title="菜单" @click="menuDropdown.handleOpen()">
              <el-avatar shape="square" :size="40" :src="headImageSrc?headImageSrc:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToPage('/system/userInfoUpdate')">{{ $t('common.editUserInfo')}}</el-dropdown-item>
                <el-dropdown-item divided @click="logout">{{ $t('common.logoutSafely')}}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          
          
          <div class="menu-item" v-for="(item, index) in asideMenu" :key="index" @click="goToPage(item.path)">
            <el-icon :size="iconSize" >
              <component :is="item.icon" style="width: 25px; height:25px;">
              </component>
            </el-icon>
            <div style="font-size:12px">{{item.text}}</div>
          </div>
        </div>
      </el-aside>
      <el-main>
          <RouterView />
      </el-main>
    </el-container>

</template>


<style scoped>
.el-aside{
  /* 临时 */
  /* background: pink; */
  padding-top: 30px;
  border-right: 1px solid #e1e1e1;
  overflow: hidden;
}

.el-aside .padding{
  padding: 8px;
  text-align: center;
}

.el-main{
  padding: 0;
}

.menu-item{
  margin-top:20px;
  cursor: pointer;
}
.menu-item:hover{
  color: var(--el-color-primary);
}

.block{
  cursor: pointer;
}
</style>
