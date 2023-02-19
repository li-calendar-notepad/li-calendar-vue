<template>
  <el-select v-model="value" :size="size" :placeholder="$t('common.default')" :change="change">
    <el-option
      :label="$t('common.default')"
      value=""
    >
      <span style="float: left">{{$t('common.default')}}</span>
      <span class="select-style" >
        <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event" >
          <div class="fc-event-main" style="padding:0 5px">Text</div>
        </div>
      </span>
    </el-option>
    <el-option
      v-for="item in data"
      :key="item.className"
      :label="item.title"
      :value="item.className"
      :size="size"
    >
      <span style="float: left">{{ item.title }}</span>
      <span
        class="select-style"
      >
        <div
          class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
          :class="item.className"
        >
          <div class="fc-event-main" style="padding:0 5px">Text</div>
        </div>
      </span>
    </el-option>
  </el-select>
</template>

<script setup>
// 使用示例：
// <SelectStyle :data="styleList"  v-model="editSubjectInfo.className" />
// 
// styleList：:
// [
//   {
//     title: 'Beijing',
//     className:"event-style-pink"
//   },
//   {
//     title: 'Beijing',
//     className:"event-style-pink"
//   },
// ]
defineProps({
  value:{},
  data:{},
  size:{},

})


const emits=defineEmits(['update:value'])

const change=(val)=>{
  emits('update:value',val)
}

</script>

<style scoped>
.select-style{
  margin-top: 6px;
  height: 20px;
  line-height: 20px;
  /* margin: 1px; */
  float: right;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>