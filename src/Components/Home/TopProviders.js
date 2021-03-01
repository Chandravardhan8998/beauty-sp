import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFV} from '../../Constants/utility';

const TopProviders = ({onPress, image}) => {
  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        zIndex: 1000,
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: '#000',
          // display: 'flex',
          // flex: 1,
          width: RFV(120),
          margin: RFV(2),
        }}>
        <Image
          style={{
            height: RFV(120),
            width: RFV(120),
            //   backgroundColor: '#000000',
            // margin: RFV(10),
          }}
          resizeMethod="resize"
          resizeMode="center"
          source={image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TopProviders;
