<template>
    <div style="padding:20px">
        <p><h2>Li-Calendar | 锂日历记事本</h2></p>
        <p>作者： <a href="https://blog.enianteam.com/" target="_blank">红烧猎人</a> </p>
        <p>当前版本：{{version}}</p>
        开源地址：
        <a href="https://gitee.com/li-calendar-notepad/li-calendar-gin" target="_blank">Gitee</a> |
        <a href="https://github.com/li-calendar-notepad/li-calendar-gin" target="_blank">GttHub</a>

        <p>QQ交流群：685960647 （或扫下方二维码）</p>

        <p>问题建议和反馈可以到开源项目首页提Issue，或者加我微信好友！如果你认可本项目欢迎给个star或进行打赏支持一下，您的支持才是我做下去的动力。</p>

        <el-row :gutter="20" style="text-align: center;">
            <el-col :span="8">
                <img  style="height:350px;" src="/static/images/weixin_mingpian.png" alt="">
            </el-col>
            <el-col :span="8">
                <img  style="height:350px;" src="/static/images/qqgroup.png" alt="">
            </el-col>
            <el-col :span="8">
                <img  style="height:350px;" src="/static/images/weixin_dashang.png" alt="">
            </el-col>
            <el-col :span="8">
                <img  style="height:350px;" src="/static/images/zhifubao_dashang.png" alt="">
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiAbout from '../../api/admin/about'

const version=ref('--')

apiAbout.get((d)=>{
    console.log(d)
    version.value=d.version.Version
})
</script>
