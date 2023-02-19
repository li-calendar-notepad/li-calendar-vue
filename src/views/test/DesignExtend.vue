<template>
    <div>
        <button @click="selectDialogShow=true">添加一项</button>
        <div class="form-content" v-for="item,index in formData" :key="index">
            <el-form :model="form" label-width="120px">
                <div v-if="item.formType=='input.number'">
                    <el-form-item :label="item.title">
                        <el-input type="number" v-model="form.name" :placeholder="item.placeholder" />
                    </el-form-item>
                </div>

                <div v-if="item.formType=='input.text'">
                    <el-form-item :label="item.title">
                        <el-input type="text" v-model="form.name" :placeholder="item.placeholder" />
                    </el-form-item>
                </div>

                <div v-if="item.formType=='select'">
                    <el-form-item :label="item.title">
                        <el-select v-model="form.region" :placeholder="item.placeholder">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>

    

    <Edialog 
      v-model:visible="selectDialogShow" 
      width="500px"
      title="选择一个组件" 
      >
        <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 460px"
        >

            <div class="flex">
            <el-button  @click="selectToolChange(item.tag)"  v-for="item,index in formTypes" :key="index" color="#626aef">{{item.title}}</el-button>
            </div>
            <!-- <el-form-item label="选择组件">
                <el-select v-model="form.selectTool" @change="selectToolChange"  placeholder="选择组件">
                    <el-option :label="item.title" :value="item.tag"  v-for="item,index in formTypes" :key="index"/>
                </el-select>
            </el-form-item> -->
        </el-form>
    </Edialog>

    <Edialog 
      v-model:visible="dialogShow" 
      width="500px"
      title="添加输入框" 
      >
        <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="treatAddData"
            style="max-width: 460px"
        >
            <el-form-item label="标题">
            <el-input v-model="treatAddData.title" />
            </el-form-item>
            <el-form-item label="提示语">
            <el-input v-model="treatAddData.placeholder" />
            </el-form-item>
            <el-form-item label="默认值">
            <el-input v-model="treatAddData.default" />
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="addInput">添加</el-button>
        </template>
    </Edialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import Edialog from "../../components/Edialog.vue";

const selectDialogShow=ref(false)
const dialogShow=ref(false)
const selectFormType=ref("")


const form=reactive({})
const treatAddData=reactive({})


// 表单数据
const formData=reactive([
    {
        formType:"input.number",
        title:"心情打个分",
        placeholder:"1-10分",
        default:"",
    },
    {
        formType:"input.text",
        title:"为什么不开心",
        placeholder:"解释一下呗",
    },
    {
        formType:"select",
        title:"开不开心",
        placeholder:"所以呢到底开心吗",
    },
])

// 表单类型
const formTypes=reactive({
    "input.number":{
        "title":"编辑框（数字）",
        "tag":"input.number",
    },
    "input.text":{
        "title":"编辑框（文本）",
        "tag":"input.text",
    },
    "select":{
        "title":"下拉选择",
        "tag":"select",
    },
})

// 选择
const selectToolChange=(tag)=>{
    console.log("当前选择额的编辑框",tag)
    selectFormType.value=tag
    treatAddData.formType=tag
    selectDialogShow.value=false
    dialogShow.value=true
}

// 添加编辑框
const addInput=()=>{
    console.log("保存",treatAddData)
    formData.push(JSON.parse(JSON.stringify(treatAddData)))
    dialogShow.value=false
}

</script>

<style>

</style>