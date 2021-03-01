import React, {useEffect} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import {logout} from '../../../Store/Action/Auth';
const FailedApproval = (props) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.cardBg,
        alignItems: 'center',
      }}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#00000010"
      />
      <View
        style={{
          backgroundColor: '#fff',
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('screen').width - RFV(30),
        }}>
        <View>
          <Text
            style={{
              fontSize: RFV(20),
              color: Colors.orange,
              textAlign: 'center',
            }}>
            Your Account Verification is Rejected By Admin.{`\n`} Please Contact
            Admin.
          </Text>
        </View>
      </View>
      <TouchableNativeFeedback
        style={{
          backgroundColor: '#f00',
        }}
        onPress={() => {
          console.log('logout');
          dispatch(logout());
        }}>
        <View
          style={{
            backgroundColor: Colors.orange,
            width: RFV(210),
            height: RFV(40),
            margin: RFV(5),
            marginTop: RFV(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: RFV(16)}}>Go Back</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default FailedApproval;

const styles = StyleSheet.create({});
