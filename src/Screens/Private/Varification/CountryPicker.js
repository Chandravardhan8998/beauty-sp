import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import Countries from '../../../Constants/Countries.json';
import DropDownPicker from 'react-native-dropdown-picker';
const CountryPicker = ({
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
  const [Country, setCountry] = useState('');
  const [CountriesData, setCountriesData] = useState([]);
  useEffect(() => {
    setCountriesData(
      Countries.data.map((c) => ({
        label: c.country_name,
        value: c.country_name,
        id: c.id,
      })),
    );
    if (!!value) {
      if (typeof value === 'number') {
        if (value > 0) {
          const currentCountry = CountriesData.filter((c) => c.id === +value);
          setCountry(currentCountry[0].value);
        }
      } else if (typeof value === 'string') {
        const currentCountry = CountriesData.filter((c) => c.value === value);
        if (!!currentCountry.length) {
          setCountry(currentCountry[0].value);
        }
      }
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
        placeholder="Select Your Country"
        searchablePlaceholder="Search Your Country"
        searchable={true}
        items={CountriesData}
        defaultValue={Country}
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
        onChangeItem={(item, i) => {
          onChangeText(item, parseInt(i) + 1);
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

export default CountryPicker;

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
