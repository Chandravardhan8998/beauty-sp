import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {API} from '../../../Backend/Backend';
import {RFV} from '../../../Constants/utility';

const BuyMemberShipCard = ({item, token, callbackOnPurchase, userId}) => {
  const [BuyingPlan, setBuyingPlan] = useState(false);

  const buyPlan = async (data) => {
    setBuyingPlan(true);
    try {
      const purchaseRes = await fetch(`${API}/user-purchase-plans`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const purchaseResJSON = await purchaseRes.json();
      const {msg} = purchaseResJSON;
      if (purchaseRes.status !== 200 || purchaseResJSON.status === 'error') {
        SimpleToast.show(msg || 'Try Again!!!', 2000);
        setBuyingPlan(false);
        return;
      }
      SimpleToast.show(msg, 2000);
      // callbackOnPurchase(item);
      setBuyingPlan(false);
    } catch (error) {
      SimpleToast.show('Try Again!!', 2000);
      setBuyingPlan(false);
      return;
    }
  };
  return (
    <View
      style={{
        ...styles.bgCard,
        marginTop: 10,
        flex: 1,
        paddingVertical: RFV(16),
      }}>
      <View
        style={{
          // backgroundColor: Colors.pink,
          flex: 1,
          elevation: 2,
          backgroundColor: '#fff',
          borderRadius: 7,
          padding: 20,
          margin: 10,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderColor: '#B8B8B8',
            padding: 20,
          }}>
          <Text style={{fontSize: 17, fontWeight: 'bold', margin: 5}}>
            {item.name}
          </Text>
          <Text style={{textAlign: 'center'}}>{item.price}</Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 20,
          }}>
          <Text style={{textAlign: 'left'}}>Name: {item.name}</Text>
          <Text style={{textAlign: 'left'}}>
            Fee Per Booking: {item.fee_per_booking}
          </Text>
          <Text style={{textAlign: 'left'}}>Time: {item.contract_time}</Text>
          <Text style={{textAlign: 'left'}}>
            Period: {item.contract_period}
          </Text>
          <Text style={{textAlign: 'left'}}>
            Monthly Fee: {item.monthly_membership}
          </Text>
          <Text style={{textAlign: 'left'}}>
            Fee Per Stylist: {item.per_stylist}
          </Text>
          <Text style={{textAlign: 'left'}}>
            Active: {item.is_active === 1 ? 'Yes' : 'No'}
          </Text>
        </View>
        <TouchableNativeFeedback
          onPress={() =>
            buyPlan({
              user_id: userId,
              plan_id: item.id,
              transaction_id: 'txn123',
              amount: item.monthly_membership,
            })
          }>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              padding: 8,
              backgroundColor: '#d98f84',
            }}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>
              {BuyingPlan ? (
                <ActivityIndicator color="#fff" />
              ) : (
                'Buy this plan'
              )}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default BuyMemberShipCard;

const styles = StyleSheet.create({});
