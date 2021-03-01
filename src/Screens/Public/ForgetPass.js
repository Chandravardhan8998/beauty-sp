import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {API} from '../../Backend/Backend';
import LabeledInput from '../../Components/Common UI/LabeledInput';
import {Colors} from '../../Constants/Colors';
import {RFV} from '../../Constants/utility';
import {isInValidEmail} from '../../Constants/Validation';

const ForgetPass = (props) => {
  const [userEmail, setUserEmail] = useState({
    value: '',
  });
  const [FormError, setFormError] = useState({
    emailError: '',
  });
  const [Loading, setLoading] = useState(false);
  const forgetPasswordHandler = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/forget-password?type=email&email=${email}`,
      );
      const resData = await res.json();
      Toast.show(resData.msg, 1000);
      setLoading(false);
      return;
    } catch (error) {
      Toast.show('Try Again', 1000);
      console.log(error);
      setLoading(false);
      return;
    }
  };
  const onSubmitHandler = () => {
    if (!userEmail.value) {
      setFormError({...FormError, emailError: isInValidEmail(userEmail)});
    } else {
      setFormError({emailError: ''});
      console.log(userEmail.value);
      forgetPasswordHandler(userEmail.value);
    }
  };

  return (
    <TouchableWithoutFeedback style={styles.screen} onPress={Keyboard.dismiss}>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require('../../../Assets/Images/AppTour/auth_bg.png')}
        height={Dimensions.get('screen').height}
        width={Dimensions.get('screen').width}
        style={{
          flex: 1,
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
        }}>
        <StatusBar
          barStyle={'light-content'}
          translucent={true}
          backgroundColor="transparent"
        />
        {/* IMAGE HEADER */}
        <View style={{flex: 5}}></View>
        <View style={styles.imageHeader}>
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
        {/* IMAGE HEADER ENDS */}
        {/* TITLE */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forget Password</Text>
        </View>
        {/* TITLE ENDS */}
        <KeyboardAvoidingView style={styles.form}>
          <View style={styles.mainForm}>
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
            <TouchableNativeFeedback onPress={onSubmitHandler}>
              <View style={styles.submitButton}>
                <Text style={{color: '#fff', fontSize: RFV(20)}}>
                  {Loading ? <ActivityIndicator color="#fff" /> : 'Proceed'}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.backLinks}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'right',
                fontSize: RFV(18),
              }}>
              Back To
              <Text style={{color: Colors.orange}}> Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPass;
const styles = StyleSheet.create({
  screen: {flex: 1},
  imageHeader: {
    flex: 25,
    // backgroundColor: '#00e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 12,
    // backgroundColor: '#ee0',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    flex: 50,
    // backgroundColor: '#2ef',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  backLinks: {
    flex: 14,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flex: 3,
    fontSize: RFV(28),
    color: Colors.white,
    marginLeft: RFV(10),
    // backgroundColor: '#f0f',
  },
  mainForm: {
    marginTop: 10,
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.carrot + '99',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#eff',
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
