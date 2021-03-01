import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ServiceCard from '../../../Components/Home/ServiceCard';
import SearchHeader from '../../../Components/Home/SearchHeader';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
const Heading = ({title, showArrow = true}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: RFV(15),
      }}>
      <Text
        style={{
          fontSize: RFV(26),
          color: '#666',
        }}>
        {title}
      </Text>
      {showArrow && (
        <Image
          style={{
            height: 30,
            width: 40,
          }}
          source={require('../../../../Assets/Images/Home/right-angle(72).png')}
        />
      )}
    </View>
  );
};
const Home = ({navigation}) => {
  const services = [
    {
      title: 'Couples Retreat Massage',
      name: 'Rita Parker',
      price: '599',
      persons: 1,
      time: 'All Days',
      image: require('../../../../Assets/Images/Home/couples-retreart-massages.png'),
    },
    {
      title: '30 Min Relaxation',
      name: 'Rita Parker',
      price: '589',
      persons: 1,
      time: 'All Days',
      image: require('../../../../Assets/Images/Home/30-min-relaxation.png'),
    },
    {
      title: 'Couples Retreat Massage',
      name: 'Rita Parker',
      price: '569',
      persons: 1,
      time: 'All Days',
      image: require('../../../../Assets/Images/Home/couples-retreart-massages.png'),
    },
  ];
  const headerScrollImages = [
    require('../../../../Assets/Images/Home/banner_2.jpg'),
    require('../../../../Assets/Images/Home/banner_2.jpg'),
    require('../../../../Assets/Images/Home/banner_2.jpg'),
  ];
  const imagesRollForBookingNow = [
    require('../../../../Assets/Images/Home/book-now.png'),
    require('../../../../Assets/Images/Home/book-now.png'),
    require('../../../../Assets/Images/Home/book-now.png'),
    require('../../../../Assets/Images/Home/book-now.png'),
  ];
  const topProviders = [
    {
      image: require('../../../../Assets/Images/Home/experts1.png'),
      name: 'Stacy',
    },
    {
      image: require('../../../../Assets/Images/Home/experts2.png'),
      name: 'Ashley',
    },
    {
      image: require('../../../../Assets/Images/Home/experts3.png'),
      name: 'Tarsha',
    },
    {
      image: require('../../../../Assets/Images/Home/experts4.png'),
      name: 'Debbie',
    },
    {
      image: require('../../../../Assets/Images/Home/experts4.png'),
      name: 'Lara',
    },
  ];
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={'transparent'}
          // backgroundColor={Colors.orange + '80'}
          barStyle="light-content"
          translucent={true}
        />
        {/* 1 */}
        <View
          style={{
            backgroundColor: Colors.cardBg,
            // backgroundColor: '#f00',
            flex: 1,
            position: 'relative',

            zIndex: 1000,
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width,
              height: RFV(55),
              position: 'absolute',
              top: 30,
              left: 0,
              right: 0,
              zIndex: 1001,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Profile')}>
              <View style={styles.headerButton}>
                <Image
                  style={styles.headerButtonImage}
                  source={require('../../../../Assets/Images/Header/menu-96.png')}
                />
              </View>
            </TouchableNativeFeedback>
            <View style={styles.headerSetLocation}>
              <View>
                <Image
                  style={{
                    display: 'flex',
                    height: RFV(20),
                    width: RFV(20),
                    flex: 1,
                  }}
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={require('../../../../Assets/Images/Header/location-3x.png')}
                />
              </View>
              <View>
                <TouchableNativeFeedback
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('screen').width / 2.3 - 115,
                  }}>
                  <Text
                    style={{
                      display: 'flex',
                      flex: 1,
                      color: '#ddd',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>
                    Set Location
                  </Text>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={styles.headerButton}>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('Profile')}>
                <Image
                  style={styles.headerButtonImage}
                  source={require('../../../../Assets/Images/Header/user-3x.png')}
                />
              </TouchableNativeFeedback>
            </View>
          </View>
          <SliderBox
            images={headerScrollImages}
            sliderBoxHeight={370}
            autoplay={true}
            circleLoop={true}
            ImageComponentStyle={{
              height: 375,
              width: Dimensions.get('screen').width,
            }}
            dotStyle={{
              width: 12,
              height: 12,
              borderRadius: 15,
              marginHorizontal: -5,
            }}
            dotColor="#999"
            resizeMethod="resize"
            resizeMode="stretch"
            inactiveDotColor="#99999980"
            imageLoadingColor="#00000000"
            paginationBoxVerticalPadding={20}
          />
          <SearchHeader />
        </View>
        {/* 2 */}
        <View
          style={[
            {
              height: RFV(400),
              backgroundColor: Colors.cardBg,
              // backgroundColor: '#f0f',
            },
          ]}>
          <ImageBackground
            resizeMethod="resize"
            resizeMode="contain"
            source={require('../../../../Assets/Images/Home/homescreen-bg.png')}
            height={400}
            width={Dimensions.get('screen').width}
            style={{
              ...styles.contentContainer,
              width: Dimensions.get('screen').width,
              height: 400,
              position: 'relative',
              top: -25,
              paddingTop: RFV(30),
              zIndex: 1010,
            }}>
            <Heading title={'Direct Services'} />
            <FlatList
              data={services}
              horizontal={true}
              keyExtractor={(_, i) => `${i}`}
              renderItem={({item}) => (
                <ServiceCard
                  onPress={() => {
                    console.log('clicked on card');
                  }}
                  item={item}
                />
              )}
            />
          </ImageBackground>
        </View>
        <View
          style={[
            styles.contentContainer,
            {
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: RFV(10),
            },
          ]}>
          <FlatList
            style={{
              // backgroundColor: '#f90',
              width: Dimensions.get('screen').width - RFV(30),
              // height: RFV(200),
            }}
            horizontal={true}
            data={imagesRollForBookingNow}
            keyExtractor={(_, i) => `${i}`}
            renderItem={({item}) => {
              return (
                <View
                  style={{margin: RFV(5), marginLeft: 0, marginRight: RFV(10)}}>
                  <TouchableNativeFeedback
                    style={{
                      width: RFV(400),
                      height: RFV(188),
                    }}>
                    <Image
                      source={item}
                      style={{
                        flex: 1,
                        width: RFV(400),
                        height: RFV(188),
                      }}
                      resizeMethod="resize"
                      resizeMode="contain"
                    />
                  </TouchableNativeFeedback>
                </View>
              );
            }}
          />
        </View>
        {/* 3 */}
        <View style={[styles.contentContainer]}>
          <Heading title="Posted Services" />
          <FlatList
            data={services}
            style={{}}
            horizontal={true}
            keyExtractor={(_, i) => `${i}`}
            renderItem={({item}) => (
              <ServiceCard
                ShowName={false}
                onPress={() => {
                  console.log('clicked on card');
                }}
                item={item}
              />
            )}
          />
        </View>
        {/* 4 */}
        <View style={[styles.contentContainer]}>
          <Heading title="Top Experts" showArrow={true} />
          <FlatList
            style={{
              height: RFV(100),
              flex: 1,
              marginVertical: RFV(10),
            }}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={topProviders}
            keyExtractor={(_, i) => `${i}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('object');
                }}>
                <View
                  style={{
                    marginVertical: RFV(5),
                    marginLeft: 0,
                    marginRight: RFV(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={item.image}
                    style={{
                      width: RFV(80),
                      height: RFV(80),
                    }}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: RFV(15),
    paddingBottom: RFV(20),
    backgroundColor: Colors.cardBg,
  },
  headerButton: {
    width: RFV(50),
    height: RFV(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFV(50),
    marginHorizontal: RFV(5),
  },
  headerButtonImage: {
    height: RFV(30),
    width: RFV(30),
    margin: 10,
  },
  headerSetLocation: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    backgroundColor: '#00000060',
    width: Dimensions.get('screen').width / 2.2,
  },
});
