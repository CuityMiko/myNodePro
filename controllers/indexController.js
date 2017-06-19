'use strict';
var tools=mypro.core.tools;

// var redis = require('redis'),
//     RDS_PORT = 6379,        //端口号
//     RDS_HOST = '127.0.0.1',    //服务器IP
//     RDS_OPTS = {},            //设置项
//     client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

// client.on('connect',function(){
//     //设置值
//     var _stu={
//         Id:3,
//         Name:'王五',
//         Age:27
//     }
//     client.set('byouzykey',JSON.stringify(_stu),(err)=>{
//         if(!err)
//             console.log("redis写入成功！");
//     });
//     client.get('byouzykey', (err,result)=>{
//         //获取值
//         if(!err){ 
//             var _stu= JSON.parse(result);
//             console.log(`Id:${_stu.Id},Name:${_stu.Name},Age:${_stu.Age}`);
//         }
//     });
// });

//首页
var index=function(req,res,next){
    // tools.cacheGet('byouzykey',(err,result)=>{
    //     if(!err){
    //         var _stu= JSON.parse(result);
    //         console.log(`Id:${_stu.Id},Name:${_stu.Name},Age:${_stu.Age}`);
    //     }else{
    //         console.log("读取失败！");
    //     }
    //     res.render('index',{
    //         model:{
    //             username:'zhangsan'
    //         }
    //     });
    // })

    //设置值
    var _stu={
        Id:4,
        Name:'赵六',
        Age:47
    }
    // tools.cacheSet('byouzykey',JSON.stringify(_stu),(err)=>{
    //     if(!err){
    //         console.log("写入成功！");
    //     }else{
    //         console.log("写入失败！");
    //     }
    //     res.render('index',{
    //         model:{
    //             username:'zhangsan'
    //         }
    //     });
    // })

    res.render('index',{
        model:{
            username:'zhangsan'
        }
    });
}

var testly=function(req,res,next){
    res.render('test/testlayout',{
        layout:'_share/croot',
        model:{
            username:'lisi test'
        }
    });
}

const Student=mypro.models.Student.StudentModel;
// const Student=require('../models/StudentModel');
// mongoose的操作
var mongoosetest=function(req,res,next){
    let _student={
        username:'lisi',
        sex:'男'
    }
    // 第一种添加数据的方式（基于实体Entity的方式）
    //let stumodel=new Student(_student);
    // 保存
    //let promise=stumodel.save();

    // 第二种添加数据的方式（基于model的方式）
    let promise=Student.create(_student);
    promise.then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        res.render('examples/mongoose',{
            model:{
            }
        });
    })

    // 删除
    // Student.delete({username:'zhangsan'}).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(`删除失败！${err}`);
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })

    // 修改
    // Student.modify({username:'lisi'},{age:30,sex:'女'}).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })

    // 查
    // Student.findByName('lisi').then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })
}

module.exports = {index,testly,mongoosetest}
