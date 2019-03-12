const mongoose = require('mongoose');
// 连接mongodb
mongoose.connect("mongodb://localhost:27017/boss-reciut", {useNewUrlParser:true}, function(err){
    if(err){
        console.log('Connection Error:' + err)
    }else{
        console.log('Connection success!')
    }
});
const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type: String,require: true},
        'type':{type:String,require:true},
        'avatar':{type:String}, //头像
        'desc':{type:String}, // 简介
        'title':{type:String}, //职位名
        'company':{type:String},
        'money':{type:Number}
    },
    chat:{

    }
};

for (let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports={
    getModel:function (name) {
        return mongoose.model(name);
    }
}
