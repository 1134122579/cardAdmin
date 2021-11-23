import request from "@/utils/request";

// 接口名称：获取优惠券列表

export function getCouponListApi(data) {
  return request({
    url: "getCouponList",
    method: "post",
    data
  });
}
// 接口名称：获取会员卡列表
export function getUserCouponListApi(data) {
  return request({
    url: "getUserCouponList",
    method: "post",
    data
  });
}

// 获取项目下拉列表
export function getSelectProjectApi(data) {
  return request({
    url: "getSelectProject",
    method: "get",
    data
  });
}

// 创建优惠券
export function createCouponApi(data) {
  return request({
    url: "createCoupon",
    method: "post",
    data
  });
}
// 创建会员兑换卡
export function createVipCodeApi(data) {
  return request({
    url: "createVipCode",
    method: "post",
    data
  });
}

// 接口名称：消费订单明细

export function getOrderDetialApi(data) {
  return request({
    url: "getOrderDetial",
    method: "post",
    data
  });
}
