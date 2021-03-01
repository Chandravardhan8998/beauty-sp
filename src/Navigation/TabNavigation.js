import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFV} from '../Constants/utility';
import {TouchableOpacity, Animated, Image} from 'react-native';
const FloatNavButton = ({navigation}) => {
  const buttonSize = new Animated.Value(1);
  const handlePress = () => {
    console.log('t');
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 300);
  };
  const sizeStyle = {scale: buttonSize};

  return (
    <Animated.View
      style={{
        zIndex: 9,
        width: RFV(60),
        height: RFV(60),
        backgroundColor: '#FF7F50',
        borderRadius: 50,
        borderWidth: RFV(5),
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateY: RFV(-15)}, sizeStyle],
      }}>
      <TouchableOpacity
        style={{
          height: RFV(60),
          width: RFV(60),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handlePress}>
        <Animated.View>
          <Animated.Image
            source={require('../../Assets/Images/TabBar/location-footer(72).png')}
            style={{
              width: RFV(30),
              height: RFV(30),
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};
const {Navigator, Screen} = createBottomTabNavigator();
export const MainTabNavigation = () => {
  return (
    <Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#161616',
          height: RFV(55),
        },
        adaptive: true,
        safeAreaInsets: true,
        showLabel: false,
      }}>
      <Screen
        name="Explore"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../Assets/Images/TabBar/leaf(128).png')}
              style={{
                width: RFV(focused ? 30 : 25),
                height: RFV(focused ? 30 : 25),
              }}
            />
          ),
        }}
        getComponent={() => require('./StackNavigation').HomeStack}
      />
      <Screen
        name="Search"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../Assets/Images/TabBar/search(72).png')}
              style={{
                width: RFV(focused ? 30 : 25),
                height: RFV(focused ? 30 : 25),
              }}
            />
          ),
        }}
        getComponent={() => require('./StackNavigation').HomeStack}
      />
      <Screen
        name="Home"
        options={({navigation}) => ({
          tabBarButton: () => <FloatNavButton navigation={navigation} />,
        })}
        getComponent={() => require('./StackNavigation').HomeStack}
      />
      <Screen
        name="Appointments"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../Assets/Images/TabBar/calendra(96).png')}
              style={{
                width: RFV(focused ? 30 : 25),
                height: RFV(focused ? 30 : 25),
              }}
            />
          ),
        }}
        getComponent={() => require('./StackNavigation').HomeStack}
      />
      <Screen
        name="Cart"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../Assets/Images/TabBar/carts(72).png')}
              style={{
                width: RFV(focused ? 30 : 25),
                height: RFV(focused ? 30 : 25),
              }}
            />
          ),
        }}
        getComponent={() => require('./StackNavigation').HomeStack}
      />
    </Navigator>
  );
};
