import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './Backend';
import Toast from 'react-native-simple-toast';
export const removeStaff = async (id) => {
  try {
    const asyncData = await AsyncStorage.getItem('userData');
    const {token} = JSON.parse(asyncData);
    const deleteStaff = await fetch(`${API}/remove-staff/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (deleteStaff.status !== 200) {
      Toast.show('Deleting Failed', Toast.LONG);
      return {msg: msg || 'Try Again!', data: [], status: 'error'};
    }
    const deleteStaffResJSON = await deleteStaff.json();
    const {data, msg, status} = deleteStaffResJSON;
    if (status === 'error') {
      Toast.show(msg, Toast.LONG);
      return {msg: msg || 'Try Again!', data: [], status: 'error'};
    }
    return deleteStaffResJSON;
  } catch (error) {
    console.log('4');
    Toast.show(error, Toast.LONG);
    return {status: 'error', msg: error, data: []};
  }
};
