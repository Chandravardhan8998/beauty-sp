import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  START_SIGNUP,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  START_SIGNIN,
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_START,
  LOGOUT,
  SIGNUP_SECOND_FAIL,
  SIGNUP_SECOND_SUCCESS,
  START_SECOND_SIGNUP,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_USER_IMAGE_FAIL,
  EDIT_USER_IMAGE_START,
  EDIT_USER_IMAGE_SUCCESS,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  RESET,
  LOGOUT_START,
  LOGOUT_FAIL,
} from '../Action/index';
const initialState = {
  auth: false,
  loading: false,
  initLoading: true,
  userData: {},
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_SIGNUP:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.user,
        loading: false,
        auth: true,
        token: action.token,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
      };
    case START_SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        userData: action.user,
        loading: false,
        auth: true,
        token: action.token,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case AUTHENTICATE:
      return {
        ...state,
        userData: action.userData,
        auth: true,
        token: action.token,
        initLoading: false,
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        auth: false,
        initLoading: false,
      };
    case AUTHENTICATE_START:
      return {
        ...state,
        initLoading: true,
      };
    case START_SECOND_SIGNUP:
      return {...state, loading: true};
    case SIGNUP_SECOND_SUCCESS:
      return {
        ...state,
        token: action.token,
        loading: false,
        userData: action.user,
      };
    case SIGNUP_SECOND_FAIL:
      return {
        ...state,

        loading: false,
      };
    case LOGOUT:
      return {
        auth: false,
        loading: false,
        initLoading: true,
        userData: {},
        token: '',
      };
    case LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case EDIT_USER_START:
      return {...state, loading: true};
    case EDIT_USER_FAIL:
      return {...state, loading: false};
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.user,
      };
    case EDIT_USER_IMAGE_START:
      return {...state, loading: true};
    case EDIT_USER_IMAGE_FAIL:
      return {...state, loading: false};
    case EDIT_USER_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.user,
      };
    case CHANGE_PASSWORD_START:
      return {...state, loading: true};
    case CHANGE_PASSWORD_FAIL:
      return {...state, loading: false};
    case CHANGE_PASSWORD_SUCCESS:
      return {...state, loading: false};
    case RESET:
      return {...state, loading: false};
    default:
      return state;
  }
};
