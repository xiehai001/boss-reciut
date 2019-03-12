import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
   async componentDidMount(){
       const publicList = ['/login','/register'];
       const pathname = this.props.location.pathname;
       if(publicList.indexOf(pathname)>-1){
           return null
       }else {
           try {
               // 获取用户信息
               let res = await axios.get('/user/info');
               if (res.status === 200){
                   if(res.data.code === 0){
                       //    有登录信息
                       this.props.loadData(res.data.data);
                   }else {
                       this.props.history.push('/login');
                   }
               }
           }catch (e) {

           }
           //    是否登录
           //    现在的url login 不需要跳转
           //    用户的身份 boos 或牛人
           //    是否完善信息 （个人头像 个人简介）
       }



    }
    render(){
       return null;
    }

}
export default AuthRoute;