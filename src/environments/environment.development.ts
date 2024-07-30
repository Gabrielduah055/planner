


export const environment = {
  development: true,

   BASE_URL: 'https://esp-backend.amalitech-dev.net/api/v1',

  // BASE_URL: 'https://3f57072f-8050.euw.devtunnels.ms/api/v1',

  get LOGIN_URL() {
    return `${this.BASE_URL}/auth/login`;
  },

  get SIGN_UP_URL() {
    return `${this.BASE_URL}/auth/signup`;
  },

  get CREATE_EVENT_URL() {
    return `${this.BASE_URL}/event-vista/create-event`;
  },

  get ADMIN_CREATE_EVENT_URL() {
    return `${this.BASE_URL}/admin/create-event`;
  },

  get ADMIN_READ_ALL_EVENT_URL() {
    return `${this.BASE_URL}/admin/read-all`;
  },

  get ADMIN_GET_PROFILE() {
    return `${this.BASE_URL}/admin/view-profile`;
  },

  get ADMIN_CREATE_PROFILE() {
    return `${this.BASE_URL}/profile/create-admin-profile`;
  },

  get ADMIN_ACTIVATE_USER() {
    return `${this.BASE_URL}/admin/activate`;
  },

  get ADMIN_DEACTIVATE_USER() {
    return `${this.BASE_URL}/admin/deactivate`;
  },

  get RESET_URL() {
    return `${this.BASE_URL}/auth/reset-password`;
  },

  get FORGOT_PASS_URL() {
    return `${this.BASE_URL}/auth/verify-mail`;
  },

  get ORG_LOGOUT_URL() {
    return `${this.BASE_URL}/auth/logout`;
  },

  get GET_ALL_EVENTS() {
    return `${this.BASE_URL}/test/all-events`;
  },

  get TOKEN_URL() {
    return `${this.BASE_URL}/auth/verifyOtp`;
  },

  get CREATE_ADMIN() {
    return `${this.BASE_URL}/admin/createAdmin`;
  },

  get SEND_ADMIN_INVITE() {
    return `${this.BASE_URL}/admin/createAdmin`;
  },

  get CHANGE_PASSWORD() {
    return `${this.BASE_URL}/auth/activate-account`;
  },

  get CHANGE_ADMIN_PROFILE() {
    return `${this.BASE_URL}/admin/create-profile`;
  },

  get GET_ALL_ORG_EVENTS_CREATED() {
    return `${this.BASE_URL}/event-vista/read-all`;
  },

  get GET_ALL_USERS() {
    return `${this.BASE_URL}/admin/all-users`;
  },

  get GET_ALL_USERS_ORG() {
    return `${this.BASE_URL}/organizer/users`;
  },

  get ORG_BUSINESS_INFORMATION() {
    return `${this.BASE_URL}/unapproved-organizer/create-org-profile`;
  },
  get ORG_USER_INVITE() {
    return `${this.BASE_URL}/organizer/invite-user`;
  },

  get ORG_PIE_CHART() {
    return `${this.BASE_URL}/`;
  },

  get ORG_DEACTIVATE() {
    return `${this.BASE_URL}/organizer/invite-user`;    // organizer/deactivate-user/4352
  },


  get ORG_ACTIVATE() {
    return `${this.BASE_URL}/organizer/activate-user`;    // organizer/deactivate-user/4352
  },

  get ORG_CREATE_PROFILE() {
    return `${this.BASE_URL}/profile/create-organizer-profile`;    // organizer/deactivate-user/4352
  },

  get ORG_GET_PROFILE() {
    return `${this.BASE_URL}/organizer/view-profile`;    // organizer/deactivate-user/4352
  },


  ORG_SETTINGS: '',
  ORG_INVITE: '',
  ADMIN_INVITE: '',
  ORGANIZER_TOKEN: 'Token',
  ADMIN_TOKEN: 'adminToken',
  USER_ID: 'userId',
  RESET_EMAIL: 'resetEmail',
  ATTENDEE_TOKEN: 'Token',
  TOKEN_ENCRYPTION_KEY: 'ESP_FRONTEND'

};
