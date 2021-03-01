import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import LabeledInput from '../../Components/Common UI/LabeledInput';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';
import {
  isInValidEmail,
  isInValidPhone,
  isInValidValue,
} from '../../Constants/Validation';
import {providerSignin, userSignup} from '../../Store/Action/Auth';

const LogIn_SignUp = (props) => {
  const [userFirstName, setUserFirstName] = useState({
    value: '',
    maxLength: 50,
    minLength: 3,
  });
  const [userLastName, setUserLastName] = useState({
    value: '',
    maxLength: 50,
    minLength: 3,
  });
  const [userPhone, setUserPhone] = useState({
    value: '',
    maxLength: 10,
    minLength: 10,
  });
  const [userEmail, setUserEmail] = useState({
    value: '',
    maxLength: 1000,
    minLength: 1,
  });
  const [userPassword, setUserPassword] = useState({
    value: '',
    maxLength: 128,
    minLength: 5,
  });
  const [userConfirmPassword, setUserConfirmPassword] = useState({
    value: '',
    maxLength: 128,
    minLength: 5,
  });
  const [FormError, setFormError] = useState({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  const dispatch = useDispatch();
  //toggle new/old
  const resetForm = () => {
    setUserEmail({...userEmail, value: ''});
    setUserPassword({...userPassword, value: ''});
    setUserFirstName({...userFirstName, value: ''});
    setUserLastName({...userLastName, value: ''});
    setUserConfirmPassword({...userConfirmPassword, value: ''});
    setUserPhone({...userPhone, value: ''});
    setFormError({
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });
  };
  const [userIsNew, setUserIsNew] = useState(false);
  const [Loading, setLoading] = useState(false);
  const {loading} = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmitHandler = () => {
    Keyboard.dismiss();
    if (userIsNew) {
      if (
        !isInValidValue(userFirstName) &&
        !isInValidValue(userLastName) &&
        !isInValidValue(userPassword) &&
        !isInValidPhone(userPhone) &&
        !isInValidEmail(userEmail)
      ) {
        if (userPassword.value !== userConfirmPassword.value) {
          return setFormError({
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: 'Password Mismatch',
          });
        }
        setLoading(true);
        //Signup form validated
        //API work here
        const user = {
          first_name: userFirstName.value,
          last_name: userLastName.value,
          phone_number: userPhone.value,
          password: userPassword.value,
          confirm_password: userConfirmPassword.value,
          email: userEmail.value,
        };

        dispatch(userSignup(user));
        resetForm();
      } else {
        //Signup form not validated
        setFormError({
          firstNameError: isInValidValue(userFirstName),
          lastNameError: isInValidValue(userLastName),
          phoneError: isInValidPhone(userPhone),
          emailError: isInValidEmail(userEmail),
          passwordError: isInValidValue(userPassword),
          confirmPasswordError: isInValidValue(userConfirmPassword),
        });
      }
    } else {
      if (!isInValidValue(userPassword) && !isInValidEmail(userEmail)) {
        setLoading(true);

        dispatch(
          providerSignin({
            password: userPassword.value,
            email: userEmail.value,
          }),
        );
        // props.navigation.navigate('ForgetPassword');
        resetForm();
        return;
      } else {
        // Login form Not Validated
        setFormError({
          firstNameError: '',
          lastNameError: '',
          phoneError: '',
          emailError: isInValidEmail(userEmail),
          passwordError: isInValidValue(userPassword),
          confirmPasswordError: '',
        });
      }
    }
  };
  return (
    <React.Fragment>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={'-60'}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ImageBackground
              resizeMode="cover"
              resizeMethod="auto"
              source={require('../../../Assets/Images/AppTour/auth_bg.png')}
              // height={Dimensions.get('screen').height}
              width={Dimensions.get('screen').width}
              style={{
                flex: 1,
                width: Dimensions.get('screen').width,
                minHeight: Dimensions.get('screen').height,
              }}>
              <View style={{height: RFV(50)}}></View>
              <View style={[styles.imageHeader]}>
                <Image
                  style={{
                    justifyContent: 'center',
                  }}
                  source={require('../../../Assets/Images/AppTour/logo.png')}
                  height={RFV(100)}
                  width={RFV(100)}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {userIsNew
                    ? `Sign up and be\npart of us`
                    : `Welcome Back!\nLogin to get started`}
                </Text>
              </View>
              <View
                // keyboardVerticalOffset={0}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                  ...styles.form,
                  height: RFV(userIsNew ? 550 : 430),
                  // backgroundColor: '#f09',
                  justifyContent: userIsNew ? 'flex-end' : 'center',
                }}>
                <View
                  style={{
                    ...styles.mainForm,
                    flex: userIsNew ? 1 : 0.7,
                    justifyContent: userIsNew ? 'space-evenly' : 'flex-start',
                  }}>
                  {userIsNew && (
                    <Fragment>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flex: 1,
                          maxHeight: Dimensions.get('screen').width / 5,
                          marginVertical: RFV(5),
                        }}>
                        <LabeledInput
                          label="FIRST NAME"
                          value={userFirstName.value}
                          placeholder="First Name"
                          maxLength={32}
                          textContentType="name"
                          onChangeText={(text) => {
                            setUserFirstName({...userFirstName, value: text});
                          }}
                          error={FormError.firstNameError}
                        />
                        <LabeledInput
                          label="LAST NAME"
                          value={userLastName.value}
                          placeholder="Last Name"
                          textContentType="name"
                          maxLength={32}
                          onChangeText={(text) => {
                            setUserLastName({...userLastName, value: text});
                          }}
                          error={FormError.lastNameError}
                        />
                      </View>
                      <View style={styles.form_row}>
                        <LabeledInput
                          error={FormError.phoneError}
                          textContentType="telephoneNumber"
                          maxLength={10}
                          keyboardType="phone-pad"
                          label="PHONE"
                          value={userPhone.value}
                          placeholder="Phone Number"
                          onChangeText={(text) => {
                            setUserPhone({...userPhone, value: text});
                          }}
                        />
                      </View>
                    </Fragment>
                  )}
                  <View style={styles.form_row}>
                    <LabeledInput
                      error={FormError.emailError}
                      label="EMAIL ID"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      maxLength={50}
                      value={userEmail.value}
                      placeholder="Email"
                      onChangeText={(text) => {
                        setUserEmail({...userEmail, value: text});
                      }}
                    />
                  </View>
                  <View style={styles.form_row}>
                    <LabeledInput
                      label="PASSWORD"
                      error={FormError.passwordError}
                      value={userPassword.value}
                      placeholder="Password"
                      onChangeText={(text) => {
                        setUserPassword({...userPassword, value: text});
                      }}
                      isPassword={true}
                      secureTextEntry={true}
                      textContentType="password"
                    />
                  </View>
                  {userIsNew && (
                    <View style={styles.form_row}>
                      <LabeledInput
                        label="CONFIRM PASSWORD"
                        textContentType="newPassword"
                        error={FormError.confirmPasswordError}
                        value={userConfirmPassword.value}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        isPassword={true}
                        onChangeText={(text) => {
                          setUserConfirmPassword({
                            ...userConfirmPassword,
                            value: text,
                          });
                        }}
                      />
                    </View>
                  )}
                  <TouchableNativeFeedback onPress={onSubmitHandler}>
                    <View style={styles.submitButton}>
                      {Loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={{color: '#fff', fontSize: RFV(20)}}>
                          {userIsNew ? 'Create Account' : 'Login'}
                        </Text>
                      )}
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
              <View
                style={[
                  styles.backLinks,
                  {
                    marginTop: RFV(3),
                    // backgroundColor: '#f0f',
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    resetForm();
                    setUserIsNew(!userIsNew);
                  }}
                  style={{
                    height: RFV(30),
                    margin: RFV(5),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.white, fontSize: RFV(18)}}>
                    {userIsNew
                      ? 'Already have an Account? '
                      : `Don't Have an Account?`}
                    <Text style={{color: Colors.orange}}>
                      {userIsNew ? 'Sign in' : 'Sign up'}
                    </Text>
                  </Text>
                </TouchableOpacity>
                {!userIsNew && (
                  <TouchableOpacity
                    style={{
                      margin: RFV(5),
                      height: RFV(30),
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      resetForm();
                      props.navigation.navigate('ForgetPassword');
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        textAlign: 'right',
                        fontSize: RFV(18),
                      }}>
                      Forget Passowrd?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default LogIn_SignUp;
const styles = StyleSheet.create({
  screen: {flex: 1},
  imageHeader: {
    height: RFV(150),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    // flex: 8,
    height: RFV(80),
    // backgroundColor: '#ee0',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    height: RFV(560),
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  backLinks: {
    height: RFV(80),
    marginVertical: RFV(5),
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    display: 'flex',
    flex: 3,
    fontSize: RFV(28),
    color: Colors.white,
    marginLeft: RFV(10),
  },
  socialIconsContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainForm: {
    marginTop: 10,
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.carrot + '99',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    paddingTop: RFV(20),
  },
  form_row: {
    flex: 1,
    height: RFV(130),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: Dimensions.get('screen').width / 5,
    marginVertical: RFV(5),
  },
  submitButton: {
    width: Dimensions.get('screen').width - 60,
    height: Dimensions.get('screen').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    marginVertical: 10,
  },
});
