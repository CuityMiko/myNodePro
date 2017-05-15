/**
 * 业务转换
 */
//服务大类转换
var bigTypeConvert=function(bigtype,bigservices){
    var _bigtype=parseInt(bigtype);
    var _serviceType='';
    if(bigservices!=undefined && bigservices.length>0){
        for(var i=0;i<bigservices.length;i++){
            if(parseInt(bigservices[i].BigType)==_bigtype){
                _serviceType=bigservices[i].Name;
                break;
            }
        }
    }
    return _serviceType;
}

//版本转换 1:入门版 2：基础版3： 旗舰版 4： 个人版
var versionConvert=function(versionid){
    var _versionid=parseInt(versionid);
    var _version='';
    switch (_versionid) {
        case 1:
            _version='入门版';
            break;
        case 2:
            _version='基础版';
            break;
        case 3:
            _version='旗舰版';
            break;
        case 4:
            _version='个人版';
            break;
        default:
            break;
    }
    return _version;
}

module.exports={bigTypeConvert,versionConvert};