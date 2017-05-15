const config = myproj.config,
      request = myproj.modules.request; 
const host=config.soaCoreHost; //B.myproj host
const myprojHost=config.myprojAppHost; //myproj host
const httprequest = myproj.core.http; 

var parseParam=function(param, key){
    var paramStr="";
    if(param instanceof String||param instanceof Number||param instanceof Boolean){
        paramStr+="&"+key+"="+encodeURIComponent(param);
    }
    else{
        for (var i in param) {
            var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
            paramStr+='&'+parseParam(this, k);      
        }
    }
    return paramStr.substr(1);
}

//get请求
var getRequest=function(url,jsonObj,callback){
    var _url=_convertHostUrl(url);
    _url=_url+'?'+parseParam(jsonObj);
    request.get({url: _url}, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            var _result=JSON.parse(body);
            callback(null,_result);
        }
        else
            callback(new Error("error"),null);
    }); 
} 

//post请求
var postRequest=function(url,jsonObj,callback){
    var _url=_convertHostUrl(url);
    jsonObj.ContentType='application/json';
    httprequest.post(
        _url,
        30000,
        jsonObj,
        function(err,res){
            var json = JSON.parse(res);
            callback(err, json);     
        },'utf-8',{},'utf-8',true);
    // request.post({url: _url,form:jsonObj}, (error, response, body)=>{
    //     if (!error && response.statusCode == 200) {
    //         var _result=JSON.parse(body);
    //         callback(null,_result);
    //     }
    //     else
    //         callback(new Error("error"),null);
    // }); 
}

//解析并转换URL
var _convertHostUrl=function(url){
    if(url.indexOf(":")>-1){
        var newurls=url.split(':');
        if(newurls[0]=="myproj")
            return myprojHost+newurls[1];
        else
            return host+url;
    }else //B.myproj
        return host+url;
}

module.exports={getRequest,postRequest};