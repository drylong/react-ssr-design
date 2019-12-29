import $http from '@/utils/request.js';

export const getUserRole = redata => $http.post('/getCurrentUserRole',redata).then( rsdata => rsdata.data).catch(err => err);