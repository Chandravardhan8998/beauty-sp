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
import {useDispatch, useSelector} from 'react-redux';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import {isInValidValue} from '../../../Constants/Validation';
import {updateBank} from '../../../Store/Action/Bank';
import CountryPicker from '../Varification/CountryPicker';

const BankDetailsForm = ({fetchAccountDetails}) => {
  const [accountType, setAccountType] = useState({
    value: '',
    maxLength: 32,
    minLength: 2,
  });
  const [accountNumber, setAccountNumber] = useState({
    value: '',
    maxLength: 22,
    minLength: 8,
  });
  const [country, setCountry] = useState({
    value: '',
    maxLength: 32,
    minLength: 2,
  });
  const [accountName, setAccountName] = useState({
    value: '',
    maxLength: 100,
    minLength: 6,
  });
  const [Loading, setLoading] = useState(false);
  const {loading, bankData} = useSelector((state) => state.bank);
  const [BankDetails, setBankDetails] = useState({
    account_name: '',
    account_number: '',
    bank_country: '',
    bank_name: '',
    account_type: '',
  });
  useEffect(() => {
    setBankDetails(bankData);
  }, [bankData]);
  const {
    account_name,
    account_number,
    account_type,
    bank_country,
    bank_name,
  } = BankDetails;

  useEffect(() => {
    setAccountName({...accountName, value: account_name});
    setAccountNumber({...accountNumber, value: account_number});
    setAccountType({...accountType, value: account_type});
    setCountry({...country, value: bank_country});
  }, [account_name, account_number, account_type, bank_country]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  //toggle new/old
  const resetForm = () => {
    setFormError({
      accountTypeError: '',
      accountNumError: '',
      countryError: '',
      accountNameError: '',
    });
  };
  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    Keyboard.dismiss();
    if (
      !isInValidValue(accountType) &&
      !isInValidValue(country) &&
      !isInValidValue(accountNumber) &&
      !isInValidValue(accountName)
    ) {
      const accountData = {
        account_type: accountType.value,
        account_number: accountNumber.value,
        bank_country: country.value,
        account_name: accountName.value,
      };
      dispatch(updateBank(accountData));
      resetForm();
      return;
    } else {
      //Signup form not validated
      setFormError({
        accountTypeError: isInValidValue(accountType),
        countryError: isInValidValue(country),
        accountNumError: isInValidValue(accountNumber),
        accountNameError: isInValidValue(accountName),
      });
    }
  };
  const [FormError, setFormError] = useState({
    accountTypeError: '',
    countryError: '',
    accountNumError: '',
    accountNameError: '',
  });
  if (Loading) {
    return <ActivityIndicator color="#000" />;
  }
  return (
    <View
      style={{
        marginTop: 10,
        display: 'flex',
        flex: 1,
        //   backgroundColor: Colors.carrot + '99',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        paddingTop: RFV(20),
      }}>
      <View style={styles.form_row}>
        <LabeledInput
          value={accountType.value}
          onChangeText={(t) => setAccountType({...accountType, value: t})}
          error={FormError.accountTypeError}
          inputStyling={styles.input}
          label="ACCOUNT TYPE"
          labelColor="#aaa"
          inputLabelContainerStyle={{
            marginTop: RFV(5),
            marginBottom: RFV(3),
          }}
          maxLength={accountType.maxLength}
          textContentType="name"
        />
      </View>

      <View
        style={{
          marginTop: RFV(9),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          maxHeight: Dimensions.get('screen').width / 5,
          marginVertical: RFV(5),
        }}>
        <LabeledInput
          value={accountNumber.value}
          onChangeText={(t) => {
            setAccountNumber({...accountNumber, value: t});
            fetchAccountDetails(t);
          }}
          error={FormError.accountNumError}
          inputStyling={styles.input}
          label="ACCOUNT NUMBER"
          labelColor="#aaa"
          inputLabelContainerStyle={{
            marginTop: RFV(20),
            marginBottom: RFV(3),
          }}
          maxLength={accountNumber.maxLength}
          keyboardType="phone-pad"
        />
        <CountryPicker
          error={FormError.countryError}
          inputStyling={styles.input}
          label="BANK COUNTRY"
          value={country.value}
          labelColor="#aaa"
          onChangeText={(t) => setCountry({...country, value: t.value})}
          inputLabelContainerStyle={{
            marginTop: RFV(20),
            marginBottom: RFV(3),
          }}
        />
      </View>

      <View style={[styles.form_row, {marginTop: 15}]}>
        <LabeledInput
          value={accountName.value}
          onChangeText={(t) => setAccountName({...accountName, value: t})}
          error={FormError.accountNameError}
          inputStyling={styles.input}
          inputLabelContainerStyle={{
            marginTop: RFV(20),
            marginBottom: RFV(3),
          }}
          label="ACCOUNT NAME"
          labelColor="#aaa"
        />
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginVertical: RFV(10),
          width: Dimensions.get('screen').width - RFV(62),
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
              marginTop: RFV(10),
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

export default BankDetailsForm;

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
