import {
  UPDATE_BANK_FAIL,
  UPDATE_BANK_START,
  FETCH_BANK_START,
  FETCH_BANK_SUCCESS,
} from '.';
import Toast from 'react-native-simple-toast';

import {API} from '../../Backend/Backend';

export const updateBank = (bankData) => {
  return async (dispatch, state) => {
    const {token} = state().auth;
    dispatch({type: UPDATE_BANK_START});
    try {
      const bankUpdateRes = await fetch(`${API}/bank-details`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bankData),
      });
      const nullBankData = {
        account_name: '',
        account_number: '',
        bank_country: '',
        bank_name: '',
        account_type: '',
      };
      let bankDataJSON = await bankUpdateRes.json();
      const {data, msg} = bankDataJSON;
      if (bankUpdateRes.status !== 200) {
        Toast.show('Try Again', 'bank data load fail');
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: nullBankData,
        });
      }
      if (bankDataJSON.status === 'error') {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: nullBankData,
        });
      }
      if (!!data && !!data.account_number) {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: data,
        });
      } else {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: {
            account_name: '',
            account_number: '',
            bank_country: '',
            bank_name: '',
            account_type: '',
          },
        });
      }
    } catch (error) {
      Toast.show('Check Internet Connection!', Toast.LONG);
      return dispatch({
        type: UPDATE_BANK_FAIL,
      });
    }
  };
};
export const fetchBankDetails = () => {
  return async (dispatch, state) => {
    dispatch({
      type: FETCH_BANK_START,
    });
    try {
      const {token} = state().auth;
      const bankDataRes = await fetch(`${API}/bank-details-data`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const nullBankData = {
        account_name: '',
        account_number: '',
        bank_country: '',
        bank_name: '',
        account_type: '',
      };
      let bankDataJSON = await bankDataRes.json();
      const {data, msg} = bankDataJSON;
      if (bankDataRes.status !== 200) {
        Toast.show('Try Again', Toast.LONG);
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: nullBankData,
        });
      }
      if (bankDataJSON.status === 'error') {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: nullBankData,
        });
      }
      if (!!data && !!data.account_number) {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: data,
        });
      } else {
        return dispatch({
          type: FETCH_BANK_SUCCESS,
          bankData: nullBankData,
        });
      }
    } catch (error) {
      Toast.show('Check Internet Connection!', Toast.LONG);
      return dispatch({
        type: FETCH_BANK_SUCCESS,
        bankData: {
          account_name: '',
          account_number: '',
          bank_country: '',
          bank_name: '',
          account_type: '',
        },
      });
    }
  };
};
