import $http from '@/utils/request.js';

// 账户 列表    返回一个axios 地址已经配好
// export const accountList = (rqdata) => {
//   return $http.get('/account/list',{ params:rqdata }).then((rsdata) => rsdata).catch();
// };
export const accountList = (rqdata) => $http.get('/account/list', {params: rqdata}).then((rsdata) => rsdata.data).catch( err => err);

// 账户 增加
export const accountAdd = redata => $http.post('/account/add', redata ).then( rsdata => rsdata.data ).catch( err => err );

// 账户 修改
export const accountEdit = redata => $http.post('/account/edit' , redata ).then( rsdata => rsdata.data ).catch( err => err );

// 账户 删除
export const accountDel = redata => $http.get('/account/del', { params: redata }).then( rsdata => rsdata.data ).catch( err => err );

// 账户 查询
export const accountSearch = redata => $http.post('/account/search' ,redata).then( rsdata => rsdata.data).catch( err => err );

//账户  分页
export const accountPage = redata => $http.post('/account/page',redata).then( rsdata => rsdata.data).catch( err => err);