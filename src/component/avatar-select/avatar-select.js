import React from 'react';
import {Grid,List} from 'antd-mobile'
import PropType from 'prop-types'

class AvatarSelect extends React.Component{
    static proptypes = {
        selectAvatar:PropType.func.isRequired
    };
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let avatarList = 'boy,girl,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,zebra';
        avatarList = avatarList.split(',').map(value =>({
            icon:require(`../img/${value}.png`),
            text:value
        }));
        console.log(avatarList);
        const gridHeader = this.state.text?(<div><span>已选择头像</span><img src={this.state.icon} alt=""/></div>) : '请选择头像';
        return(
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elem=>{
                            this.setState(elem);
                            this.props.selectAvatar(elem.text);
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelect;