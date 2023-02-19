<template>
    <div style="padding: 20px;">
        <el-row class="mb-4">
            <div style="margin-top: 10px;">
                <span class="demonstration"> 选择日期范围 </span>

                <el-date-picker v-model="selectDate" type="daterange" range-separator="-" start-placeholder="Start date"
                    end-placeholder="End date" />
            </div>
            <div style="margin:10px 20px 0 20px">
                <el-button>最近7天</el-button>
                <el-button type="primary">最近30天</el-button>
            </div>

        </el-row>

        <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card class="box-card" style="width:100%;margin-top:10px">
                    <div id="pieChartTopic" style="height:400px;width:100%"> </div>
                </el-card>

            </el-col>

            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <el-card class="box-card" style="width:100%;margin-top:10px">
                    <div id="eventStatistics" style="height:400px;width:100%"> </div>
                </el-card>

            </el-col>

            <el-col :span="24">
                <el-card class="box-card" style="width:100%;margin-top:10px">
                    <div id="topicMonth" style="height:400px;width:100%"> </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";

const selectDate = ref()

const chartsObjs = {}



/**
 * @description: 渲染所有echarts
 * @return {*}
 */
const renderCharts = () => {
    const charts = {}
    charts.pieChartTopic = document.getElementById('pieChartTopic');
    charts.eventStatistics = document.getElementById('eventStatistics');
    charts.topicMonth = document.getElementById('topicMonth');

    for (const k in charts) {

        // 如果图表已经存在，重新绘制图表，否则创建
        if (!chartsObjs[k]) {
            chartsObjs[k] = echarts.init(charts[k]);
        } else {
            chartsObjs[k].resize()
        }
        const option = ref()
        // 假数据
        const data = [{ "name": "\u542f\u660e\u661f", "value": 174 }, { "name": "\u5176\u4ed6", "value": 16 }, { "name": "\u6c34\u52a1", "value": 98 }, { "name": "\u5b89\u9632", "value": 1 }, { "name": "\u6c61\u6c34", "value": 2 }, { "name": "\u6d41\u91cf\u8ba1", "value": 7 }, { "name": "\u4e2d\u5b87", "value": 1 }, { "name": "\u6d41\u91cf\u8ba1\u6f14\u793a\u5e73\u53f0", "value": 4 }, { "name": "\u5176\u4ed6\u4e8b\u4ef6\u4e3b\u9898", "value": 0 }]

        if (k == "pieChartTopic") {
            const postdata = {
                "startTime": '2022-08-23',
                "endTime": '2022-08-23',
            }
            option.value = {
                title: {
                    text: '事件主题/占比',
                    subtext: postdata["startTime"] + " ~ " + postdata["endTime"],
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                label: {
                    //echarts饼图内部显示百分比设置
                    show: true,
                    formatter: '{d}%',
                    color: "#000", //颜色
                    fontSize: 12 //字体大小
                },
                series: [
                    {
                        // name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: data,
                        // data: [
                        //     { value: 1048, name: 'Search Engine' },
                        //     { value: 735, name: 'Direct' },
                        //     { value: 580, name: 'Email' },
                        //     { value: 484, name: 'Union Ads' },
                        //     { value: 300, name: 'Video Ads' }
                        // ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

        } else if (k == "eventStatistics") {
            var xdataValue = [];
            var value = [];
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                console.log(element)
                xdataValue[i] = element.name;
                value[i] = element.value;
            }
            option.value = {
                title: {
                    text: '事件主题/次'
                },
                xAxis: {
                    type: 'category',
                    data: xdataValue,
                    axisLabel: {
                        // 旋转角度
                        rotate: 45
                    }
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1
                },
                label: { //柱体上显示数值
                    show: true,//开启显示
                    position: 'top',//在上方显示
                    textStyle: {//数值样式
                        fontSize: '25px',
                        color: '#666',
                    },
                    formatter: '{c}',
                },
                series: [
                    {
                        data: value,
                        type: 'bar'
                    }
                ]
            };

        } else if (k == "topicMonth") {
            const data = { "topics": ["\u542f\u660e\u661f", "\u5176\u4ed6", "\u6c34\u52a1", "\u5b89\u9632", "\u6c61\u6c34", "\u6d41\u91cf\u8ba1", "\u4e2d\u5b87", "\u6d41\u91cf\u8ba1\u6f14\u793a\u5e73\u53f0"], "datas": { "\u542f\u660e\u661f": [90, 93, 31, 5, 12, 4, 0], "\u5176\u4ed6": [0, 0, 0, 11, 5, 0, 0], "\u6c34\u52a1": [7, 1, 18, 50, 29, 0, 0], "\u5b89\u9632": [0, 0, 0, 1, 0, 0, 0], "\u6c61\u6c34": [0, 1, 1, 0, 0, 0, 0], "\u6d41\u91cf\u8ba1": [0, 1, 2, 0, 4, 0, 0], "\u4e2d\u5b87": [1, 0, 0, 0, 0, 0, 0], "\u6d41\u91cf\u8ba1\u6f14\u793a\u5e73\u53f0": [0, 0, 3, 1, 0, 0, 0] }, "dates": ["2022-08", "2022-09", "2022-10", "2022-11", "2022-12", "2023-01", "2023-02"] }
            var series = [];
            for (let i = 0; i < data.topics.length; i++) {
                const element = data.topics[i];
                console.log(element)
                series[i] = {}
                series[i]['name'] = element
                series[i]['data'] = data.datas[element]
                series[i]['type'] = 'line'
                // series[i]['stack'] = 'Total'
            }
            option.value = {
                title: {
                    text: '事件主题/(月/天)',
                    subtext: '注：当日期范围大于31天，将按月统计',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: data.topics
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.dates
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1
                },
                series: series
            };

        } else {
            option.value = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, Math.floor(Math.random() * 1000)],
                        type: 'line'
                    }
                ]
            };
        }

        chartsObjs[k].setOption(option.value)

    }
}

//使用防抖 (setTimeout定时器)
const getWindowInfo = () => {
    // const windowInfo = {
    //     width: window.innerWidth,
    //     hight: window.innerHeight
    // }
    renderCharts();
};
const debounce = (fn, delay) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
};


onMounted(() => {
    //触发事件    触发时间（指定时间内执行事件）
    const cancalDebounce = debounce(getWindowInfo, 500);
    window.addEventListener('resize', cancalDebounce);
    renderCharts();
})

// 原文链接：https://blog.csdn.net/weixin_46409887/article/details/129028214
onUnmounted(() => {
    //移除监听事件
    const cancalDebounce = debounce(getWindowInfo, 500);
    window.removeEventListener('resize', cancalDebounce);
})

</script>
