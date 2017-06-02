/**
 * 电影模块控制器
 */
'use strict';
var movieServices = moviepro.services.movie;

// 获取电影列表
var getlist=function(req, res, next){
    var obj= {
        start: parseInt(req.query.pageindex-1)*parseInt(req.query.pagecount),
        count:parseInt(req.query.pagecount),
        city:req.query.city,
        q:req.query.q
    }
    var promise=movieServices.getmovielist(req.query.classify,obj);
    promise.then((data)=>{
        res.json({result:true,data:data});
    },(err)=>{
        res.json({result:false,data:err});
    })
}
module.exports = {getlist}