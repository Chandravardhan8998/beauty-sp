import AsyncStorage from '@react-native-async-storage/async-storage';
import {
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
} from '.';
import {API} from '../../Backend/Backend';
import {saveDataToStorage} from './Auth';
import Toast from 'react-native-simple-toast';
export const editUserData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_USER_START,
    });
    try {
      const userDataAsync = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(userDataAsync);
      const res = await fetch(`${API}/provider-edit-profile`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.status !== 200) {
        console.log('Try Again', 'edit user');
        return dispatch({
          type: EDIT_USER_FAIL,
        });
      }
      if (resData.status === 'error') {
        console.log(resData.msg, 'edit user');
        return dispatch({
          type: EDIT_USER_FAIL,
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
      const updatedUserData = {...user_data, other_data};
      saveDataToStorage({user: updatedUserData, token});
      Toast.show(resData.msg, 1000);
      dispatch({
        type: EDIT_USER_SUCCESS,
        user: updatedUserData,
      });
    } catch (error) {
      Toast.show('Check Internet Connection!', 1000);
      dispatch({
        type: EDIT_USER_FAIL,
      });
    }
  };
};
export const uploadImage = (formDataImage) => {
  return async (dispatch) => {
    dispatch({type: EDIT_USER_IMAGE_START});
    try {
      const userDataAsync = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(userDataAsync);
      const res = await fetch(`${API}/update-profile-image`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formDataImage,
      });
      const resJson = await res.json();
      const {msg} = resJson;
      if (res.status !== 200) {
        Toast.show('Try Again!', 1000);
        dispatch({type: EDIT_USER_IMAGE_FAIL});
        return;
      }
      if (resJson.status === 'error') {
        Toast.show(msg, 1000);
        dispatch({type: EDIT_USER_IMAGE_FAIL});
        return;
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
      const updatedUserData = {...user_data, other_data};
      //FUNCTION FOR SAVE DATA TO USER
      saveDataToStorage({user: updatedUserData, token});
      Toast.show(msg, 1000);
      dispatch({
        type: EDIT_USER_IMAGE_SUCCESS,
        user: updatedUserData,
      });
    } catch (error) {
      Toast.show('Try Again!', 1000);
      dispatch({type: EDIT_USER_IMAGE_FAIL});
    }
  };
};
export const changePassword = (passwordData) => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_START,
    });
    try {
      const userDataAsync = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(userDataAsync);
      const changePasswordRes = await fetch(`${API}/change-password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      if (changePasswordRes.status !== 200) {
        return dispatch({type: CHANGE_PASSWORD_FAIL});
      }
      const changePassResJson = await changePasswordRes.json();
      const {msg} = changePassResJson;
      Toast.show(msg, 1000);
      if (changePassResJson.status === 'error') {
        return dispatch({type: CHANGE_PASSWORD_FAIL});
      }
      return dispatch({type: CHANGE_PASSWORD_SUCCESS});
    } catch (error) {
      Toast.show('Check Internet Connection!', 1000);
      return dispatch({type: CHANGE_PASSWORD_FAIL});
    }
  };
};
export const resetMessages = () => {
  return (dispatch) => {
    dispatch({
      type: RESET,
    });
  };
};
