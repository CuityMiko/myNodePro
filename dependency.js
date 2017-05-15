//全局依赖初始化
module.exports.init = function () {
    global.myproj = {};
    
    //config
    myproj.config = require('./config/config');

    //modules
    myproj.modules = {};
    require('./dependencies/modules')(myproj.modules);

    //cores
    myproj.core = {};
    require('./dependencies/cores')(myproj.core);
    
    //models
    myproj.models = {};
    require('./dependencies/models')(myproj.models);

    //services
    myproj.services = {};
    require('./dependencies/services')(myproj.services);

    //filters
    myproj.filters = {};
    require('./dependencies/filters')(myproj.filters);

    //controllers
    myproj.controllers = {};
    require('./dependencies/controllers')(myproj.controllers);
}