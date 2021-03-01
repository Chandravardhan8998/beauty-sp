import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import {useSelector} from 'react-redux';
import {API} from '../../../Backend/Backend';
import BuyMemberShipCard from './BuyMemberShipCard';
const MembershipPlans = (props) => {
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState('');
  const {token, userData} = useSelector((state) => state.auth);
  const [AllPlans, setAllPlans] = useState([]);
  const [MyPlan, setMyPlan] = useState({});
  const [Token, setToken] = useState('');
  useEffect(() => {
    setToken(token);
  }, [token]);
  const fetchPlans = async (token = token) => {
    setLoading(true);
    try {
      const plansRes = await fetch(`${API}/subscription-plans`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const plansResJSON = await plansRes.json();
      const {data, msg, UserSubscriptionPlan} = plansResJSON;
      if (plansRes.status !== 200) {
        Toast.show('Try Again', 2000);
        setLoading(false);
        return;
      }
      if (plansResJSON.status === 'error') {
        console.log(msg);
        setLoading(false);
        return;
      }
      setMyPlan(UserSubscriptionPlan);
      setAllPlans(data);
      setLoading(false);
      return;
    } catch (error) {
      setError('Try Again!!');
      Toast.show('Check Internet Connection!!', 2000);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchPlans(token);
  }, []);
  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.cardBg,
        }}>
        <StatusBar
          backgroundColor={Colors.pink}
          barStyle="light-content"
          // translucent={true}
        />
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: Dimensions.get('screen').width,
            height: RFV(275),
          }}
          source={require('../../../../Assets/Images/Home/banner.png')}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      </View>
    );
  }
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
            fontSize: RFV(22),
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
          backgroundColor={Colors.pink}
          barStyle="light-content"
          // translucent={true}
        />
        <View
          style={{
            flex: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: Dimensions.get('screen').width,
              height: RFV(275),
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
              Membership Plans
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              borderRadius: 7,
              padding: 20,
              margin: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: '#B8B8B8',
                padding: 20,
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold', margin: 5}}>
                Choose a Plan
              </Text>
            </View>

            <View style={{justifyContent: 'center', padding: 20}}>
              <Text style={{lineHeight: 25}}>True transformation Organic</Text>
              <Text style={{lineHeight: 25}}>Deep Tissue Massage</Text>
              <Text style={{lineHeight: 25}}>Trigger Point Massage</Text>
              <Text style={{lineHeight: 25}}>Aeromatherapy Foot Ritual</Text>
              <Text style={{lineHeight: 25}}>Holistic Wellness Massage</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              borderRadius: 7,
              padding: 20,
              margin: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: '#B8B8B8',
                padding: 20,
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold', margin: 5}}>
                Active Plan
              </Text>
            </View>
            {!!MyPlan ? (
              <View style={{justifyContent: 'center', padding: 20}}>
                <Text style={{lineHeight: 25}}>{MyPlan.plan_name}</Text>
                <Text style={{lineHeight: 25}}>{MyPlan.amount}</Text>
                <Text style={{lineHeight: 25}}>{MyPlan.expired_on}</Text>
                <Text style={{lineHeight: 25}}>{MyPlan.plan_id}</Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: RFV(5),
                }}>
                <Text>No Active Plans</Text>
              </View>
            )}
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width - RFV(30),
            }}>
            <Heading title="Plans" />
          </View>
          <FlatList
            data={AllPlans}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({item}) => (
              <BuyMemberShipCard
                // callbackOnPurchase={
                //   (data) => setMyPlan(data)
                //   // props.navigation.navigate('membershipPlans')
                // }
                item={item}
                token={token}
                userId={userData.id}
              />
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MembershipPlans;

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
