import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PlanCard from '../../Components/Auth/PlanCard';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';

const Plans = (props) => {
  const PlansData = [
    {
      plan_id: 1,
      name: 'Zenner',
      service_provider_type: 'Individual',
      beauty_providers: 1,
      fee_per_booking: 20,
      contract: null,
      monthly_membership: 0,
      add_stylist: null,
    },
    {
      plan_id: 2,
      name: 'Zenner Club',
      service_provider_type: 'Individual',
      beauty_providers: 2,
      fee_per_booking: 15,
      contract: 1,
      monthly_membership: 19.99,
      add_stylist: 10,
    },
    {
      plan_id: 3,
      name: 'Zenner Club Gold',
      service_provider_type: 'Salon/Parlor/Spa',
      beauty_providers: 3,
      fee_per_booking: 10,
      contract: null,
      monthly_membership: 29.99,
      add_stylist: 10,
    },
    {
      plan_id: 4,
      name: 'Zenner Club Platinum',
      service_provider_type: 'Salon/Parlor/Spa',
      beauty_providers: 7,
      fee_per_booking: 5,
      contract: null,
      monthly_membership: 49.99,
      add_stylist: 5,
    },
  ];
  return (
    <ScrollView>
      <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.pink} translucent={false} />
        <View
          style={{
            height: RFV(200),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#f00',
          }}>
          <Text
            style={{
              display: 'flex',
              color: Colors.pink,
              fontSize: RFV(32),
              fontWeight: 'bold',
            }}>
            Select Plan
          </Text>
          <Text
            style={{
              display: 'flex',
              color: Colors.gray,
              fontSize: RFV(18),
              fontWeight: 'bold',
            }}>
            For Your Account
          </Text>
        </View>
        {PlansData.map((p) => {
          return (
            <PlanCard navigation={props.navigation} item={p} key={p.name} />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.cardBg,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
