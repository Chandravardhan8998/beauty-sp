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
import {isInValidEmail, isInValidValue} from '../../Constants/Validation';
import {providerSignin} from '../../Store/Action/Auth';

const Login = (props) => {
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
  const [FormError, setFormError] = useState({
    emailError: '',
    passwordError: '',
  });
  const dispatch = useDispatch();
  //toggle new/old
  const resetForm = () => {
    setUserEmail({...userEmail, value: ''});
    setUserPassword({...userPassword, value: ''});
    setFormError({
      emailError: '',
      passwordError: '',
    });
  };
  const [Loading, setLoading] = useState(false);
  const {loading} = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  const onSubmitHandler = () => {
    Keyboard.dismiss();
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
                  {`Welcome Back!\nLogin to get started`}
                </Text>
              </View>
              <View
                // keyboardVerticalOffset={0}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                  ...styles.form,
                  height: RFV(430),
                  // backgroundColor: '#f09',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    ...styles.mainForm,
                    flex: 0.7,
                    justifyContent: 'flex-start',
                  }}>
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

                  <TouchableNativeFeedback onPress={onSubmitHandler}>
                    <View style={styles.submitButton}>
                      {Loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={{color: '#fff', fontSize: RFV(20)}}>
                          {'Login'}
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
                    props.navigation.navigate('Plans');
                  }}
                  style={{
                    height: RFV(30),
                    margin: RFV(5),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.white, fontSize: RFV(18)}}>
                    {`Don't Have an Account?`}
                    <Text style={{color: Colors.orange}}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
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
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Login;
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
