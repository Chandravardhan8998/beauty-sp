import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';

const ServiceCard = ({item, onPress, ShowName = true}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMethod="resize"
          resizeMode="contain"
          source={item.image}
        />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={{
                ...styles.row,
                paddingTop: RFV(10),
              }}>
              <Image
                source={require('../.././../Assets/Images/Home/clock(48).png')}
                style={styles.imageIcon}
                resizeMethod="resize"
                resizeMode="contain"
              />
              <Text style={styles.time}>
                {`${item.persons} ${
                  item.persons > 1 ? 'Persons' : 'Person'
                } / ${item.time} `}
              </Text>
            </View>
          </View>

          {ShowName ? (
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <Image
                  source={require('../.././../Assets/Images/UserProfile/my-profile.png')}
                  style={styles.imageIcon}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          ) : (
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Text style={styles.price}>${item.price} Avg Bid</Text>
              <View
                style={{
                  backgroundColor: Colors.orange,
                  height: RFV(28),
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableNativeFeedback>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    BID NOW
                  </Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    margin: RFV(10),
    marginLeft: 0,
    marginRight: RFV(20),
    height: RFV(139 * 2),
  },
  image: {
    width: RFV(251),
    height: RFV(139),
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: RFV(12),
    paddingBottom: RFV(5),
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  title: {
    fontSize: RFV(18),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageIcon: {
    height: RFV(20),
    width: RFV(20),
  },
  price: {
    fontSize: RFV(22),
    color: '#555',
  },
  time: {
    fontSize: RFV(16),
    marginLeft: RFV(10),
    color: '#555',
  },
  name: {
    fontSize: RFV(18),
    color: '#555',
    marginLeft: RFV(5),
  },
});
