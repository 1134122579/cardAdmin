import request from '@/utils/request'

// 获取会员模板列表
export function getVipList(data) {
    return request({
        url: 'getVipList',
        method: 'post',
        data
    })
}
// 修改会员
export function editVip(data) {
    return request({
        url: 'editVip',
        method: 'post',
        data
    })
}
// 修改会员
export function editVipDesc(data) {
    return request({
        url: 'editVipDesc',
        method: 'post',
        data
    })
}

// 获取会员模板列表
export function getVipDescList(data) {
    return request({
        url: 'getVipDescList',
        method: 'post',
        data
    })
}
//