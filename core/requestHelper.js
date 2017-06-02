const config = moviepro.config,
      request = moviepro.modules.request,
      q = moviepro.modules.q; 
      rp = moviepro.modules.rp; 
const host=config.soaCoreHost; //B.moviepro host
const proHost=config.soaProHost; //moviepro host
const httprequest = moviepro.core.http; 

//get请求
var getRequest=function(url,jsonObj){
    var options = {
        uri: _convertHostUrl(url),
        qs: jsonObj,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response 
    };
    var deferred=q.defer();
    rp(options)
    .then(function (repos) {
        deferred.resolve(repos);
    })
    .catch(function (err) {
        deferred.reject(err); 
    });
    return deferred.promise;
} 

//post请求
var postRequest=function(url,jsonObj){
    var _url=_convertHostUrl(url);
    // 方式一
    // jsonObj.ContentType='application/json';
    // httprequest.post(
    //     _url,
    //     30000,
    //     jsonObj,
    //     function(err,res){
    //         var json = JSON.parse(res);
    //         callback(err, json);     
    //     },'utf-8',{},'utf-8',true);
    // 方式二
    // request.post({url: _url,form:jsonObj}, (error, response, body)=>{
    //     if (!error && response.statusCode == 200) {
    //         var _result=JSON.parse(body);
    //         callback(null,_result);
    //     }
    //     else
    //         callback(new Error("error"),null);
    // }); 
    //方式三
    var options = {
        method: 'POST',
        uri:_url,
        body: jsonObj,
        json: true // Automatically stringifies the body to JSON 
    };
    var deferred=q.defer();
    rp(options)
    .then(function (parsedBody) {
        deferred.resolve(parsedBody); 
    })
    .catch(function (err) {
        deferred.reject(err); 
    });
    return deferred.promise;
}

//解析并转换URL
var _convertHostUrl=function(url){
    if(url.indexOf(":")>-1){
        var newurls=url.split(':');
        if(newurls[0]=="moviepro")
            return proHost+newurls[1];
        else
            return host+url;
    }else //B.moviepro
        return host+url;
}

module.exports={getRequest,postRequest};