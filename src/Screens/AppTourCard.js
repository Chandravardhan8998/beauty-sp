import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFV} from '../Constants/utility';

// StatusBar.setHidden(true, 'fade');
const AppTourCard = ({source, description, title, icon}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      resizeMethod="resize"
      source={source}
      height={Dimensions.get('screen').height}
      width={Dimensions.get('screen').width}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <StatusBar hidden={true} />
      <Image
        style={styles.logo}
        source={require('../../Assets/Images/AppTour/logo.png')}
        height={RFV(100)}
        width={RFV(100)}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <Image
        style={styles.icon}
        source={icon}
        height={RFV(60)}
        width={RFV(60)}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <View style={styles.title}>
        <Text
          style={{
            fontSize: RFV(30),
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: RFV(20),
            textAlign: 'center',
            color: '#fff',
          }}>
          {description}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default AppTourCard;

const styles = StyleSheet.create({
  logo: {marginTop: RFV(50), justifyContent: 'center'},
  icon: {
    marginTop: RFV(80),
    justifyContent: 'center',
  },
  title: {
    marginTop: RFV(40),
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 50,
    marginBottom: RFV(10),
  },
});
