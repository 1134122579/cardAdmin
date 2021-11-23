import request from '@/utils/request'

// 获取订单列表
export function getCarList(data) {
    return request({
        url: 'getCarList',
        method: 'post',
        data
    })
}

//修改车辆信息
export function editCar(data) {
    return request({
        url: 'editCar',
        method: 'post',
        data
    })
}
//删除车辆信息
export function delCar(data) {
    return request({
        url: 'delCar',
        method: 'post',
        data
    })
}
// 修改车辆状态
export function setCarStatus(data) {
    return request({
        url: 'setCarStatus',
        method: 'post',
        data
    })
}