import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import {providerSecondSignUp} from '../../../Store/Action/Auth';
const IDVerificationForm = (props) => {
  const dispatch = useDispatch();
  const [SSN, setSSN] = useState('');
  const [SSNError, setSSNError] = useState('');
  const [Loading, setLoading] = useState(false);
  const {token, loading} = useSelector((state) => state.auth);
  const [Token, setToken] = useState('');
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  useEffect(() => {
    setToken(token);
  }, [token]);
  const onSubmitHandler = async () => {
    setLoading(true);
    if (!SSN) {
      setSSNError('Social Security Number is required!!');
      setLoading(false);
      return;
    } else {
      console.log(SSN);
      let PersonalInfo = await AsyncStorage.getItem('personalinfo');
      let CompanyInfo = await AsyncStorage.getItem('companyinfo');
      PersonalInfo = JSON.parse(PersonalInfo);
      CompanyInfo = JSON.parse(CompanyInfo);
      const finalData = {
        ...PersonalInfo,
        ...CompanyInfo,
        social_security_number: SSN,
      };
      console.log(finalData);
      dispatch(providerSecondSignUp(finalData, Token));
      setSSN('');
    }
  };
  return (
    <React.Fragment>
      <StatusBar backgroundColor={'#ffd9d3'} barStyle="dark-content" />
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ID Verification</Text>
        </View>
        <View style={styles.mainForm}>
          <View style={styles.form_row}>
            <LabeledInput
              label="SOCIAL SECURITY NUMBER"
              inputStyling={styles.inputField}
              inputLabelContainerStyle={{
                marginTop: RFV(15),
                marginBottom: RFV(3),
              }}
              error={SSNError}
              value={SSN}
              onChangeText={(t) => setSSN(t)}
              labelColor="#8c8a8b"
              keyboardType="default"
            />
          </View>
          {/* ///SUBMIT */}
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: Dimensions.get('screen').width - RFV(70),
            }}>
            <TouchableNativeFeedback onPress={onSubmitHandler}>
              <View style={styles.submitButton}>
                <Text
                  style={{
                    fontSize: RFV(20),
                    color: '#fff',
                  }}>
                  {Loading ? <ActivityIndicator color="#fff" /> : 'FINISH'}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* ///SUBMIT */}
        </View>
      </View>
    </React.Fragment>
  );
};

export default IDVerificationForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffd9d3',
    height: Dimensions.get('screen').height,
  },
  titleContainer: {
    height: RFV(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: RFV(15),
  },
  title: {fontSize: RFV(30), color: Colors.orange},
  mainForm: {
    marginTop: 10,
    display: 'flex',
    // flex: 10,
    height: RFV(300),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: RFV(20),
    marginHorizontal: RFV(15),
  },

  form_row: {
    flex: 1,
    height: RFV(130),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: Dimensions.get('screen').width / 5,
    marginVertical: RFV(5),
    marginBottom: RFV(8),
  },
  inputField: {
    backgroundColor: '#ffd9d4',
    color: '#444',
    marginBottom: RFV(0),
    height: RFV(50),
    marginHorizontal: RFV(10),
    paddingLeft: 8,
    fontSize: RFV(14),
  },
  submitButton: {
    // width: Dimensions.get('screen').width ,
    flex: 0.5,
    height: Dimensions.get('screen').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    marginVertical: 10,
  },
});
