import React, {useState} from 'react';
import {Dimensions, Image, Text, TextInput, View} from 'react-native';
import {RFV} from '../../Constants/utility';

const SearchHeader = () => {
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        // backgroundColor: '#000',
        top: 0,
        left: 0,
        zIndex: 1000,
        height: 250,
        width: Dimensions.get('screen').width,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: RFV(15),
      }}>
      <Text
        style={{
          fontSize: RFV(30),
          color: '#fff',
          textTransform: 'capitalize',
          padding: 14,
          textAlign: 'center',
        }}>
        {`Search for\nservices to bid`}
      </Text>
      <View
        style={{
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
          backgroundColor: '#ffffff20',
          //   backgroundColor: '#000',
          width: Dimensions.get('screen').width - 50,
        }}>
        <View>
          <Image
            style={{
              display: 'flex',
              height: RFV(30),
              width: RFV(30),
              flex: 1,
            }}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../../Assets/Images/Home/search(72).png')}
          />
        </View>
        <View>
          <TextInput
            style={{
              color: '#fff',
              fontSize: RFV(20),
              display: 'flex',
              width: Dimensions.get('screen').width - 115,
            }}
            placeholderTextColor="#fff"
            placeholder="Search for services"
            value={value}
            onChangeText={(t) => setValue(t)}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;
