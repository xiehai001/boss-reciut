import React from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WhiteSpace, WingBlank,Button} from "antd-mobile";
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {
        register
    }
)
class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius' //boss
        };
    }
    handleRegister(){
        this.props.register(this.state)
    }
    handleChange(key,value){
        this.setState({
            [key]:value
        })
    }
    render(){
        const RadioItem =Radio.RadioItem;
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo/>
                {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                <List>
                    <InputItem onChange={value => this.handleChange('user',value)}>用户名</InputItem>
                    <InputItem type='password' onChange={value => this.handleChange('pwd',value)}>密码</InputItem>
                    <InputItem type='password' onChange={value => this.handleChange('repeatpwd',value)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genius'}
                               onChange={() => this.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}
                               onChange={() => this.handleChange('type','boss')}
                    >
                        Boss
                    </RadioItem>
                </List>
                <WingBlank>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}


export default Register;