import $http from '@/utils/request.js';

// 商品类型 列表
export const productClassList = redata => $http.get( '/productType/list',{params: redata}).then( rsdata => rsdata.data ).catch( err => err );

// 商品类型 添加
export const productClassAdd = redata => $http.post('productType/add', redata).then( rsdata => rsdata.data ).catch( err => err);

// 商品类型 修改
export const productClassEdit = redata => $http.post('/productType/edit', redata ).then( rsdata => rsdata.data).catch( err => err );

// 商品类型 修改
export const productClassDel = redata => $http.get('/productType/del', {params: redata}).then( rsdata => rsdata.data).catch( err => err);

// 商品类型 分页
export const productClassPage = redata => $http.post('/productType/page', redata).then( rsdata => rsdata.data).catch( err => err);