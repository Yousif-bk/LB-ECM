export const AppRoutes = {
  Home: {
    main: "home",
    sub: ""
  },
  Auth: {
    main: "auth",
    signIn: {
      main: "sign-in",
      full: "auth/sign-in",
      sub: ""
    },
    signUp: {
      main: "sign-up",
      sub: ""
    },

  },
  Request:{
    main: "",
    User: {
      main: "create-request",
      details: "user-request-details",
    },
    Admin: {
      main: "admin-requests-list",
      details: "admin-request-details/:id",
    },
    SuperAdmin: {
      main: "security-requests-list",
      details: "security-request-details/:id",
    },
  },
  BigData: {
    main: "user-big-data/:id"
  }

};
