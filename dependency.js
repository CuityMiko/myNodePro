//全局依赖初始化
module.exports.init = function () {
    global.moviepro = {};
    
    //config
    moviepro.config = require('./config/config');

    //modules
    moviepro.modules = {};
    require('./dependencies/modules')(moviepro.modules);

    //cores
    moviepro.core = {};
    require('./dependencies/cores')(moviepro.core);
    
    //models
    moviepro.models = {};
    require('./dependencies/models')(moviepro.models);

    //services
    moviepro.services = {};
    require('./dependencies/services')(moviepro.services);

    //filters
    moviepro.filters = {};
    require('./dependencies/filters')(moviepro.filters);

    //controllers
    moviepro.controllers = {};
    require('./dependencies/controllers')(moviepro.controllers);
}