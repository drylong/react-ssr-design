import $http from '@/utils/request.js';

// 登录接口
export const login = redata => $http.post('/login',redata).then( rsdata => rsdata.data).catch(err => err);

// 注销借口
export const loginOut = redata => $http.post('/logout', redata).then(rsdata => rsdata.data).catch(err => err);