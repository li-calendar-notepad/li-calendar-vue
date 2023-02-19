
import moment from 'moment'
import { buildJson,exportJson, parseJson } from "./configJson";


const data = {
    onlyId: "",
    name: "",
    updateTime: "",
    startTime: "",
    endTime: "",
    days: "daysObj"
}

const buildSpecialDayData = (onlyId, name, startDate, endDate, days) => {
    data.name = name
    data.onlyId = onlyId
    data.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    data.startDate = startDate
    data.endDate = endDate
    data.days = days
    return buildJson("SpecialDay", "1", data)
}
const exportConfigJson = exportJson
const parseConfigJson = (res,fileRaw,callback) => {
    if (res){
        parseJson(fileRaw, (d, e) => {
            callback(true, d.data, d)
        })
    }
}


export default { parseConfigJson, exportConfigJson, buildSpecialDayData }