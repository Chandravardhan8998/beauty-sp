import {API} from '../../Backend/Backend';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  LOGOUT,
  LOGOUT_START,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SECOND_FAIL,
  SIGNUP_SECOND_SUCCESS,
  SIGNUP_SUCCESS,
  START_SECOND_SIGNUP,
  START_SIGNIN,
  LOGOUT_FAIL,
  START_SIGNUP,
  AUTHENTICATE_START,
} from '.';
export const AuthenticateUser = () => {
  return async (dispatch) => {
    dispatch({type: AUTHENTICATE_START});
    const userData = await AsyncStorage.getItem('userData');
    if (!!userData) {
      const {token, user} = JSON.parse(userData);
      if (!token || !user) {
        return dispatch({
          type: AUTHENTICATE_FAIL,
        });
      } else {
        return dispatch({
          type: AUTHENTICATE,
          userData: user,
          token,
        });
      }
    } else {
      return dispatch({
        type: AUTHENTICATE_FAIL,
      });
    }
  };
};
export const logout = () => {
  return async (dispatch, state) => {
    dispatch({type: LOGOUT_START});
    try {
      const {token, userData} = state().auth;
      const logoutRes = await fetch(`${API}/logout`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userData.id,
        }),
      });
      if (logoutRes.status !== 200) {
        Toast.show('Logout Failed', Toast.LONG);
        dispatch({
          type: LOGOUT_FAIL,
        });
        return;
      }
      AsyncStorage.removeItem('companyinfo');
      AsyncStorage.removeItem('userData');
      AsyncStorage.removeItem('personalinfo');
      AsyncStorage.removeItem('bankData');
      AsyncStorage.removeItem('staff');
      dispatch({
        type: LOGOUT,
      });
      return {status: 'success'};
    } catch (error) {
      Toast.show('Logout failed!!', 2000);
      setTimeout(() => {
        Toast.show('Check Internet Connection!', 2000);
      }, 2000);
      dispatch({
        type: LOGOUT_FAIL,
      });
      return {status: 'error'};
    }
  };
};
export const userSignup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: START_SIGNUP,
    });
    try {
      const res = await fetch(`${API}/provider-signup-first`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (res.status !== 200) {
        Toast.show('Try Again', 3000);
        return dispatch({
          type: SIGNUP_FAIL,
        });
      }
      const resData = await res.json();
      const {data, msg, token} = resData;

      if (resData.errors) {
        Toast.show(msg, 2000);
        return dispatch({
          type: SIGNUP_FAIL,
        });
      }
      dispatch({
        type: SIGNUP_SUCCESS,
        user: data,
        token,
      });
      saveDataToStorage({
        user: data,
        token,
      });
    } catch (error) {
      Toast.show('Try Again!', 2000);
      return dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };
};

export const providerSignin = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: START_SIGNIN,
      });
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(res.status);
      if (res.status !== 200) {
        Toast.show('Try Again!', 2000);
        return dispatch({
          type: SIGNIN_FAIL,
        });
      }
      //Check Error
      const resData = await res.json();
      const {data, msg, token} = resData;
      if (resData.status === 'error') {
        Toast.show(msg, 2000);
        return dispatch({
          type: SIGNIN_FAIL,
        });
      }
      const resUserProfileData = await fetch(`${API}/get-profile`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userProfileData = await resUserProfileData.json();
      const {user_data, other_data} = userProfileData;
      //Dispatch Success To REDUX
      const allUserData = {...user_data, other_data};
      dispatch({
        type: SIGNIN_SUCCESS,
        user: allUserData,
        token,
      });
      saveDataToStorage({
        user: allUserData,
        token,
      });
    } catch (error) {
      //Dispatch Errors to Redux
      console.log(error);
      Toast.show('Something went wrong!', 2000);
      return dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };
};
export const providerSecondSignUp = (finalData, token) => {
  return async (dispatch) => {
    dispatch({
      type: START_SECOND_SIGNUP,
    });
    var formdata = new FormData();
    formdata.append('dob', finalData.dob);
    formdata.append('service_tags', finalData.service_tags);
    formdata.append('categories', finalData.categories);
    formdata.append('tax_number', finalData.tax_number);
    formdata.append('address', finalData.address);
    formdata.append('zip_code', finalData.zip_code);
    formdata.append('insured', finalData.insured);
    formdata.append('city', finalData.city);
    formdata.append('country', finalData.country);
    formdata.append('state', finalData.state);
    formdata.append('gender', finalData.gender);
    formdata.append(
      'company_registration_number',
      finalData.company_registration_number,
    );
    formdata.append('social_security_number', finalData.social_security_number);
    formdata.append('current_latitude', finalData.current_latitude);
    formdata.append('current_longitude', finalData.current_longitude);
    formdata.append('bio', finalData.bio);
    formdata.append('expertise', finalData.expertise);
    formdata.append('education', finalData.education);
    formdata.append('facebook_url', finalData.facebook_url);
    formdata.append('linkdin_url', finalData.linkdin_url);
    formdata.append('instagram_url', finalData.instagram_url);
    formdata.append('youtube_url', finalData.youtube_url);
    formdata.append('company_name', finalData.company_name);
    formdata.append('account_type', finalData.account_type);
    formdata.append('account_number', finalData.account_number);
    formdata.append('bank_country', finalData.bank_country);
    formdata.append('account_name', finalData.account_name);
    try {
      const res = await fetch(`${API}/provider-signup`, {
        method: 'POST',
        headers: {
          // 'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      console.log(res.status);
      if (res.status !== 200) {
        Toast.show('Try again', 2000);
        return dispatch({
          type: SIGNUP_SECOND_FAIL,
        });
      }
      const resData = await res.json();
      const {msg, data} = resData;
      if (resData.status === 'error') {
        Toast.show(msg, 2000);
        return dispatch({
          type: SIGNUP_SECOND_FAIL,
        });
      }
      Toast.show(msg, 2000);
      dispatch({
        type: SIGNUP_SECOND_SUCCESS,
        user: {...data.user_data, user_id: data.user_id},
        token,
      });
      saveDataToStorage({...data.user_data, user_id: data.user_id}, token);
      AsyncStorage.removeItem('personalinfo');
      AsyncStorage.removeItem('companyinfo');
      return;
    } catch (error) {
      Toast.show(error + ' Try again', 2000);
      return dispatch({
        type: SIGNUP_SECOND_FAIL,
      });
    }
  };
};
export const saveDataToStorage = async ({user, token}) => {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      user,
    }),
  );
  return;
};
