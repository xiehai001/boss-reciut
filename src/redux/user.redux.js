import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG';
const LOAO_DATA = 'LOAO_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
};


export function errorMsg(msg){
    return {type:ERROR_MSG,msg}
}

//reducer
export function user(state=initState,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,redirectTo:getRedirectPath(action.payload),msg:'',...action.payload};
        case LOAO_DATA:
            return {...state,...action.payload};
            case ERROR_MSG:
            return {...state,msg:action.msg};
        default:
            return state;
    }
}

export function authSuccess(data) {
    return {type:AUTH_SUCCESS,payload:data};
}
export function login({user,pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户或密码必须输入')
    }
    return async dispatch => {
        try {
            let res = await axios.post('/user/login', {user, pwd});
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        } catch (e) {
            dispatch(errorMsg('服务器请求出错'))

        }
    }
}

export function register({user,pwd,repeatpwd,type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码与确认密码不一致');
    }
    return async dispatch => {
        try {
            let res = await axios.post('/user/register', {user, pwd, type});
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        } catch (e) {
            dispatch(errorMsg('服务器请求出错'))
        }
    }
}
export function loadData(userInfo) {
    return {type:LOAO_DATA,payload:userInfo};
}
export function update(data) {
    return async dispatch=>{
        try {
            let res = await axios.post('/user/update',data);
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }catch (e) {
            dispatch(errorMsg('服务器请求出错'))
        }
    }
}