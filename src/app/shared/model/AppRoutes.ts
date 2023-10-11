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
    },
    Admin: {
      main: "admin-requests-list",
    },
    SuperAdmin: {
      main: "superAdmin-requests-list",
    }
  }

};
