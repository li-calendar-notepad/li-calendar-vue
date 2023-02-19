import FileSaver from 'file-saver'
// import { cmn } from "@/utils/cmn";
import cmn from "@/utils/cmn";

const app_name = "Li-Calendar"
const suffix = cmn.expoprtSuffix


const baseJsonV1Data = {
    AppName: app_name,
    Ability: "ability",
    AbilityVersion: "abilityVersion",
    AppAllowLowVersion: "1",
    Version: "1",
    Data: "",
}



export const buildJson = (ability, abilityVersion, data) => {
    baseJsonV1Data.Ability = ability
    baseJsonV1Data.AbilityVersion = abilityVersion
    baseJsonV1Data.Data = data
    return baseJsonV1Data
}


export const exportJson = (d,fileName) => {
    const data = JSON.stringify(d)
    const blob = new Blob([data], { type: 'application/json' })
    FileSaver.saveAs(blob, fileName + suffix)
}


export const parseJson = (fileRaw,callback)=>{
    let reader = new FileReader()
    reader.readAsText(fileRaw)
    reader.onload = ((e)=>{
        callback(JSON.parse(e.target.result),e)
    })
}

export default { parseJson, exportJson, buildJson }