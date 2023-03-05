<template>
    <div>
        <StipulateTemplate style="color:#303133" :dialog="dialog" v-model:dialogShow="dialogShow"
            title="统计"
            :dialogBeforeClose="dialogBeforeClose" 
            :dialog-draggable="false" :dialog-show-close="true" 
            dialogBigScreenWidth="800px"
            dialogWidth="90%"
            :dialog-full-screen="false" @dialogOpened="dialogOpened" @dialogClosed="dialogClosed" @dialogClose="dialogClose">
            <div>
                <el-row class="mb-4">
                    <div style="margin-top: 10px">
                        <span class="demonstration"> 范围 </span>

                        <el-date-picker v-model="selectDate" type="daterange" range-separator="-"
                            start-placeholder="Start date" end-placeholder="End date" @visible-change="onSelectedDate" />
                    </div>
                    <div style="margin: 10px 20px 0 20px">
                        <el-button @click="renderNearByDays(7)">最近7天</el-button>
                        <el-button @click="renderNearByDays(30)">最近30天</el-button>
                        <el-button @click="renderNearByDays(90)">最近90天</el-button>
                        <el-button @click="renderNearByDays(180)">最近半年</el-button>

                    </div>
                </el-row>

                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-card class="box-card" style="width: 100%; margin-top: 10px">
                            <div id="pieChartTopic" style="height: 400px; width: 100%"></div>
                        </el-card>
                    </el-col>

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-card class="box-card" style="width: 100%; margin-top: 10px">
                            <div id="eventStatistics" style="height: 400px; width: 100%"></div>
                        </el-card>
                    </el-col>

                    <el-col :span="24">
                        <el-card class="box-card" style="width: 100%; margin-top: 10px">
                            <div id="topicMonth" style="height: 400px; width: 100%"></div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

        </StipulateTemplate>
    </div>
</template>

<script setup>
import { reactive, ref  } from "@vue/reactivity";
import StipulateTemplate from "./common/stipulateTemplate.vue";
import moment from 'moment'
import { ElMessage } from "element-plus";
import { onMounted,onUnmounted } from "@vue/runtime-core";
import cmn from "../../utils/cmn"

import apiStatisticalCharts from "../../api/statisticalCharts";

import { FullScreen, BottomLeft, CloseBold } from '@element-plus/icons-vue'
import * as echarts from "echarts";

import { useI18n } from "vue-i18n";
import { auto } from "@popperjs/core";
const $i18n = useI18n()
const props = defineProps({
    itemId: Number,
    // done: {},
    visitToken: {},
    dialog: Boolean,
    dialogShow: Boolean,
    dialogBeforeClose: {},
    // dialogOpened: {},
    // dialogFullScreen:{},
})

// const dialogFullScreen=ref(false)
const selectDate = ref([new Date(), new Date()])
const chartsObjs = {};
const dateFormat = "YYYY-MM-DD";
const defaultValue = ref([new Date(), new Date()])
/**
 * @description: 渲染所有echarts
 * @return {*}
 */
