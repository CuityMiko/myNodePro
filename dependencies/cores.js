//core依赖
module.exports = function (cores) {
    cores.tools = require('../core/tools');
    cores.http = require('../core/httpHelper');
    cores.request = require('../core/requestHelper');
    cores.businessConvert = require('../core/businessConvert');
    cores.businessMethod = require('../core/businessMethod');
}