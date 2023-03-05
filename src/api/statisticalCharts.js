// API 接口 - 统计报表
import request from './request.js'
const domain = "/api/v1"
let visitToken = ""

const statisticalCharts = {}

/**
 * @description: 设置token
 * @param {string} token
 * @return this
 */
statisticalCharts.setVisitToken=(token)=>{
    visitToken = token
    return this
}


/**
 * @description: 折线图（按事件主题的总数查询）
 * @param {int} itemId
 * @param {array} dates
 * @param {string} statisticalMethod day/month 按天或者按月
 * @param {string} visitToken (可空)
 * @param {function} successCallback
 */
statisticalCharts.lineTopicCount = (itemId, dates, statisticalMethod, visitToken, successCallback) => {
    const data = {}
    data['itemId'] = itemId
    data['visitToken'] = visitToken
    data['dates'] = dates
    data['statisticalMethod'] = statisticalMethod
    request.postAuth(domain + "/item/lineTopicCount", data, successCallback)
}

/**
 * @description: 饼图 各主题总数
 * @param {int} itemId
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} visitToken
 * @param {function} successCallback
 * @return {*}
 */
statisticalCharts.pieChartTopic = (itemId, startDate, endDate, visitToken, successCallback) => {
    const data = {}
    data['startDate'] = startDate
    data['visitToken'] = visitToken
    data['endDate'] = endDate
    data['itemId'] = itemId
    request.postAuth(domain + "/item/pieChartTopic", data, successCallback)
}




export default statisticalCharts