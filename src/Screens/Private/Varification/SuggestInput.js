import React, {Fragment, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';

const SuggestInput = ({
  error,
  label,
  onChangeText,
  value,
  labelColor = Colors.white,
  inputLabelContainerStyle = {},
  inputStyling = {},
  placeholder = '',
  ...props
}) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [PickUpTown, setPickUpTown] = useState('');
  const [postalCodeZipState, setPostalCodeZipState] = useState('');
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        marginVertical: RFV(5),
        // marginBottom: RFV(),
      }}>
      <View>
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
      </View>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        keyboardAppearance={'light'}
        fetchDetails={true}
        debounce={200}
        autoCapitalize={'words'}
        selectionColor={'red'}
        clearButtonMode={'always'}
        styles={{
          description: {
            fontWeight: '300',
          },
          textInput: {
            ...styles.inputField,
            margin: 0,
            padding: 0,
            // backgroundColor: '#000',
            // width: '100%',
            borderRadius: 0,
            borderWidth: 1,
            borderColor: !!error ? '#ff8585' : '#00000000',
          },
          listView: {
            position: 'absolute',
            // top: RFV(50),
            bottom: RFV(50),
            left: RFV(10),
            right: RFV(10),
            backgroundColor: '#fff',
            borderRadius: 5,
            flex: 1,
            elevation: 3,
            zIndex: 2000,
            margin: 0,
            opacity: 1,
            height: 200,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        // isRowScrollable={true}
        disableScroll={true}
        onPress={(data, details = null) => {
          onChangeText(
            data.description,
            details.geometry.location,
            details.address_components[details.address_components.length - 1],
          );
        }}
        query={{
          key: 'AIzaSyBxaFtQLrbNNom9-x_WXhCga2q8WtluJjg',
          language: 'en',
          types: 'geocode',
          type: ['address'],
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: true,
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
          // marginTop: RFV(10),
          position: 'relative',
          top: RFV(23),
          // backgroundColor: '#f00',
        }}>
        {' '}
        {error}
      </Text>
    </View>
  );
};

export default SuggestInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#ffd9d4',
    color: '#444',
    marginBottom: RFV(4),
    height: RFV(50),
    marginHorizontal: RFV(10),
    paddingLeft: 8,
    fontSize: RFV(14),
  },
});
