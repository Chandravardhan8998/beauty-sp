import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import DropDownPicker from 'react-native-dropdown-picker';
import Services from '../../../Constants/Services.json';
const SelectService = ({
  error,
  label,
  onChangeText,
  value,
  onBlur,
  placeholder,
  labelColor = Colors.white,
  inputLabelContainerStyle = {},
  inputStyling = {},
  ...props
}) => {
  const [Service, setService] = useState('');
  const [ServicesData, setServicesData] = useState([]);
  useEffect(() => {
    setServicesData(
      Services.data.map((s) => ({
        label: s.code,
        value: s.code,
        id: s.id,
      })),
    );
  }, [Services]);
  useEffect(() => {
    if (!!value) {
      // const [{code, id}] = Services.data.filter((c) => c.id === +value);
      // setService(code);
      // console.log('UseEff', code, id);
      const selectedValue = ServicesData.filter((s) => s.id === +value);
      console.log('UE true', value);
      setService(selectedValue[0].value);
    }
  }, [value]);
  return (
    <View
      style={[
        {
          flex: 1,
          flexGrow: 1,
          marginVertical: RFV(5),
        },
      ]}>
      <Text
        style={{
          height: RFV(20),
          marginLeft: RFV(10),
          fontSize: RFV(12),
          color: labelColor,
          paddingBottom: RFV(6),
          textAlignVertical: 'top',
          ...inputLabelContainerStyle,
        }}>
        {label}
      </Text>
      <DropDownPicker
        placeholder="Select Service"
        items={ServicesData}
        defaultValue={Service}
        containerStyle={{height: 40}}
        style={[
          styles.input,
          {
            borderRadius: 0,
            borderWidth: 1,
            borderColor: !!error ? '#ff8585' : '#00000000',
          },
        ]}
        itemStyle={{
          justifyContent: 'flex-start',
          // borderRadius: 0,
          backgroundColor: Colors.cardBg,
          padding: RFV(8),
          color: Colors.gray,
        }}
        dropDownMaxHeight={RFV(250)}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          width: Dimensions.get('screen').width - RFV(70),
          alignSelf: 'center',
        }}
        onChangeItem={(item) => {
          // console.log(item);
          // console.log(itemValue);
          onChangeText(item);
          setService(item.value);
        }}
      />
      <Text
        style={{
          margin: 0,
          marginLeft: RFV(10),
          fontSize: RFV(10),
          color: '#ff8585',
          height: RFV(20),
          paddingVertical: RFV(1),
        }}>
        {' '}
        {error}
      </Text>
    </View>
  );
};

export default SelectService;

const styles = StyleSheet.create({
  input: {
    height: RFV(50),
    marginHorizontal: RFV(10),
    backgroundColor: Colors.carrot_input_bg,
    color: Colors.white,
    paddingLeft: 8,
    fontSize: RFV(14),
  },
});
