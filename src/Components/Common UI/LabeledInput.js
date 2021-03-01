import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';

const LabeledInput = ({
  error,
  label,
  onChangeText,
  value,
  placeholder,
  labelColor = Colors.white,
  inputLabelContainerStyle = {},
  inputStyling = {},
  ...props
}) => {
  return (
    <View style={[styles.view]}>
      <Text
        style={{
          ...styles.label,
          color: labelColor,
          ...inputLabelContainerStyle,
        }}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={`${Colors.white}90`}
        {...props}
        value={value}
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...inputStyling,
          borderRadius: 0,
          borderWidth: 1,
          borderColor: !!error ? '#ff8585' : '#00000000',
        }}
        onChangeText={onChangeText}
      />
      <Text style={styles.error}> {error}</Text>
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexGrow: 1,
    marginVertical: RFV(5),
  },
  input: {
    height: RFV(50),
    marginHorizontal: RFV(10),
    backgroundColor: Colors.carrot_input_bg,
    color: Colors.white,
    paddingLeft: 8,
    fontSize: RFV(14),
  },
  error: {
    margin: 0,
    fontSize: RFV(10),
    color: '#ff8585',
    height: RFV(20),
    paddingVertical: RFV(1),
    marginHorizontal: RFV(10),
  },
  label: {
    height: RFV(20),
    marginHorizontal: RFV(10),
    // paddingLeft: RFV(10),
    fontSize: RFV(12),
    paddingBottom: RFV(6),
    textAlignVertical: 'top',
  },
});
