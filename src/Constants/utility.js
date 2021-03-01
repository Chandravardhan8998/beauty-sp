import {Dimensions} from 'react-native';
const {RFValue: RFValue} = require('react-native-responsive-fontsize');
export const RFV = (e) => {
  return RFValue(e, Dimensions.get('screen').height);
};
export const shortStr = (str, lim, rep) => {
  if (str.length > lim) {
    return str.replace(str.substring(lim, str.length), rep);
  } else {
    return str;
  }
};
