const AUTH_SET_USER_NAME = AUTH_UPDATE_USER_NAME;
const AUTH_SET_EMAIL = AUTH_UPDATE_EMAIL;
const AUTH_SET_NEW_PASSWORD = AUTH_SET_NEW_PASSWORD;
const AUTH_ERROR = AUTH_ERROR;
const AUTH_UPDATE_STATE = AUTH_UPDATE_STATE;
const AUTH_LOADING = AUTH_LOADING;
const AUTH_RESET = AUTH_RESET;

export const updateAuthState = authenticated => ({
  type: AUTH_UPDATE_STATE,
  payload: authenticated
});
export const setUserName = userName => ({
  type: AUTH_SET_USER_NAME,
  payload: userName
});
export const setEmail = userEmail => ({
  type: AUTH_SET_USER_NAME,
  payload: userEmail
});
export const setNewPassword = newPassword => ({
  type: AUTH_SET_NEW_PASSWORD,
  payload: newPassword
});

export default function(
  state = {
    authenticated: false,
    userName: '',
    userEmail: '',
    newPassword: '',
    error: '',
    userLoading: true
  },
  action
) {
  switch (action.type) {
    case UPDATE_AUTH_STATE:
      return { ...state, authenticated: action.payload };
  }
}
