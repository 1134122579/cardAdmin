import request from "@/utils/request";
// 获取活动列表
export function getNewsListApi(data) {
  return request({
    url: "getNews",
    method: "post",
    data
  });
}
//添加活动
export function addNewsApi(data) {
  return request({
    url: "addNews",
    method: "post",
    data
  });
}
//添加活动
export function editNewsApi(data) {
  return request({
    url: "editNews",
    method: "post",
    data
  });
}
//设置活动状态该
export function ediNewsStatusApi(data) {
  return request({
    url: "editNewsStatus",
    method: "post",
    data
  });
}
//设置活动状态该
export function delNewsApi(data) {
  return request({
    url: "delNews",
    method: "post",
    data
  });
}
//
