<script setup>
import { reactive } from "@vue/reactivity";
import { onActivated, onMounted } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import  apiItem  from "../api/item";


// 项目列表
// const itemList = reactive([
//   {
//     title:"日历记事本",
//     description:"我是描述内容",
//   }
// ])
const data =reactive({
  itemList:[],// 项目列表数据
});

const $router=useRouter();
const $i18n=useI18n();

global.cmn.setTitle($i18n.t("common.appName"))

const getList=()=>{
  apiItem.getMyItemList(0,0,(d)=>{
    data.itemList=d.list
  })
}


const goCalendarInfo=(itemId)=>{
  $router.push({path:"/calendar",query:{itemId:itemId}})
}

const createItem=()=>{
  ElMessageBox.prompt($i18n.t("home.new_item_box.content"),$i18n.t("home.new_item_box.title"), {
    inputPattern:
      /\S/,
    inputErrorMessage: $i18n.t("home.new_item_box.inputErrorMessage"),
    inputPlaceholder :"",
  })
  .then(({ value }) => {
    apiItem.create(value,"",()=>{
      ElMessage({
        type: 'success',
        message: $i18n.t("home.new_item_box.create_success_item_message",{'itemName':value}),
      })
      getList();
    })
  })
    
}
getList()
</script>
<template>
  <div>
    
    <el-main>
    <h1>{{$t("home.my_project")}}</h1>
    <!-- <el-button class="create-item-btn" size="small" @click="createItem" type="primary">{{$t("home.create_new_item")}}</el-button> -->
    <el-button class="create-item-btn" @click="createItem">{{$t("home.create_new_item")}}</el-button>
    <el-empty v-if="data.itemList.length==0" :description="$t('home.not_have_item')" />
    <el-row :gutter="12">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="4" v-for="item in data.itemList" :key="item.title">
          <el-popover
            placement="top-end"
            :width="200"
            trigger="hover"
            :content="item.description"
            :offset="-30"
            :hide-after="0"
            :show-after="200"
          >
            <template #reference>
              <el-card shadow="hover" class="item-list-card" @click="goCalendarInfo(item.itemId)"> 
                <div class="item-list-card-title e-primary-text">{{item.title}}</div>
                <div v-if="item.requirePassword" style="display:flex"  class="item-list-card-locked">
                  <el-icon style="font-size:20px;"><Lock /></el-icon>
                  <!-- <span style="margin-left:8px">{{$t('common.locked')}}</span> -->
                </div>
                <div v-if="!item.requirePassword" class="item-list-card-description">{{item.description}} </div>
              </el-card>
            </template>
            <div>
              <div class="e-regular-text">{{item.title}}</div>
              <div class="e-placeholder-text">{{item.createTime}}</div>
              <div v-if="!item.requirePassword">{{item.description}} </div>
              <div v-else>[{{$t('common.locked')}}]</div>
            </div>
          </el-popover>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<style scoped>
body,html{
    background: #909399;
  }
  /* 项目列表卡片 */
  .item-list-card{
    margin-top: 20px;
    cursor: pointer;
    border-radius: 20px;
    height: 116px;
  }

  .item-list-card-title{
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-list-card-description{
    margin-top: 10px;
    color: grey;
    font-size:12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .item-list-card-locked{
    margin-top: 10px;
    color: #fc9b9b;
  }


  .create-item-btn{
    background: linear-gradient(to bottom right, #fbb700, #ef0fff, #fbb700);
    font-weight: 900;
    background-clip:text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .create-item-btn:hover{
    background: linear-gradient(to bottom right, #ef0fff, var(--el-color-primary), #ef0fff);
    background-clip:text;
    -webkit-background-clip: text;
  }

  /* .create-item-btn-old:hover{
    transition:all 1s ease-in;
    background:linear-gradient(to bottom right,#fbb700, #ef0fff,#fbb700);
  } */

  /* .create-item-btn-old {
    border: none;
    width: 100px;
    height: 28px;
    background: linear-gradient(to bottom right, #ef0fff, var(--el-color-primary), #ef0fff);
  } */
</style>