import $http from '@/utils/request.js';

// 商品列表
export const productList = redata => $http.get('product/list',{params:{redata}}).then( rsdata => rsdata.data).catch( err => err);
// 商品添加
export const productAdd = redata => $http.post('product/add',redata).then( rsdata => rsdata.data).catch( err => err);
// 商品修改
export const productEdit = redata => $http.post('product/edit',redata).then (rsdata => rsdata.data).catch( err => err);
// 商品删除
export const productDel = redata => $http.get('product/del',{params: redata}).then( rsdata => rsdata.data).catch( err => err);