import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {FlingGestureHandler} from 'react-native-gesture-handler';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';
const PlanCard = ({item, navigation}) => {
  const {
    name,
    service_provider_type,
    beauty_providers,
    fee_per_booking,
    contract,
    monthly_membership,
    add_stylist,
  } = item;
  return (
    <View style={styles.card}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginVertical: RFV(10),
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: RFV(20),
            color: '#fff',
            fontWeight: 'bold',
          }}>
          For {service_provider_type} Service Provider
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: RFV(26),
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width / 1.3,
          marginVertical: RFV(20),
          justifyContent: 'space-around',
          alignItems: 'stretch',
        }}>
        <View style={styles.text_row}>
          <Text style={styles.topics}>Beauty Providers Included : </Text>
          <Text style={styles.value}>{beauty_providers}</Text>
        </View>
        <View style={styles.text_row}>
          <Text style={styles.topics}>Fee Per Booking:</Text>
          <Text style={styles.value}>{fee_per_booking}%</Text>
        </View>
        <View style={styles.text_row}>
          <Text style={styles.topics}>Contract :</Text>
          <Text style={styles.value}>
            {!!contract ? `${contract} Year` : 'No Contract'}
          </Text>
        </View>
        <View style={styles.text_row}>
          <Text style={styles.topics}>Monthly Membership :</Text>

          <Text style={styles.value}>${monthly_membership}</Text>
        </View>

        <View style={styles.text_row}>
          <Text style={styles.topics}>Add Stylist For :</Text>

          <Text style={styles.value}>
            {!!add_stylist ? `$${add_stylist}` : 'N/A'}
          </Text>
        </View>
      </View>
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate('Signup', {plan_id: item.plan_id});
          }}>
          <View
            style={{
              backgroundColor: Colors.orange,
              width: RFV(150),
              height: RFV(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                textAlignVertical: 'center',
                fontWeight: 'bold',
                fontSize: RFV(20),
              }}>
              Select
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('screen').width - RFV(40),
    backgroundColor: Colors.pink,
    padding: RFV(15),
    margin: RFV(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFV(10),
  },
  text_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    marginVertical: RFV(2),
  },
  topics: {
    display: 'flex',
    flex: 2,
    fontWeight: 'bold',
    fontSize: RFV(17),
    color: Colors.carrot_input_bg,
  },
  value: {
    flex: 1,
    fontSize: RFV(16),
    color: '#fff',
    display: 'flex',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
