import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import {isInValidValue} from '../../../Constants/Validation';
import {changePassword} from '../../../Store/Action/User';

const ChangePasswordForm = () => {
  const [userCurrentPassword, setUserCurrentPassword] = useState({
    value: '',
    maxLength: 64,
    minLength: 1,
  });
  const [userNewPassword, setUserNewPassword] = useState({
    value: '',
    maxLength: 64,
    minLength: 8,
  });
  const [userConfirmNewPassword, setUserConfirmNewPassword] = useState({
    value: '',
    maxLength: 64,
    minLength: 8,
  });
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [Message, setMessage] = useState('');
  const {loading, message, error} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  useEffect(() => {
    setMessage(message);
    return setMessage('');
  }, [message]);
  useEffect(() => {
    setError(error);
    return setError('');
  }, [error]);
  //toggle new/old
  const resetForm = () => {
    setFormError({
      currentPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',
    });
    setUserConfirmNewPassword({...userConfirmNewPassword, value: ''});
    setUserCurrentPassword({...userCurrentPassword, value: ''});
    setUserNewPassword({...userNewPassword, value: ''});
  };
  const onSubmitHandler = () => {
    Keyboard.dismiss();
    if (
      !isInValidValue(userCurrentPassword) &&
      !isInValidValue(userNewPassword) &&
      !isInValidValue(userConfirmNewPassword)
    ) {
      if (userNewPassword.value !== userConfirmNewPassword.value) {
        return setFormError({
          currentPasswordError: isInValidValue(userCurrentPassword),
          newPasswordError: isInValidValue(userNewPassword),
          confirmNewPasswordError: 'Password Not Matched!',
        });
      }
      const data = {
        old_password: userCurrentPassword.value,
        password: userNewPassword.value,
        confirm_password: userConfirmNewPassword.value,
      };
      dispatch(changePassword(data));
      resetForm();
    } else {
      setFormError({
        currentPasswordError: isInValidValue(userCurrentPassword),
        newPasswordError: isInValidValue(userNewPassword),
        confirmNewPasswordError: isInValidValue(userConfirmNewPassword),
      });
      SimpleToast.show('Recheck Form', 2000);
    }
  };
  const [FormError, setFormError] = useState({
    currentPasswordError: '',
    newPasswordError: '',
    confirmNewPasswordError: '',
  });

  return (
    <View
      style={{
        marginTop: 10,
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        paddingTop: RFV(20),
      }}>
      <View style={styles.form_row}>
        <LabeledInput
          value={userCurrentPassword.value}
          onChangeText={(t) =>
            setUserCurrentPassword({...userCurrentPassword, value: t})
          }
          error={FormError.currentPasswordError}
          inputStyling={styles.input}
          label="CURRENT PASSWORD"
          labelColor="#aaa"
          inputLabelContainerStyle={{
            marginTop: RFV(5),
            marginBottom: RFV(3),
          }}
          secureTextEntry={true}
          isPassword={true}
          textContentType="password"
        />
      </View>
      <View style={styles.form_row}>
        <LabeledInput
          value={userNewPassword.value}
          onChangeText={(t) =>
            setUserNewPassword({...userNewPassword, value: t})
          }
          error={FormError.newPasswordError}
          inputStyling={styles.input}
          label="NEW PASSWORD"
          labelColor="#aaa"
          inputLabelContainerStyle={{
            marginTop: RFV(5),
            marginBottom: RFV(3),
          }}
          secureTextEntry={true}
          isPassword={true}
          textContentType="password"
        />
      </View>
      <View style={styles.form_row}>
        <LabeledInput
          value={userConfirmNewPassword.value}
          onChangeText={(t) =>
            setUserConfirmNewPassword({...userConfirmNewPassword, value: t})
          }
          error={FormError.confirmNewPasswordError}
          inputStyling={styles.input}
          label="CONFIRM NEW PASSWORD"
          labelColor="#aaa"
          inputLabelContainerStyle={{
            marginTop: RFV(5),
            marginBottom: RFV(3),
          }}
          secureTextEntry={true}
          isPassword={true}
          textContentType="password"
        />
      </View>
      {(!!Message || !!Error) && (
        <View style={styles.form_row}>
          <Text style={{fontSize: RFV(16), color: Colors.pink}}>{Message}</Text>
          <Text style={{fontSize: RFV(16), color: '#c00'}}>{Error}</Text>
        </View>
      )}
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginVertical: RFV(20),
          width: Dimensions.get('screen').width - RFV(62),
          // backgroundColor: '#f00',
        }}>
        <TouchableNativeFeedback
          onPress={() => {
            onSubmitHandler();
          }}>
          <View
            style={{
              flex: 0.5,
              height: RFV(45),
              width: RFV(160),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.orange,
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                color: '#fff',
              }}>
              {Loading ? <ActivityIndicator color="#fff" /> : 'SAVE CHANGES'}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default ChangePasswordForm;

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
    backgroundColor: '#ffd9d4',
    color: '#444',
    marginBottom: RFV(4),
  },
});
