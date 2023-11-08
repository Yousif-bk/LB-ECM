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
    getUser: 'api/request/userRequestDetail/',
  },
  User:{
    getUser: 'api/user/getuser/'
  },
  Location: {
    userLocation: 'api/location/userLocation',
  },
  BigData: {
    getBigDataDetails: 'api/bigData/getBigdata/',
  },
  LaunchCampaign:{
    sentMessage: 'api/user/launchCampaign',
    sendBulkSMS: 'api/user/bulksms'
  }
};
