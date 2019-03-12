const express = require('express');
const utility = require('utility');

const Router = express.Router();

const model = require('./model');

const UserModel  = model.getModel('user');
const _filter = {pwd:0,__v:0};

Router.post('/register',function (req,res) {
    console.log(req.body);
    const {type,pwd,user} = req.body;

    UserModel.findOne({user:user},function (err,doc) {
        if (doc){
            return res.json({code:1,msg:"用户名已存在"});
        }
        const userModel = new UserModel({user,type,pwd:md5Pwd(pwd)});
        userModel.save(function (e,d) {
            if(e){
                return res.json({code:1,msg:'后端数据出错'});
            }
            const {user,type,_id} = d;
            res.cookie('userid',_id);
            return res.json({code:0,data:user,type,_id});
        });
    });
});
Router.post('/login',function (req,res) {
   const {user,pwd} = req.body;
   UserModel.findOne({user:user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
       if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
       }else{
           res.cookie('userid',doc._id);
           return res.json({code:0,data:doc})
       }
   });
});
Router.get('/list',function (req,res) {
    const {type} = req.query;

    UserModel.find({type},function (err,doc) {
        return res.json({code:0,data:doc});
    });
});
Router.get('/info',function (req,res) {
    //判断用户有没有cookie
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1})
    }else {
        UserModel.findOne({_id:userid},_filter,function (err,doc) {
            if(err){
                return res.json({code:1,msg:"后端出错"})
            }
            return res.json({code:0,data:doc})

        })
    }
});
Router.post('/update',function (req,res) {
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1})
    }else {
        const {body} = req;
        UserModel.findByIdAndUpdate(userid,body,function (err,doc) {
            if (err){
                return res.json({code:1,msg:'后端出错'})
            } else {
            const data = Object.assign({},{
                user:doc.user,
                type:doc.type
            },body);
            return res.json({code:0,data});
            }
        })
    }
});
function md5Pwd(pwd){
    const salt = 'wewqeqwew!!@@';
    return utility.md5(utility.md5(pwd+salt));
}

module.exports = Router;
