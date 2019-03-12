
export function getRedirectPath({type,avatar}) {
//    更具用户信息返回 跳转地址
//    user.type  /boss / genius
//    user.avatar /bossinfo /geniusinfo
    let url = (type=== 'boss')?'/boss':'/genius';
    if(!avatar){
       url+='info';
    }
    return url;
}