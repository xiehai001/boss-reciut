import React from 'react'
import {Card,WingBlank,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
@connect(
    state=>state,
    {getUserList}
)
class Boss extends React.Component{
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
        console.log();

        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.chatuser.userlist.map(v=>(
                    v.avatar?(
                        <Card
                        key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={v.title}

                        />
                        <Card.Body>
                            {v.desc}
                        </Card.Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}
export default Boss;
