<template>
  <el-scrollbar>
    <div class="subject-scrollbar-flex-content">
        <div class='fc-event subject-scrollbar-item' :styleClass="item.className"  :class="item.className" v-for=" item,index in subjectList" :key="index">
          <div class='fc-event-main' >#{{item.title}}# </div>
        </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
   const subjectList= [
        {
            "className": "event-style-china-color-shenhuilan",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "跑步十公里"
        },
        {
            "className": "event-style-color-c-name14",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "好闺蜜"
        },
        {
            "className": "event-style-china-red",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "士大夫"
        },
        {
            "className": "event-style-color-c-name10",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "过分的话"
        },
        {
            "className": "event-style-color-c-name9",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "宋都股份无人"
        },
        {
            "className": "event-style-color-c-name8",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "安抚"
        },
        {
            "className": "event-style-color-c-name9",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "阿萨德"
        },
        {
            "className": "event-style-color-c-name8",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "阿斯蒂芬"
        },
        {
            "className": "event-style-color-c-name9",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "ad士大夫"
        },
        {
            "className": "event-style-color-c-name10",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "sad分"
        },
        {
            "className": "event-style-color-c-name9",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "从v"
        },
        {
            "className": "event-style-color-c-name8",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "啊啊所多"
        },
        {
            "className": "event-style-china-red",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "哈哈哈哈"
        },
        {
            "className": "event-style-color-c-name14",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "运动"
        },
        {
            "className": "event-style-color-c-name11",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "撒旦法是的是的"
        },
        {
            "className": "event-style-china-color-jingtailan",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "景泰蓝"
        },
        {
            "className": "event-style-color-c-name8",
            "content": "",
            "itemId": 4,
            "subjectId": 0,
            "title": "撒旦法"
        },
        {
            "className": "kelaiyin12",
            "content": "Aaaaaa",
            "itemId": 4,
            "subjectId": 0,
            "title": "克莱因121"
        }
    ]
</script>


<style scoped>
.subject-scrollbar-flex-content {
  display: flex;
  padding: 8px 0;
}
.subject-scrollbar-item {
  flex-shrink: 0;
  display: flex;
  padding: 2px;
  margin: 3px 8px;
  border-radius: 4px;
}
</style>

<style>
body .event-style-pink{background-color:#ff005e!important;border:1px solid #dc024a!important;}body .event-style-pink .fc-event-main{color:#ffffff!important;}body .event-style-color-c-name8{background-color:#9cf2be!important;border:1px solid #9cf2be!important;}body .event-style-color-c-name8 .fc-event-main{color:#ffffff!important;}body .event-style-color-c-name9{background-color:#9df2de!important;border:1px solid #9df2de!important;}body .event-style-color-c-name9 .fc-event-main{color:#ffffff!important;}body .event-style-color-c-name10{background-color:#ff9f9f!important;border:1px solid #ff9f9f!important;}body .event-style-color-c-name10 .fc-event-main{color:#ffffff!important;}body .event-style-color-c-name11{background-color:#CEA60A!important;border:1px solid #CEA60A!important;}body .event-style-color-c-name11 .fc-event-main{color:#ffffff!important;}body .event-style-color-c-name14{background-color:#15c8ff!important;border:1px solid #02c5cc!important;}body .event-style-color-c-name14 .fc-event-main{color:#ffffff!important;}body .event-style-china-red{background-color:#D82824!important;border:1px solid #D82824!important;}body .event-style-china-red .fc-event-main{color:#FFC609!important;}body .event-style-china-color-yanghong{background-color:#ED5A65!important;border:1px solid #ED5A65!important;}body .event-style-china-color-yanghong .fc-event-main{color:#fff!important;}body .event-style-china-color-TANGCHANGPUHONG{background-color:#DE1C31!important;border:1px solid #DE1C31!important;}body .event-style-china-color-TANGCHANGPUHONG .fc-event-main{color:#fff!important;}body .event-style-china-color-pinlan{background-color:#2B73AF!important;border:1px solid #2B73AF!important;}body .event-style-china-color-pinlan .fc-event-main{color:#fff!important;}body .event-style-china-color-jingtailan{background-color:#2775B6!important;border:1px solid #2775B6!important;}body .event-style-china-color-jingtailan .fc-event-main{color:#fff!important;}body .event-style-china-color-shenhuilan{background-color:#132C33!important;border:1px solid #132C33!important;}body .event-style-china-color-shenhuilan .fc-event-main{color:#fff!important;}body .event-style-china-color-yanghong{background-color:#ED5A65!important;border:1px solid #ED5A65!important;}body .event-style-china-color-yanghong .fc-event-main{color:#fff!important;}body .event-style-china-color-TANGCHANGPUHONG{background-color:#DE1C31!important;border:1px solid #DE1C31!important;}body .event-style-china-color-TANGCHANGPUHONG .fc-event-main{color:#fff!important;}body .event-style-china-color-pinlan{background-color:#2B73AF!important;border:1px solid #2B73AF!important;}body .event-style-china-color-pinlan .fc-event-main{color:#fff!important;}body .event-style-china-color-jingtailan{background-color:#2775B6!important;border:1px solid #2775B6!important;}body .event-style-china-color-jingtailan .fc-event-main{color:#fff!important;}body .event-style-china-color-shenhuilan{background-color:#132C33!important;border:1px solid #132C33!important;}body .event-style-china-color-shenhuilan .fc-event-main{color:#fff!important;}
</style>