/**
 * 业务方法
 */
//判断首次向导
var judgeFirstLead = function (req, model, order) {
    var _flag = false;
    if (req.session.user.store.FinishStatus != '' && req.session.user.store.FinishStatus != '1,1,1,1,1,1,1,1,1,1') {
        _flag = true;
    }
    model.firstLead = _flag;
    model.leadOrder = order;
}

//更新向导状态
var updateLeadstate = function (req, flag) {
    if (req.session.user.store.FinishStatus != '' && req.session.user.store.FinishStatus != '1,1,1,1,1,1,1,1,1,1') {
        switch (flag) {
            case 'org': //机构信息
                req.session.user.store.FinishStatus = '1,1,0,0,0,0,0,0,0,0';
                break;
            case 'receivables': //收款账号
                req.session.user.store.FinishStatus = '1,1,1,0,0,0,0,0,0,0';
                break;
            case 'aboutus': //联系我们
                req.session.user.store.FinishStatus = '1,1,1,1,0,0,0,0,0,0';
                break;
            case 'copyright': //版权声明
                req.session.user.store.FinishStatus = '1,1,1,1,1,0,0,0,0,0';
                break;
            case 'promote': //推广渠道
                req.session.user.store.FinishStatus = '1,1,1,1,1,1,1,1,1,1';
                break;
            default:
                break;
        }
    }
}

module.exports = { judgeFirstLead, updateLeadstate };