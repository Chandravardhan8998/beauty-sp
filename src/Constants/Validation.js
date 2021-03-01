import isEmail from 'sane-email-validation';
import is_number from 'isnumber-js';
export const isInValidEmail = ({value}) => {
  if (!value) {
    return 'This field is required.';
  } else if (!isEmail(value)) {
    return `Please enter valid email address.`;
  }
  return '';
};
export const isInValidValue = ({value, minLength = 1, maxLength = 1000}) => {
  if (!value) {
    return 'This field is required.';
  } else if (value.length < minLength) {
    return `This field have to min ${minLength} character length.`;
  } else if (value.length > maxLength) {
    return `This field have to max ${maxLength} character length.`;
  }
  return '';
};
export const isInValidPhone = ({value, minLength = 10, maxLength = 10}) => {
  //NOTE CHECK REGEX for PHONE
  if (!value) {
    return 'This field is required.';
  } else if (!is_number(+value)) {
    return `Please enter valid phone number.`;
  } else if (value.length < minLength) {
    return `This field have to min ${minLength} digit length.`;
  } else if (value.length > maxLength) {
    return `This field have to max ${maxLength} digit length.`;
  }
  return '';
};

export const isInValidEmailInEdit = (value) => {
  if (!value) {
    return 'This field is required.';
  } else if (!isEmail(value)) {
    return `Please enter valid email address.`;
  }
  return '';
};
export const isInValidValueInEdit = (
  value,
  minLength = 1,
  maxLength = 1000,
) => {
  if (!value) {
    return 'This field is required.';
  } else if (value.length < minLength) {
    return `This field have to min ${minLength} character length.`;
  } else if (value.length > maxLength) {
    return `This field have to max ${maxLength} character length.`;
  }
  return '';
};
export const isInValidPhoneInEdit = (value, minLength = 10, maxLength = 10) => {
  //NOTE CHECK REGEX for PHONE
  if (!value) {
    return 'This field is required.';
  } else if (!is_number(+value)) {
    return `Please enter valid phone number.`;
  } else if (value.length < minLength) {
    return `This field have to min ${minLength} digit length.`;
  } else if (value.length > maxLength) {
    return `This field have to max ${maxLength} digit length.`;
  }
  return '';
};
