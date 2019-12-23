import $http from '@/utils';

// 商品类型 列表
export const productClassList = redata => $http.get( '/productType/list',{params: redata}).then( rsdata => rsdata ).catch( err => err );

// 商品类型 添加
export const productClassAdd = redata => $http.post('productType', {redata}).then( rsdata => rsdata ).catch( err => err);

// 商品类型 修改
export const productClassEdit = redata => $http.post('/productType',{ redata }).then( rsdata => rsdata).catch( err => err );