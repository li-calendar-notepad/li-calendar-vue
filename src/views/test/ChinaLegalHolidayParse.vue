<template>
    <div style="margin:20px">
        <el-upload :on-success="success" :on-error="success" class="upload-demo" :show-file-list="false"
            :auto-upload="true" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将json文件拖拽到此处或 <em>点此上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    将 <em>http://timor.tech/api/holiday/year/2023?type=Y&week=Y</em> 内容导出为json文件，上传后自动解析为中国法定假日文件。
                </div>
            </template>

        </el-upload>
        <el-button v-if="newJson != ''" size="large" type="primary" @click="exportFile">导出</el-button>
    </div>
</template>

<script setup >
import { UploadFilled } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import specialDay from "../../utils/configJson/SpecialDay";
import { parseJson } from "../../utils/configJson/configJson";
import { ElMessage } from "element-plus";

import moment from 'moment'

let newJson = ref("")
const exportFileName = ref("")
// import FileSaver from 'file-saver'
// const buildJson = (ability, abilityVersion,data)=>{
//     const j={
//         "AppName": "Li-Calendar",
//         "Ability": ability,
//         "AbilityVersion": abilityVersion,
//         "AppAllowLowVersion": "1",
//         "Version": "1",
//     }
//     j.Data = data
//     return j
// }

// const buildSpecialDayData = (onlyId, name, startTime,endTime, days)=>{
//     const data={
//         onlyId: onlyId,
//         name: name,
//         updateTime: "2022-12-28 16:11:57",
//         startTime: startTime,
//         endTime: endTime,
//         days: days
//     }
//     return buildJson("SpecialDay","1",data)
// }

// const exportJson = (d)=>{
//     const data = JSON.stringify(d)
//     const blob = new Blob([data], { type: 'application/json' })
//     FileSaver.saveAs(blob, `文件名称.json`)

// }

const exportFile = () => {
    specialDay.exportConfigJson(newJson.value, exportFileName.value)
}

const success = (response, uploadFile) => {
    console.log(uploadFile);
    parseJson(uploadFile.raw, (uploadData, src) => {
        const days = {}
        let maxDate = ""
        let minDate = ""
        for (const k in uploadData.holiday) {
            const item = uploadData.holiday[k]
            days[item.date] = {
                holiday: item.holiday,
                name: item.name,
            }


            if (!maxDate) {
                maxDate = item.date
            } else {
                // 
                const diff = moment(item.date).diff(moment(maxDate), 'days')
                if (diff >= 0) {
                    maxDate = item.date
                }
            }

            if (!minDate) {
                minDate = item.date
            } else {
                const diff = moment(item.date).diff(moment(minDate), 'days')
                if (diff <= 0) {
                    minDate = item.date
                }
            }

        }
        console.log("开始结束时间", minDate, maxDate)
        exportFileName.value = "中国法定节假日" + moment(minDate).format('YYYY-MM-DD') + '_' + moment(maxDate).format('YYYY-MM-DD')
        // minDate = moment(minDate).format('YYYY-MM-DD 00:00:00')
        // maxDate = moment(maxDate).format('YYYY-MM-DD 23:59:59')
        newJson.value = specialDay.buildSpecialDayData('china-legal-holiday', "中国法定节假日", minDate, maxDate, days)
        ElMessage.success("解析完成，点击导出按钮进行导出~")

    })
    // let reader = new FileReader()
    // reader.readAsText(uploadFile.raw)
    // reader.onload = ((e) => {
    //     uploadData.value = JSON.parse(e.target.result)
    //     // console.log(JSON.parse(e.target.result))
    //     var days={}
    //     for (const k in uploadData.value.holiday) {
    //         const item = uploadData.value.holiday[k]
    //         // console.log(item)

    //         days[item.date]={
    //             holiday: item.holiday,
    //             name: item.name,
    //         }
    //     }
    //     console.log(days)
    //     const newJson=buildSpecialDayData("china-legal-holiday", "中国法定节假日", "zxz", "zxz", days)
    //     exportJson(newJson)
    // })


}
</script>