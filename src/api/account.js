import $http from '@/utils/request.js';

// 账户列表    返回一个axios 地址已经配好
// export const accountList = (rqdata) => {
//   return $http.get('/account/list',{ params:rqdata }).then((rsdata) => rsdata).catch();
// };
export const accountList = (rqdata) => $http.get('/account/list', {params: rqdata}).then((rsdata) => rsdata).catch();

// 增加账户
export const accountadd = redata => $http.post('/account/add',{ redata }).then( rsdata => rsdata ).catch( err => err );