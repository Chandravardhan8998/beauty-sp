import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import BankDetailsForm from './bankDetailsForm';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBankDetails} from '../../../Store/Action/Bank';

const BankDetails = (props) => {
  const [accountNumber, setAccountNumber] = useState('');

  const fetchAccountDetails = (accountNum) => {
    setAccountNumber(accountNum);
  };
  const dispatch = useDispatch();
  const {bankData, loading} = useSelector((state) => state.bank);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchBankDetails());
  }, []);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const {account_number} = bankData;
  useEffect(() => {
    if (!!bankData) {
      setAccountNumber(account_number);
    }
  }, [account_number]);
  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.cardBg,
        }}>
        <ActivityIndicator color={Colors.pink} size="large" />
      </View>
    );
  }
  const userActionsCard = () => {
    return (
      <View
        style={{
          ...styles.bgCard,
          marginTop: 0,
          flex: 3,
          paddingVertical: RFV(16),
          // backgroundColor: '#000',
        }}>
        <BankDetailsForm fetchAccountDetails={fetchAccountDetails} />
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
              Bank Details
            </Text>
            <View
              style={{
                height: RFV(180),
                width: '100%',
                marginTop: 20,
                paddingTop: RFV(20),
                paddingBottom: RFV(20),
                backgroundColor: '#0147FA',
                borderRadius: 15,
                aligItems: 'center',
                flexDirection: 'row',
                flex: 1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  borderRightWidth: 1,
                  padding: RFV(10),
                  borderColor: '#FFF',
                }}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{
                    width: RFV(60),
                    height: RFV(60),
                    marginBottom: RFV(15),
                  }}
                  source={require('../../../../Assets/Images/Home/city-hall.png')}
                />
                <View
                  style={{
                    borderRadius: 15,
                    paddingLeft: RFV(12),
                    paddingRight: RFV(12),
                    padding: RFV(5),
                    backgroundColor: '#FFF',
                  }}>
                  <Text style={{fontSize: 13}}>Primary</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 2,
                  borderRightWidth: 0,
                  padding: RFV(10),
                  borderColor: '#FFF',
                }}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 18}}>
                  HDFC BANK
                </Text>
                <Text style={{color: '#FFF', fontSize: 16}}>
                  {accountNumber}
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{color: '#FFF', fontSize: 16, marginTop: RFV(20)}}>
                    Approved
                  </Text>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{
                      width: RFV(20),
                      height: RFV(20),
                      marginTop: RFV(20),
                      marginLeft: RFV(10),
                    }}
                    source={require('../../../../Assets/Images/Home/check.png')}
                  />
                </View>
              </View>
            </View>
          </View>
          {userActionsCard()}
        </View>
      </View>
    </ScrollView>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
