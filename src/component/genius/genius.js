import React from 'react'
import {Card,WingBlank,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
@connect(
    state=>state,
    {getUserList}
)
class Genius extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }
    componentDidMount() {
        this.props.getUserList(this.props.user.type);
    }

    render(){
        return (
            <h2>牛人</h2>
        )
    }
}
export default Genius;
