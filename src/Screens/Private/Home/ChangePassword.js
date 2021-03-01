import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import ChangePasswordForm from './ChangePasswordForm';
import {logout} from '../../../Store/Action/Auth';
import {useDispatch, useSelector} from 'react-redux';
const UserActionList = ({image, text, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          // flex: 1,
          justifyContent: 'flex-start',
          // backgroundColor: '#ffa',
          paddingVertical: RFV(5),
          paddingHorizontal: RFV(20),
          marginVertical: RFV(5),
          height: RFV(45),
        }}>
        <StatusBar
          backgroundColor={Colors.pink}
          barStyle="light-content"
          translucent={true}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={image}
            style={{
              width: RFV(23),
              height: RFV(23),
            }}
            on
          />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: RFV(22),
              color: '#000',
            }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const userActionsCard = (navigation) => {
  const {loading} = useSelector((state) => state.auth);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        ...styles.bgCard,
        marginTop: 0,
        flex: 3,
        paddingVertical: RFV(16),
        // backgroundColor: '#000',
      }}>
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/password(72).png')}
        text="Change Password"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <ChangePasswordForm />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Edit Profile"
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Account Details"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/payment-methods(72).png')}
        text="Payment Methods"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/post-job-2x.png')}
        text="Post a Job"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/my-experts(96).png')}
        text="Appointments"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Bank Details"
        onPress={() => {
          navigation.navigate('bankDetails');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Manage Categories"
        onPress={() => {
          navigation.navigate('manageCategories');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Membership Plans"
        onPress={() => {
          navigation.navigate('membershipPlans');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Staff Details"
        onPress={() => {
          navigation.navigate('staffDetails');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text={Loading ? <ActivityIndicator color="#000" /> : 'Log Out'}
        onPress={() => {
          Alert.alert('Are You Sure?', 'Want To logout?', [
            {
              text: 'Logout!',
              onPress: () => {
                dispatch(logout());
              },
              style: {color: '#555'},
            },
            {
              style: 'destructive',
              text: 'No',
            },
          ]);
        }}
      />
    </View>
  );
};
const ChangePassword = (props) => {
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
            resizeMode="contain"
            style={{
              margin: 0,
              padding: 0,
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
              height: RFV(80),
            }}>
            <Text
              style={{
                fontSize: RFV(28),
              }}>
              Change Password
            </Text>
          </View>
          {userActionsCard(props.navigation)}
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
