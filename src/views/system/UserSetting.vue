<template>
    <el-main style="padding:20px;max-width:500px">
        <h2>{{ $t('common.setting') }}</h2>
        <el-form :model="form" label-width="auto">
            <el-form-item :label="$t('userSetting.darkMode')">
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

