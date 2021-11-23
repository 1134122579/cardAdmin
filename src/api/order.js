import request from '@/utils/request'

// 获取订单列表
export function getVipOrderList(data) {
    return request({
        url: 'getVipOrderList',
        method: 'post',
        data
    })
}
// 备注会员订单
export function setVipOrderRemark(data) {
    return request({
        url: 'setVipOrderRemark',
        method: 'post',
        data
    })
}
// 获取充值定订单列表
export function getRechargeOrderList(data) {
    return request({
        url: 'getRechargeOrderList',
        method: 'post',
        data
    })
}
// 备注充值订单
export function setRechargeOrderRemark(data) {
    return request({
        url: 'setRechargeOrderRemark',
        method: 'post',
        data
    })
}
// 获取消费订单列表
export function getSaleOrderList(data) {
    return request({
        url: 'getSaleOrderList',
        method: 'post',
        data
    })
}
// 备注消费订单
export function setSaleOrderRemark(data) {
    return request({
        url: 'setSaleOrderRemark',
        method: 'post',
        data
    })
}