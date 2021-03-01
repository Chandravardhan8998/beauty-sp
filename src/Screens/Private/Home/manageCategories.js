import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';

const ManageCategories = (props) => {
  const [categories, setCategories] = useState([
    {
      name: 'Hydro Therapy',
      id: 1,
      image: require('../../../../Assets/Images/Home/massages(96).png'),
    },
    {
      name: 'Massages',
      id: 2,
      image: require('../../../../Assets/Images/Home/massages(96).png'),
    },
    {
      name: 'Salt & Aroma',
      id: 3,
      image: require('../../../../Assets/Images/Home/therapy.png'),
    },
    {
      name: 'Relaxation',
      id: 4,
      image: require('../../../../Assets/Images/Home/massages(96).png'),
    },
    {
      name: 'Salon & Beauty',
      id: 5,
      image: require('../../../../Assets/Images/Home/massages(96).png'),
    },
    {
      name: 'Thai',
      id: 6,
      image: require('../../../../Assets/Images/Home/therapy.png'),
    },
  ]);

  const userActionsCard = ({item}) => {
    return (
      <View
        style={{
          ...styles.bgCard,
          marginTop: 10,
          flex: 1,
          paddingVertical: RFV(16),
          // backgroundColor: '#000',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.cardBg,
            borderRadius: 7,
            padding: 20,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              width: RFV(70),
              height: RFV(70),
            }}
            source={item.image}
          />
          <Text style={{fontSize: 17, fontWeight: 'bold', margin: 5}}>
            {item.name}
          </Text>
          <Text style={{textAlign: 'center'}}>
            Try any water massage bed, and it will likely feel good.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        display: 'flex',
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.cardBg,
        }}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <View
          style={{
            flex: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              width: '100%',
              height: RFV(223),
            }}
            source={require('../../../../Assets/Images/Home/banner.png')}
          />
          {/* {userDetailsCard()} */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: Dimensions.get('screen').width - RFV(60),
            }}>
            <Text
              style={{
                fontSize: RFV(28),
              }}>
              Manage Categories
            </Text>
          </View>

          <FlatList
            data={categories}
            horizontal={false}
            renderItem={userActionsCard}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageCategories;

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
