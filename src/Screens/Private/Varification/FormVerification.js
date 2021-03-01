export const isInValidValue = ({
  value,
  minLength,
  maxLength,
  required = true,
}) => {
  if (required) {
    if (!value) {
      return 'This field is required.';
    } else if (value.length < minLength) {
      return `This field have to min ${minLength} character length.`;
    } else if (value.length > maxLength) {
      return `This field have to max ${maxLength} character length.`;
    }
    return '';
  } else {
    return '';
  }
};
