import {
  FETCH_BANK_START,
  FETCH_BANK_SUCCESS,
  LOGOUT,
  UPDATE_BANK_FAIL,
  UPDATE_BANK_START,
  UPDATE_BANK_SUCCESS,
} from '../Action';

const initialState = {
  bankData: {
    account_name: '',
    account_number: '',
    bank_country: '',
    bank_name: '',
    account_type: '',
  },
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BANK_START:
      return {...state, loading: true};
    case UPDATE_BANK_SUCCESS:
      return {...state, bankData: action.bankData, loading: false};
    case UPDATE_BANK_FAIL:
      return {...state, loading: false};
    case FETCH_BANK_SUCCESS:
      return {
        ...state,
        bankData: action.bankData,
        loading: false,
      };
    case FETCH_BANK_START:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT:
      return {
        bankData: {},
        loading: false,
      };
    default:
      return state;
  }
};
