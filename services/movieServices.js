/**
 * 电影模块服务
 */
const request = mypro.core.request;

//测试
var getmovielist = function (classify,jsonObj) {
    var url=`/${classify}`;
    return request.getRequest(url, jsonObj);
}

module.exports = { getmovielist };