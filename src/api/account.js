import $http from '@/utils/request.js';

// 账户 列表    返回一个axios 地址已经配好
// export const accountList = (rqdata) => {
//   return $http.get('/account/list',{ params:rqdata }).then((rsdata) => rsdata).catch();
// };
export const accountList = (rqdata) => $http.get('/account/list', {params: rqdata}).then((rsdata) => rsdata).catch( err => err);

// 账户 增加
export const accountadd = redata => $http.post('/account/add',{ redata }).then( rsdata => rsdata ).catch( err => err );

// 账户 修改
export const accountedit = redata => $http.post('/account/edit' ,{ redata }).then( rsdata => rsdata ).catch( err => err );

// 账户 删除
export const accountdel = redata => $http.get('/account/del', { params: redata }).then( rsdata => rsdata ).catch( err => err );