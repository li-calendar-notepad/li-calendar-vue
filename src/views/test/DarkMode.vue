<template>
    <div>
        <button @click="open()">打开</button>
        <br>
        <button @click="confirm()">确认框</button>
        <br>
        <span @click.stop="toggleDark()">暗黑模式</span>
        <el-switch size="small" v-model="isDark" />


        <div style="width:800px;margin:0 auto">
            <EventInfo ref="eventInfoRef" :dialog="true" />
        </div>

    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import EventInfo from "../../components/calendarTools/EventInfo.vue";
import cmn from "../../utils/cmn"
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
console.log("暗黑模式", isDark)
const toggleDark = useToggle(isDark)

const eventInfoRef = ref()
const open = () => {
    eventInfoRef.value.renderByEventId(4, 81)
}

const confirm = () => {
    cmn.confirm("警告", "请确认是否删除", (res) => {
        console.log(res)// true 确认按钮，FALSE，取消按钮
    })
}
onMounted(() => {
    // open()
    // confirm()
})
</script>

<style scoped>

</style>