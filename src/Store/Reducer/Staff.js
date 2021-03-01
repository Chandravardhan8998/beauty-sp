import {
  ADD_STAFF_FAIL,
  ADD_STAFF_START,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_START,
  DELETE_STAFF_SUCCESS,
  EDIT_STAFF_FAIL,
  EDIT_STAFF_START,
  EDIT_STAFF_SUCCESS,
  FETCH_STAFF_FAIL,
  FETCH_STAFF_START,
  FETCH_STAFF_SUCCESS,
  LOGOUT,
} from '../Action';

const initialState = {
  staff: [],
  loading: false,
  deletingStaff: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        staff: [],
        loading: false,
        deletingStaff: false,
      };
    case ADD_STAFF_START:
      return {...state, loading: true};
    case ADD_STAFF_SUCCESS:
      let currentStaff = state.staff;
      currentStaff.unshift(action.staffData);
      return {...state, staff: currentStaff, loading: false};
    case ADD_STAFF_FAIL:
      return {...state, loading: false};

    case DELETE_STAFF_START:
      return {...state, deletingStaff: true};
    case DELETE_STAFF_SUCCESS:
      let currentStaff_DELETE = state.staff.filter(
        (s) => s.id !== action.deletedStaffID,
      );
      return {...state, staff: currentStaff_DELETE, deletingStaff: false};
    case DELETE_STAFF_FAIL:
      return {...state, deletingStaff: false};

    case FETCH_STAFF_START:
      return {...state, loading: true};
    case FETCH_STAFF_SUCCESS:
      return {...state, staff: action.staffData, loading: false};
    case FETCH_STAFF_FAIL:
      return {...state, loading: false};
    case EDIT_STAFF_START:
      return {
        ...state,
        loading: true,
      };
    case EDIT_STAFF_FAIL:
      return {
        ...state,
        loading: false,
      };
    case EDIT_STAFF_SUCCESS:
      let currentStaff_EDIT = state.staff;
      currentStaff_EDIT = currentStaff_EDIT.map((s) => {
        if (s.id === action.staffData.id) {
          return action.staffData;
        } else {
          return s;
        }
      });
      return {
        ...state,
        loading: false,
        staff: currentStaff_EDIT,
      };
    default:
      return state;
  }
};
