import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {RFV} from '../Constants/utility';
import AppTourCard from './AppTourCard';
import MIcon from 'react-native-vector-icons/MaterialIcons';
const AppTour = ({onFinish}) => {
  const tourData = [
    {
      key: '1',
      image: require('../../Assets/Images/AppTour/intro-1.jpg'),
      icon: require('../../Assets/Images/AppTour/location.png'),
      title: 'Be Your Own Boss.',
      backgroundColor: '#22bcb5',
      description: 'No Rental Or High Commission Fees.',
    },
    {
      backgroundColor: '#22bcb5',
      key: '2',
      image: require('../../Assets/Images/AppTour/intro-2.jpg'),
      icon: require('../../Assets/Images/AppTour/icon-2.png'),
      title: 'Flexible Schedule.',
      description: 'Work as much or \nas little as you like',
    },
    {
      backgroundColor: '#22bcb5',
      key: '3',
      image: require('../../Assets/Images/AppTour/intro-3.jpg'),
      icon: require('../../Assets/Images/AppTour/expert.png'),
      title: 'Zen Me in does the work for you.',
      description: `We connect you to thousands of clients.`,
    },
  ];
  const nextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MIcon name="navigate-next" size={RFV(24)} color="#fff" />
      </View>
    );
  };
  const doneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MIcon name="done" size={RFV(24)} color="#fff" />
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={tourData}
      keyExtractor={({key}) => `${key}`}
      renderItem={({item}) => (
        <AppTourCard
          description={item.description}
          source={item.image}
          icon={item.icon}
          title={item.title}
        />
      )}
      dotStyle={{backgroundColor: '#a25e37' + '50'}}
      // dotStyle={{color:  '#a25e37'}}
      activeDotStyle={{backgroundColor: '#a25e37'}}
      onDone={onFinish}
      renderDoneButton={doneButton}
      renderNextButton={nextButton}
    />
  );
};

export default AppTour;

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#a25e3790',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
