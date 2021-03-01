import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {
  ADD_STAFF_FAIL,
  ADD_STAFF_START,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_START,
  DELETE_STAFF_SUCCESS,
  FETCH_STAFF_FAIL,
  FETCH_STAFF_START,
  FETCH_STAFF_SUCCESS,
  EDIT_STAFF_FAIL,
  EDIT_STAFF_START,
  EDIT_STAFF_SUCCESS,
} from '.';
import {API} from '../../Backend/Backend';

export const addStaff = (staff) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_STAFF_START,
    });
    try {
      const asyncData = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(asyncData);
      console.log(token);
      const resAddStaff = await fetch(`${API}/staff/add`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(staff),
      });
      if (resAddStaff.status !== 200) {
        Toast.show('Try Again', Toast.LONG);
        dispatch({
          type: ADD_STAFF_FAIL,
        });
        return;
      }

      const resAddStaffJSON = await resAddStaff.json();
      const {msg, status, data} = resAddStaffJSON;
      if (status === 'error') {
        Toast.show(msg, Toast.LONG);
        dispatch({
          type: ADD_STAFF_FAIL,
        });
        return;
      }
      //EVERYTHING IS FINE NOW
      Toast.show(msg, Toast.LONG);
      return dispatch({
        type: ADD_STAFF_SUCCESS,
        staffData: data.userData,
      });
    } catch (error) {
      Toast.show(`Check Internet Connection!`, Toast.LONG);
      dispatch({
        type: ADD_STAFF_FAIL,
      });
      return;
    }
  };
};

export const fetchStaff = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_STAFF_START,
    });
    try {
      const asyncData = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(asyncData);
      const fetchStaffRes = await fetch(`${API}/staff`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (fetchStaffRes.status !== 200) {
        Toast.show('Try Again!!', Toast.LONG);
        dispatch({
          type: FETCH_STAFF_FAIL,
        });
        return;
      }
      const fetchStaffResJSON = await fetchStaffRes.json();
      const {msg, status, data} = fetchStaffResJSON;
      if (status === 'error') {
        Toast.show(msg, Toast.LONG);
        dispatch({type: FETCH_STAFF_FAIL});
        return;
      }
      //EVERYTHING is fine here
      dispatch({
        type: FETCH_STAFF_SUCCESS,
        staffData: data,
      });
      return;
    } catch (error) {
      Toast.show(`Check Internet Connection!`, Toast.LONG);
      dispatch({
        type: FETCH_STAFF_FAIL,
      });
      return;
    }
  };
};

export const deleteStaff = (id) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_STAFF_START,
    });
    try {
      const asyncData = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(asyncData);
      const deleteStaffRes = await fetch(`${API}/remove-staff/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (deleteStaffRes.status !== 200) {
        Toast.show(`Try Again`, Toast.LONG);
        dispatch({
          type: DELETE_STAFF_FAIL,
        });
        return;
      }
      const deleteStaffResJSON = await deleteStaffRes.json();
      const {msg, status, data} = deleteStaffResJSON;
      if (status === 'error') {
        Toast.show(msg, Toast.LONG);
        dispatch({
          type: DELETE_STAFF_FAIL,
        });
        return;
      }
      dispatch({
        type: DELETE_STAFF_SUCCESS,
        deletedStaffID: id,
      });
      return;
    } catch (error) {
      Toast.show(`Try Again: ${error}`, Toast.LONG);
      dispatch({
        type: DELETE_STAFF_FAIL,
      });
      return;
    }
  };
};

export const editStaff = (staffDataForEdit) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_STAFF_START,
    });
    try {
      const asyncData = await AsyncStorage.getItem('userData');
      const {token} = JSON.parse(asyncData);
      const editUserRes = await fetch(`${API}/staff/edit`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(staffDataForEdit),
      });
      if (editUserRes.status !== 200) {
        Toast.show('Try Again', Toast.LONG);
        dispatch({
          type: EDIT_STAFF_FAIL,
        });
        return;
      }

      const editUserResJSON = await editUserRes.json();
      const {msg, status, data} = editUserResJSON;
      if (status === 'error') {
        Toast.show(msg, Toast.LONG);
        dispatch({
          type: EDIT_STAFF_FAIL,
        });
        return;
      }
      //EVERYTHING IS FINE NOW
      Toast.show(msg, Toast.LONG);
      console.log('Edited Staff DATA', data);
      return dispatch({
        type: EDIT_STAFF_SUCCESS,
        staffData: data.userData,
      });
    } catch (error) {
      console.log('catch edit user', error);
      Toast.show(`Try Again ${error}`, Toast.LONG);
      dispatch({
        type: EDIT_USER_FAIL,
      });
      return;
    }
  };
};
