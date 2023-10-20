export const ApiRoutes = {
  Auth: {
    signIn: 'api/user/login',
    signUp: 'api/user/create',
  },
  Request: {
    createRequest: 'api/request/create',
    getAdminRequest: 'api/request/adminList',
    getSuperAdminRequest: 'api/request/superAdminList',
    adminApporvalRequest: 'api/approval/admin',
    superAdminApporvalRequest: 'api/approval/superAdmin',
    getUserRequestDetail: 'api/request/userRequestDetail/',
  },
  Location: {
    userLocation: 'api/location/userLocation',
  },
  BigData: {
    getBigDataDetails: 'api/bigData/getBigdata/',
  },
};
