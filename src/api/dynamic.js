import request from '@/utils/request'
// 获取活动列表
export function getNewsList(data) {
    return request({
        url: 'getNewsList',
        method: 'post',
        data
    })
}
//添加活动
export function addNews(data) {
    return request({
        url: 'addNews',
        method: 'post',
        data
    })
}
//添加活动
export function editNews(data) {
    return request({
        url: 'editNews',
        method: 'post',
        data
    })
}
//设置活动状态该
export function editNewsStatus(data) {
    return request({
        url: 'editNewsStatus',
        method: 'post',
        data
    })
}
//设置活动状态该
export function delNews(data) {
    return request({
        url: 'delNews',
        method: 'post',
        data
    })
}
//