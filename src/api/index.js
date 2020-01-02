import $http from '@/utils/request.js';

// 用户权限
export const getUserRole = redata => $http.post('/getCurrentUserRole',redata).then( rsdata => rsdata.data).catch(err => err);

// 用户信息
export const personalInfo = redata => $http.post('/personalInfo', redata).then(rsdata => rsdata.data).catch(err => err);

// 头像上传接口
export const uploadAvatar = $http.defaults.baseURL + '/uploadAvatar';

// 请求头像地址接口
export const uploadAdress = $http.defaults.baseURL + '/upload/personal/';

// 头像修改接口
export const editAvatarImg = redata => $http.post('/editAvatarImg',redata).then( rsdata => rsdata.data).catch( err => err);