const renderCharts = (startDate, endDate) => {
    // console.log("准备渲染的", startDate, endDate);
    const charts = {};
    charts.pieChartTopic = document.getElementById("pieChartTopic");
    charts.eventStatistics = document.getElementById("eventStatistics");
    charts.topicMonth = document.getElementById("topicMonth");

    for (const k in charts) {
        // 如果图表已经存在，重新绘制图表，否则创建
        if (!chartsObjs[k]) {
            chartsObjs[k] = echarts.init(charts[k],cmn.isDark()?"dark":"");
        } else {
            chartsObjs[k].resize();
        }
        const option = ref();

        if (k == "pieChartTopic" || k == "eventStatistics") {
            apiStatisticalCharts.pieChartTopic(props.itemId, startDate, endDate, props.visitToken, (d) => {
                const data = d
                if (k == "pieChartTopic") {

                    option.value = {
                        backgroundColor: 'transparent',
                        title: {
                            text: "事件模板/占比",
                            subtext: startDate + " ~ " + endDate,
                            left: "center",
                        },
                        tooltip: {
                            trigger: "item",
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                        },
                        label: {
                            //echarts饼图内部显示百分比设置
                            show: true,
                            formatter: "{d}%",
                            color: cmn.isDark()?"#d6d9e1":"#000", //颜色
                            fontSize: 12, //字体大小
                        },
                        series: [
                            {
                                // name: 'Access From',
                                type: "pie",
                                radius: "50%",
                                data: data,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)",
                                    },
                                },
                            },
                        ],
                    };
                    chartsObjs[k].setOption(option.value);
                } else {
                    let xdataValue = [];
                    let value = [];
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        xdataValue[i] = element.name;
                        value[i] = element.value;
                    }
                    chartsObjs[k].setOption(renderEventStatistics(xdataValue, value));
                }

            });
        } else if (k == "topicMonth") {
            let dates = []; // 日期列表
            let statisticalMethod = "day";
            const diffDays = moment(endDate).diff(moment(startDate), "days");
            // 获取时间差 如果是大于31天将按月查询
            if (diffDays < 31) {
                dates = enumerateDaysBetweenDatesDays(startDate, endDate, dateFormat);
            } else {
                statisticalMethod = "month";
                dates = enumerateDaysBetweenDatesMonth(startDate, endDate, "YYYY-MM-01");
            }

            apiStatisticalCharts.lineTopicCount(props.itemId, dates, statisticalMethod, props.visitToken, (data) => {
                let topics = [];
                var series = [];
                let i = 0;
                for (const key in data.datas) {
                    topics.push(key);
                    if (Object.hasOwnProperty.call(data.datas, key)) {
                        const element = data.datas[key];
                        series[i] = {};
                        series[i]["name"] = key;
                        series[i]["data"] = element;
                        series[i]["type"] = "line";
                        // series[i]['stack'] = 'Total'
                    }
                    i++;
                }
                if (diffDays >= 31) {
                    for (let i = 0; i < dates.length; i++) {
                        const element = dates[i];
                        dates[i] = dates[i].substr(0, 7);
                    }
                }

                option.value = {
                    backgroundColor: 'transparent',
                    title: {
                        text: "事件模板/(月/天)",
                        subtext: "注：当日期范围大于31天，将按月统计",
                    },
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        data: topics,
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                        },
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: dates,
                    },
                    yAxis: {
                        type: "value",
                        minInterval: 1,
                    },
                    series: series,
                };

                chartsObjs[k].setOption(option.value);
            });
        } else {
            option.value = {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, Math.floor(Math.random() * 1000)],
                        type: "line",
                    },
                ],
            };
        }

        // chartsObjs[k].setOption(option.value);
    }
};

//使用防抖 (setTimeout定时器)
const getWindowInfo = () => {
    // const windowInfo = {
    //     width: window.innerWidth,
    //     hight: window.innerHeight
    // }
    renderCharts(selectDate.value[0].format(dateFormat), selectDate.value[1].format(dateFormat));
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
    };
};

/**
 * @description: 取两个日期之前的天数组
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} formatStr 默认 "YYYY-MM-DD dddd"
 * @return {array}
 */
const enumerateDaysBetweenDatesDays = (startDate, endDate, formatStr) => {
    // 假定你已经保证了startDate 小于endDate，且二者不相等
    var formatStr = formatStr || "YYYY-MM-DD dddd";
    let daysList = [];
    let SDate = moment(startDate);
    let EDate = moment(endDate);
    let xt;
    daysList.push(SDate.format(formatStr));
    while (SDate.add(1, "days").isBefore(EDate)) {
        // 注意这里add方法处理后SDate对象已经改变。
        daysList.push(SDate.format(formatStr));
    }
    daysList.push(EDate.format(formatStr));
    return daysList;
};

