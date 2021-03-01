import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import {
  isInValidEmail,
  isInValidPhone,
  isInValidValue,
} from '../../../Constants/Validation';
import SelectService from '../../../Components/Home/ManageStaff/SelectService';
import {useDispatch, useSelector} from 'react-redux';
import {addStaff} from '../../../Store/Action/Staff';

const StaffDetailsForm = () => {
  const [userFirstName, setUserFirstName] = useState({
    value: '',
    maxLength: 32,
    minLength: 2,
  });
  const [userLastName, setUserLastName] = useState({
    value: '',
    maxLength: 32,
    minLength: 2,
  });
  const [userPhone, setUserPhone] = useState({
    value: '',
    maxLength: 10,
    minLength: 10,
  });
  const [userEmail, setUserEmail] = useState({
    value: '',
    maxLength: 50,
    minLength: 6,
  });
  const [userPassword, setUserPassword] = useState({
    value: '',
    maxLength: 100,
    minLength: 6,
  });
  const [Service, setService] = useState({
    value: '',
    error: '',
  });

  const [isSun, setIsSun] = useState(false);
  const [isMon, setIsMon] = useState(false);
  const [isTues, setIsTues] = useState(false);
  const [isWednes, setIsWednes] = useState(false);
  const [isThurs, setIsThurs] = useState(false);
  const [isFri, setIsFri] = useState(false);
  const [isSat, setIsSat] = useState(false);
  //REDUX
  const {loading} = useSelector((state) => state.staff);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  //REDUX
  const [FormError, setFormError] = useState({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    emailError: '',
    serviceError: '',
    passwordError: '',
  });
  //toggle new/old
  const resetForm = () => {
    setFormError({
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      emailError: '',
      passwordError: '',
      serviceError: '',
    });
  };
  //TODO
  const onSubmitHandler = () => {
    setLoading(true);
    // Keyboard.dismiss();
    if (
      !isInValidValue(userFirstName) &&
      !isInValidValue(userLastName) &&
      !isInValidPhone(userPhone) &&
      !isInValidEmail(userEmail) &&
      !isInValidValue(userPassword) &&
      !!Service.value
    ) {
      const staffData = {
        first_name: userFirstName.value,
        last_name: userLastName.value,
        phone_number: userPhone.value,
        email: userEmail.value,
        service: Service.value,
        password: userPassword.value,
      };
      console.log(staffData);
      dispatch(addStaff(staffData));
      resetForm();
      return;
    } else {
      console.log(!!Service.value);
      //Signup form not validated
      setFormError({
        ...FormError,
        firstNameError: isInValidValue(userFirstName),
        lastNameError: isInValidValue(userLastName),
        phoneError: isInValidPhone(userPhone),
        emailError: isInValidEmail(userEmail),
        passwordError: isInValidValue(userPassword),
        serviceError: !Service.value ? 'Select Service' : '',
      });
      console.log({
        serviceError: 'Service Required',
        firstNameError: isInValidValue(userFirstName),
        lastNameError: isInValidValue(userLastName),
        phoneError: isInValidPhone(userPhone),
        emailError: isInValidEmail(userEmail),
        passwordError: isInValidValue(userPassword),
      });
      setLoading(false);
      return;
    }
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
          barStyle="dark-content"
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
              Staff Form
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flex: 1,
              //   backgroundColor: Colors.carrot + '99',
              justifyContent: 'space-evenly',
              padding: 10,
              paddingTop: RFV(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                marginVertical: RFV(5),
              }}>
              <LabeledInput
                value={userFirstName.value}
                onChangeText={(t) =>
                  setUserFirstName({...userFirstName, value: t})
                }
                error={FormError.firstNameError}
                inputStyling={styles.input}
                label="FIRST NAME"
                labelColor="#aaa"
                inputLabelContainerStyle={{
                  marginTop: RFV(5),
                  marginBottom: RFV(3),
                }}
                maxLength={32}
                textContentType="name"
              />
              <LabeledInput
                value={userLastName.value}
                onChangeText={(t) =>
                  setUserLastName({...userLastName, value: t})
                }
                error={FormError.lastNameError}
                inputStyling={styles.input}
                label="LAST NAME"
                labelColor="#aaa"
                inputLabelContainerStyle={{
                  marginTop: RFV(5),
                  marginBottom: RFV(3),
                }}
                maxLength={32}
                textContentType="name"
              />
            </View>
            <View style={styles.form_row}>
              <LabeledInput
                value={userPhone.value}
                onChangeText={(t) => setUserPhone({...userPhone, value: t})}
                error={FormError.phoneError}
                inputStyling={styles.input}
                label="PHONE"
                labelColor="#aaa"
                inputLabelContainerStyle={{
                  marginTop: RFV(5),
                  marginBottom: RFV(3),
                }}
                textContentType="telephoneNumber"
                maxLength={10}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.form_row}>
              <LabeledInput
                value={userEmail.value}
                onChangeText={(t) => setUserEmail({...userEmail, value: t})}
                error={FormError.emailError}
                label="EMAIL"
                textContentType="emailAddress"
                keyboardType="email-address"
                maxLength={userEmail.maxLength}
                inputStyling={styles.input}
                inputLabelContainerStyle={{
                  marginTop: RFV(45),
                  marginBottom: RFV(3),
                }}
                labelColor="#aaa"
              />
            </View>
            <View style={styles.form_row}>
              <LabeledInput
                inputStyling={styles.input}
                inputLabelContainerStyle={{
                  marginTop: RFV(45),
                  marginBottom: RFV(3),
                }}
                labelColor="#aaa"
                label="PASSWORD"
                error={FormError.passwordError}
                value={userPassword.value}
                placeholder=""
                onChangeText={(text) => {
                  setUserPassword({...userPassword, value: text});
                }}
                isPassword={true}
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <View style={styles.form_row}>
              <SelectService
                value={Service.value}
                // onChangeText={()=>}
                onChangeText={(t) => {
                  setService({...Service, value: t.id});
                }}
                // onChangeText={(t) => setService({...service, value: t})}
                error={FormError.serviceError}
                inputStyling={styles.input}
                label="Select Service"
                labelColor="#aaa"
                inputLabelContainerStyle={{
                  marginTop: RFV(75),
                  marginBottom: RFV(3),
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: 50,
                marginStart: RFV(12),
              }}>
              <Text style={{color: '#aaa', fontSize: 11}}>Work schedule</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{flex: 1.5}}>Day</Text>
                <Text style={{flex: 1}}>Start Time</Text>
                <Text style={{flex: 1}}>End Time</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isSun}
                    onValueChange={(newValue) => setIsSun(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Sunday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isMon}
                    onValueChange={(newValue) => setIsMon(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Monday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isTues}
                    onValueChange={(newValue) => setIsTues(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Tuesday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isWednes}
                    onValueChange={(newValue) => setIsWednes(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Wednesday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isThurs}
                    onValueChange={(newValue) => setIsThurs(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>ThrusDay</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isFri}
                    onValueChange={(newValue) => setIsFri(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Friday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    alignItems: 'center',
                    flex: 1.5,
                  }}>
                  <CheckBox
                    tintColors={{
                      false: '#8c8a8b',
                      true: Colors.orange,
                    }}
                    disabled={false}
                    value={isSat}
                    onValueChange={(newValue) => setIsSat(newValue)}
                  />
                  <Text style={{color: '#B8B8B8'}}>Saturday</Text>
                </View>
                <Text style={{color: '#B8B8B8', flex: 1}}>9:00 AM</Text>
                <Text style={{color: '#B8B8B8', flex: 1}}>7:00 PM</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                marginVertical: RFV(20),
                width: Dimensions.get('screen').width - RFV(62),
              }}>
              <TouchableNativeFeedback
                onPress={() => {
                  onSubmitHandler();
                  console.log('clicked');
                }}>
                <View
                  style={{
                    flex: 0.5,
                    height: RFV(45),
                    width: RFV(160),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: RFV(30),
                    backgroundColor: Colors.orange,
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    {Loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      'SAVE CHANGES'
                    )}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffDetailsForm;

const styles = StyleSheet.create({
  form_row: {
    flex: 1,
    height: RFV(130),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: Dimensions.get('screen').width / 5,
    marginVertical: RFV(5),
  },
  input: {
    // backgroundColor: '#ffd9d4',
    backgroundColor: '#ffd9d4',
    color: '#444',
    marginBottom: RFV(4),
  },
});
