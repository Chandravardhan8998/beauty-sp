import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';

const SocialIcons = ({image, onPress}) => {
  return (
    <View style={styles.view}>
      <TouchableNativeFeedback
        style={{
          height: RFV(45),
          width: RFV(45),
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Colors.carrot_2,
          borderWidth: RFV(2),
          borderRadius: RFV(50),
          overflow: 'hidden',
          padding: RFV(5),
        }}
        onPress={onPress}>
        <Image
          source={image}
          style={{
            height: RFV(24),
            width: RFV(24),
          }}
        />
      </TouchableNativeFeedback>
    </View>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  view: {
    height: RFV(45),
    width: RFV(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.carrot_2,
    borderWidth: RFV(2),
    borderRadius: RFV(50),
    overflow: 'hidden',
  },
  label: {color: Colors.carrot_light, fontSize: RFV(24)},
});
