<template>
    <el-main style="padding:20px;max-width:500px">
        <h2>设置</h2>
        <el-form :model="form" label-width="120px">
            <el-form-item label="深色模式">
                <el-switch size="small" v-model="isDark" />
            </el-form-item>
        </el-form>
        
    </el-main>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
useToggle(isDark)
</script>

