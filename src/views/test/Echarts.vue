<template>
    <div>
        <div id="sun123456" style="background-color: pink;height:500px;width:500px"> </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from "@vue/runtime-core";


onMounted(() => {

    var chartDom = document.getElementById('sun123456');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };

    option && myChart.setOption(option);
})

</script>
