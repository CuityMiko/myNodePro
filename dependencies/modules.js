//模块依赖 
module.exports = function (modules) {
    modules.request = require('request');
    modules.session = require('express-session');
    modules.redis = require('redis');
    modules.q=require('q');
    modules.rp = require('request-promise');
} 