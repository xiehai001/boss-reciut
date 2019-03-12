import axios from 'axios'

const USER_LIST = 'USER_LIST';
const initSate = {
    userlist:[]
}

export function chatuser(state=initSate,action) {
    switch (action.type) {
        case USER_LIST:
            return {...state,userlist:action.payload};
        default:
            return state;
    }
}

export function userList(data) {
    return {type:USER_LIST,payload:data}
}

export function getUserList(type) {
    return async dispatch=>{
        try {
            let res = await axios.get('/user/list?type=genius');
            if(res.data.code===0){
                dispatch(userList(res.data.data))
            }
        }catch (e) {
            console.log(e);
        }
    }
}
