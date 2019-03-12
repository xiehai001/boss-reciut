import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";

@connect(
    state=>state.user,
    {
        login
    })
class Login extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state={
          user:'',
          pwd:''
        };
    }
    register(){
        console.log(this.props);
        this.props.history.push('/register');
    }
    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }
    handleLogin(){
        this.props.login(this.state);
    }
    render(){
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <WingBlank>
                    <List >
                        <InputItem
                            onChange={value => this.handleChange('user',value)}
                        >用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={value => this.handleChange('pwd',value)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>

        )
    }
}


export default Login;