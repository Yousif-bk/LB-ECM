export const ApiRoutes = {
  Auth: {
    signIn: 'api/user/login',
    signUp: 'account/create',
  },
  Request: {
    createRequest: 'api/request/create',
    getAdminRequest: 'api/request/adminList',
    getSuperAdminRequest: 'api/request/superAdminList',
    adminApporvalRequest: 'api/approval/admin',
    superAdminApporvalRequest: 'api/approval/superAdmin',
  }
};
