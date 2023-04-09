<template>
  <el-container class="layout-container-admin" :style="{height: viewHeight+'px'}">
    <el-aside width="300px">
      <el-scrollbar>
        <div class="title" style="padding:20px;">{{$t("common.appName")}} {{$t("common.admin")}}</div>
        <el-menu
          :default-active="defaultMenuActive"
          class="el-menu-vertical-demo"
        >


          
          <el-menu-item v-for="item, index in asideMenuList" :key="index" :index="item.path" @click="onMenuClick(item)">
            <el-icon> 
              <component :is="item.icon" ></component>
            </el-icon>
            <span>{{item.title}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="3" @click="onMenuClick('/admin/','用户管理')">
            <el-icon><document /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/styleSetting" @click="onMenuClick('/admin/styleSetting','风格设置')">
            <el-icon><setting /></el-icon>
            <span>风格设置</span>
          </el-menu-item>
          <el-menu-item index="5" @click="onMenuClick('/admin/','其他设置')">
            <el-icon><setting /></el-icon>
            <span>其他设置</span>
          </el-menu-item> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="display:flex;font-size: 15px;">
        <div class="title">{{subPageTitle}}</div>
        <div class="toolbar">
          <span class="quit-admin" @click="goToPage('/')">{{ $t("common.logout")}}{{ $t("common.admin")}}</span>
        </div>
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script  setup>
import { onMounted, reactive, ref } from 'vue'
import { Menu as IconMenu, Message, Setting, MagicStick, Avatar, Football } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
const $router = useRouter()
const $route = useRoute()
const $i18n=useI18n()
const goToPage=(path)=>{
  $router.push({"path":path});
}

global.cmn.setTitle($i18n.t("common.admin") +" - "+$i18n.t("common.appName"))
const viewHeight=ref(document.documentElement.clientHeight)
const subPageTitle=ref("")
const defaultMenuActive=ref("")
const asideMenuList=reactive(
  [
    {
      path: "/admin/applicationSetting",
      title: $i18n.t('common.webSite') + $i18n.t('common.setting'),
      icon: "Setting",
    },
    {
      path:"/admin/mailSetting",
      title: $i18n.t('common.mail') + $i18n.t('common.setting'),
      icon:"Setting",
    },
    {
      path: "/admin/users",
      title: $i18n.t('common.user') + $i18n.t('common.manage'),
      icon: "Avatar",
    },
    {
      path:"/admin/styleSetting",
      title: $i18n.t('common.style') + $i18n.t('common.manage'),
      icon:"MagicStick",
    },
    {
      path: "/admin/specialDay",
      title: $i18n.t('common.specialDay'),
      icon: "Football",
    },
    {
      path: "/admin/about",
      title: $i18n.t('common.about'),
      icon: "Help",
    },
    
  ]
)
const onMenuClick=(menuInfo)=>{
  defaultMenuActive.value = menuInfo.path
  goToPage(menuInfo.path)
  subPageTitle.value=menuInfo.title
}
const setAdminTitle=()=>{
  subPageTitle.value = menuInfo.title
}
onMounted(()=>{
  // 页面渲染
  for (let i = 0; i < asideMenuList.length; i++) {
    const element = asideMenuList[i];
    if (element.path==$route.path){
      onMenuClick(element)
      break
    }
  }
  if (!defaultMenuActive.value){
    onMenuClick(asideMenuList[0])
  }
  window.onresize = () => {
    return (() => {
      viewHeight.value=document.documentElement.clientHeight
    })()
  }
})

</script>

<style scoped>
.layout-container-admin .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  border-bottom: 1px solid var(--el-text-color-secondary);
  color: var(--el-text-color-primary);
}
.layout-container-admin .el-aside {
  border-right: 1px solid var(--el-text-color-secondary);
  /* color: var(--el-text-color-primary); */
  /* background: var(--el-color-primary-light-8); */
}
.layout-container-admin .el-menu {
  border-right: none;
}
.layout-container-admin .el-main {
  padding: 0;
}
.layout-container-admin .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* right: 20px; */
  margin-left: auto;
}

.layout-container-admin .title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* left: 20px; */
  /* margin-right: auto; */
  font-size: 20px;
  font-weight: 600;
}
.quit-admin{
  cursor: pointer;
}
</style>