/**
 * @description: 取两个日期之前的年数组
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} formatStr 默认 "YYYY-MM-DD dddd"
 * @return {array}
 */
const enumerateDaysBetweenDatesYear = (startDate, endDate, formatStr) => {
    let daysList = [];
    var formatStr = formatStr || "YYYY-MM-DD dddd";
    const start = moment(startDate);
    const end = moment(endDate);
    const day = end.diff(start, "year");
    daysList.push(start.format(formatStr));
    for (let i = 1; i <= day; i++) {
        daysList.push(start.add(1, "year").format(formatStr));
    }
    return daysList;
};

/**
 * @description: 取两个日期之前的月数组
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} formatStr 默认 "YYYY-MM-DD dddd"
 * @return {array}
 */
const enumerateDaysBetweenDatesMonth = (startDate, endDate, formatStr) => {
    let daysList = [];
    var formatStr = formatStr || "YYYY-MM-DD dddd";
    let SDate = moment(startDate);
    let EDate = moment(endDate);
    let xt;
    daysList.push(SDate.format(formatStr));
    while (SDate.add(1, "month").isBefore(EDate)) {
        // 注意这里add方法处理后SDate对象已经改变。
        daysList.push(SDate.format(formatStr));
    }
    daysList.push(EDate.format(formatStr));
    return daysList;
};

/**
 * @description: 获取指定前天数的日期
 * @param {int} day
 */
const enumerateDayNearDates = (days) => {
    const start = moment().subtract(days, "day").format(dateFormat);
    const end = moment().format(dateFormat);
    return enumerateDaysBetweenDates(start, end, dateFormat);
};

/**
 * @description: 渲染最近指定天数的数据
 * @param {int} days
 */
const renderNearByDays = (days) => {
    const start = moment().subtract(days, "day").format(dateFormat);
    const end = moment().format(dateFormat);

    selectDate.value[0] = moment().subtract(days, "day")
    selectDate.value[1] = moment()
    renderCharts(start, end);
};


/**
 * @description: 渲染柱状图
 * @param {object} xdataValue x坐标
 * @param {array} value
 * @return {object}
 */
const renderEventStatistics = (xdataValue, value) => {

    return {
        backgroundColor: 'transparent',
        title: {
            text: "事件模板/次",
        },
        xAxis: {
            type: "category",
            data: xdataValue,
            axisLabel: {
                // 旋转角度
                rotate: 45,
            },
        },
        yAxis: {
            type: "value",
            minInterval: 1,
        },
        label: {
            //柱体上显示数值
            show: true, //开启显示
            position: "top", //在上方显示
            textStyle: {
                //数值样式
                fontSize: "25px",
                color: "#666",
            },
            formatter: "{c}",
        },
        series: [
            {
                data: value,
                type: "bar",
            },
        ],
    };


}

const onSelectedDate = (visible) => {
    if (!visible) {
        const start = moment(selectDate.value[0]).format(dateFormat);
        const end = moment(selectDate.value[1]).format(dateFormat);
        renderCharts(start, end);
    }
};


const dialogOpened = ()=>{
    //触发事件    触发时间（指定时间内执行事件）
    const cancalDebounce = debounce(getWindowInfo, 500);
    window.addEventListener("resize", cancalDebounce);
    if(props.dialog==true){
        renderNearByDays(7);
    }
}

onMounted(() => {
    // echarts.
    
});

const dialogClosed =()=>{
    // 原文链接：https://blog.csdn.net/weixin_46409887/article/details/129028214
    //移除监听事件
    const cancalDebounce = debounce(getWindowInfo, 500);
    window.removeEventListener("resize", cancalDebounce);
}

const emits=defineEmits([
  "update:dialogShow",
])

const dialogClose=()=>{
    emits("update:dialogShow",false)
}


onUnmounted(() => {
    dialogClosed()
});


</script>

<style lang="scss" scoped></style>