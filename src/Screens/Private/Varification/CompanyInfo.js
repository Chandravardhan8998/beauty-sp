import RadioButtonRN from 'radio-buttons-react-native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV, shortStr} from '../../../Constants/utility';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuggestInput from './SuggestInput';
import {isInValidValue} from './FormVerification';
import CountryPicker from './CountryPicker';
const CheckBoxInput = ({label, onValueChange}) => {
  const [toggleBox, setToggleBox] = useState(false);
  return (
    <TouchableNativeFeedback
      onPress={() => {
        setToggleBox(!toggleBox);
        onValueChange(!toggleBox);
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View>
          <CheckBox
            disabled={false}
            value={toggleBox}
            onValueChange={(newValue) => {
              setToggleBox(newValue);
              onValueChange(newValue);
            }}
            tintColors={{
              false: '#8c8a8b',
              true: Colors.orange,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: RFV(14),
              color: toggleBox ? Colors.orange : '#8c8d9b',
              margin: RFV(2),
            }}
            lineBreakMode="tail"
            numberOfLines={1}>
            {shortStr(label, 11, '...')}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const CompanyInfo = (props) => {
  //FORM VALIDATION
  const [CompanyName, setCompanyName] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [CompanyRegistrationNumber, setCompanyRegistrationNumber] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [TaxNumber, setTaxNumber] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [Address, setAddress] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [City, setCity] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [Geo, setGeo] = useState({
    lat: 0,
    lng: 0,
  });
  const [State, setState] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [PostalCode, setPostalCode] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [Country, setCountry] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [Education, setEducation] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [Bio, setBio] = useState({
    value: '',
    error: '',
    maxLength: 1000,
    minLength: 0,
    required: true,
  });
  const [Expertise, setExpertise] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [FacebookURL, setFacebookURL] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [InstagramURL, setInstagramURL] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [LinkedinURL, setLinkedinURL] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [YoutubeURL, setYoutubeURL] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: true,
  });
  const [AccountType, setAccountType] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: false,
  });
  const [AccountNumber, setAccountNumber] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: false,
  });
  const [BankCountry, setBankCountry] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: false,
  });
  const [AccountName, setAccountName] = useState({
    value: '',
    error: '',
    maxLength: 200,
    minLength: 0,
    required: false,
  });
  //FORM VALIDATION
  const data = [
    {
      label: 'yes',
    },
    {
      label: 'no',
    },
  ];
  const InitialRadioValue = 1;
  const [Insured, setInsured] = useState('yes');
  const [InsuredError, setInsuredError] = useState('');
  //NOTE Cate Selector
  const [ServiceTags, setServiceTags] = useState([]);
  const [ServiceError, setServiceError] = useState('');
  const onSelectCate = (value, select, code) => {
    let categoryArray = [...ServiceTags];
    if (select) {
      categoryArray.push(code);
    } else {
      categoryArray = categoryArray.filter((c) => c !== code);
    }
    setServiceTags(categoryArray);
    console.log(categoryArray);
  };
  const [Loading, setLoading] = useState(false);
  const reset = () => {
    setCompanyName({...CompanyName, error: '', value: ''});
    setCompanyRegistrationNumber({
      ...CompanyRegistrationNumber,
      error: '',
      value: '',
    });
    setTaxNumber({...TaxNumber, error: '', value: ''});
    setAddress({...Address, error: '', value: ''});
    setCity({...City, error: '', value: ''});
    setState({...State, error: '', value: ''});
    setPostalCode({...PostalCode, error: '', value: ''});
    setCountry({...Country, error: '', value: ''});
    setEducation({...Education, error: '', value: ''});
    setBio({...Bio, error: '', value: ''});
    setExpertise({...Expertise, error: '', value: ''});
    setFacebookURL({...FacebookURL, error: '', value: ''});
    setInstagramURL({...InstagramURL, error: '', value: ''});
    setLinkedinURL({...LinkedinURL, error: '', value: ''});
    setYoutubeURL({...YoutubeURL, error: '', value: ''});
    setAccountNumber({
      ...AccountNumber,
      error: '',
      value: '',
    });
    setAccountType({...AccountType, error: '', value: ''});
    setAccountName({...AccountName, error: '', value: ''});
    setAccountName({...AccountName, error: '', value: ''});
  };
  const onSubmitHandler = async () => {
    console.log('clicked');
    setLoading(true);
    console.log(typeof parseInt(PostalCode.value), PostalCode.value);
    console.log(typeof NaN, PostalCode.value);
    if (parseInt(PostalCode.value) === NaN) {
      console.log('1');
      setPostalCode({
        ...PostalCode,
        error: 'Invalid Value Enter Numbers',
      });
      setLoading(false);
      return;
    }
    if (!ServiceTags.length) {
      console.log('2');
      setLoading(false);
      setServiceError('Select Service');
      return;
    }
    if (!Insured) {
      console.log('3');
      setLoading(false);
      setInsuredError('Select Insured');
      return;
      // return Toast.show('Select Insured', 2000);
    }
    if (
      isInValidValue(CompanyName) ||
      isInValidValue(CompanyRegistrationNumber) ||
      isInValidValue(TaxNumber) ||
      isInValidValue(Address) ||
      isInValidValue(City) ||
      isInValidValue(State) ||
      isInValidValue(PostalCode) ||
      isInValidValue(Country) ||
      isInValidValue(Education) ||
      isInValidValue(Bio) ||
      isInValidValue(Expertise) ||
      isInValidValue(FacebookURL) ||
      isInValidValue(InstagramURL) ||
      isInValidValue(YoutubeURL) ||
      isInValidValue(AccountType) ||
      isInValidValue(AccountNumber) ||
      isInValidValue(BankCountry) ||
      isInValidValue(AccountName)
    ) {
      setCompanyName({...CompanyName, error: isInValidValue(CompanyName)});
      setCompanyRegistrationNumber({
        ...CompanyRegistrationNumber,
        error: isInValidValue(CompanyRegistrationNumber),
      });
      setTaxNumber({...TaxNumber, error: isInValidValue(TaxNumber)});
      setAddress({...Address, error: isInValidValue(Address)});
      setCity({...City, error: isInValidValue(City)});
      setState({...State, error: isInValidValue(State)});
      setPostalCode({...PostalCode, error: isInValidValue(PostalCode)});
      setCountry({...Country, error: isInValidValue(Country)});
      setEducation({...Education, error: isInValidValue(Education)});
      setBio({...Bio, error: isInValidValue(Bio)});
      setExpertise({...Expertise, error: isInValidValue(Expertise)});
      setFacebookURL({...FacebookURL, error: isInValidValue(FacebookURL)});
      setInstagramURL({...InstagramURL, error: isInValidValue(InstagramURL)});
      setLinkedinURL({...LinkedinURL, error: isInValidValue(LinkedinURL)});
      setYoutubeURL({...YoutubeURL, error: isInValidValue(YoutubeURL)});
      setAccountNumber({
        ...AccountNumber,
        error: isInValidValue(AccountNumber),
      });
      setAccountType({...AccountType, error: isInValidValue(AccountType)});
      setAccountName({...AccountName, error: isInValidValue(AccountName)});
      setAccountName({...AccountName, error: isInValidValue(AccountName)});
      setLoading(false);
    } else {
      const companyInfo = {
        company_name: CompanyName.value,
        company_registration_number: CompanyRegistrationNumber.value,
        tax_number: TaxNumber.value,
        insured: Insured,
        address: Address.value,
        city: City.value,
        current_latitude: Geo.lat,
        current_longitude: Geo.lng,
        state: State.value,
        country: Country.value,
        zip_code: PostalCode.value,
        expertise: Expertise.value,
        bio: Bio.value,
        education: Education.value,
        facebook_url: FacebookURL.value,
        linkdin_url: LinkedinURL.value,
        instagram_url: InstagramURL.value,
        youtube_url: YoutubeURL.value,
        service_tags: JSON.stringify(ServiceTags),
        account_type: AccountType.value,
        account_number: AccountNumber.value,
        bank_country: BankCountry.value,
        account_name: AccountName.value,
      };
      console.log(JSON.stringify(companyInfo));
      props.navigation.navigate('IDVerificationForm');
      AsyncStorage.setItem('companyinfo', JSON.stringify(companyInfo));
      reset();
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <StatusBar backgroundColor={'#ffd9d3'} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={'-60'}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="always">
            <View style={styles.screen}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Company Info.</Text>
              </View>
              <View style={styles.mainForm}>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={CompanyName.value}
                    onChangeText={(t) =>
                      setCompanyName({
                        ...CompanyName,
                        value: t,
                      })
                    }
                    error={CompanyName.error}
                    inputStyling={styles.inputField}
                    label="COMPANY'S NAME"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={CompanyName.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={CompanyRegistrationNumber.value}
                    onChangeText={(t) =>
                      setCompanyRegistrationNumber({
                        ...CompanyRegistrationNumber,
                        value: t,
                      })
                    }
                    error={CompanyRegistrationNumber.error}
                    inputStyling={styles.inputField}
                    label="COMPANY REGISTRATION NUMBER"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={CompanyRegistrationNumber.maxLength}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={TaxNumber.value}
                    onChangeText={(t) =>
                      setTaxNumber({
                        ...TaxNumber,
                        value: t,
                      })
                    }
                    error={TaxNumber.error}
                    inputStyling={styles.inputField}
                    label="TAX NUMBER"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={TaxNumber.maxLength}
                  />
                </View>
                <View
                  style={{
                    ...styles.form_row,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: 0,
                    // marginHorizontal: RFV(10),
                  }}>
                  <Text
                    style={{
                      height: RFV(20),
                      marginLeft: RFV(10),
                      fontSize: RFV(12),
                      color: '#8c8a8b',
                      paddingBottom: RFV(6),
                      textAlignVertical: 'top',
                    }}>
                    ARE YOU INSURED?
                  </Text>
                  <View
                    style={{
                      ...styles.input,
                      padding: RFV(4),
                      ...styles.inputField,
                    }}>
                    <RadioButtonRN
                      icon={
                        <MIcon
                          name="check-circle"
                          size={25}
                          color={Colors.orange}
                        />
                      }
                      data={data}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                      }}
                      boxStyle={{
                        flex: 1,
                        height: RFV(40),
                        width: RFV(100),
                        marginHorizontal: RFV(5),
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        position: 'relative',
                        bottom: 4,
                      }}
                      textStyle={{
                        fontSize: RFV(16),
                        marginLeft: RFV(5),
                        textAlign: 'center',
                      }}
                      initial={InitialRadioValue}
                      deactiveColor={Colors.gray}
                      selectedBtn={(e) => {
                        setInsured(e.label);
                      }}
                    />
                  </View>
                  {!!InsuredError && (
                    <View>
                      <Text
                        style={{
                          color: Colors.orange,
                          fontSize: RFV(16),
                          paddingVertical: RFV(5),
                          paddingHorizontal: RFV(16),
                        }}>
                        {InsuredError}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    ...styles.form_row,
                    marginTop: RFV(30),
                    marginBottom: RFV(30),
                  }}>
                  <SuggestInput
                    //  value={City.value}
                    onChangeText={(t, geo, pin) => {
                      setGeo({
                        ...geo,
                      });
                      console.log(parseInt(pin.long_name) >= 0);
                      if (parseInt(pin.long_name) >= 0) {
                        setPostalCode({...PostalCode, value: pin.long_name});
                      } else {
                        setPostalCode({...PostalCode, value: ''});
                      }
                      setAddress({
                        ...Address,
                        value: t,
                      });
                    }}
                    error={Address.error}
                    label="ADDRESS"
                    labelColor="#8c8a8b"
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={City.value}
                    onChangeText={(t) =>
                      setCity({
                        ...City,
                        value: t,
                      })
                    }
                    error={City.error}
                    inputStyling={styles.inputField}
                    label="CITY"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={City.maxLength}
                    textContentType="addressCity"
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={State.value}
                    onChangeText={(t) => {
                      setState({
                        ...State,
                        value: t,
                      });
                    }}
                    error={State.error}
                    inputStyling={styles.inputField}
                    label="STATE"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={State.maxLength}
                    textContentType="addressState"
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={PostalCode.value}
                    onChangeText={(t) =>
                      setPostalCode({
                        ...PostalCode,
                        value: t,
                      })
                    }
                    error={PostalCode.error}
                    inputStyling={styles.inputField}
                    label="POST CODE"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={PostalCode.maxLength}
                    keyboardType="number-pad"
                    textContentType="postalCode"
                  />
                </View>
                <View style={styles.form_row}>
                  {/* <LabeledInput
                  /> */}
                  <CountryPicker
                    value={Country.value}
                    onChangeText={(t) => {
                      setCountry({
                        ...Country,
                        value: t.id,
                      });
                      console.log(t.id);
                    }}
                    error={Country.error}
                    inputStyling={styles.inputField}
                    label="COUNTRY"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={Country.maxLength}
                    textContentType="countryName"
                    // label="COUNTRY"
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={Education.value}
                    onChangeText={(t) =>
                      setEducation({
                        ...Education,
                        value: t,
                      })
                    }
                    error={Education.error}
                    inputStyling={styles.inputField}
                    label="EDUCATION"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={Education.maxLength}
                  />
                </View>
                <View
                  style={{
                    ...styles.form_row,
                    marginTop: RFV(30),
                    marginBottom: RFV(30),
                  }}>
                  <LabeledInput
                    value={Bio.value}
                    onChangeText={(t) =>
                      setBio({
                        ...Bio,
                        value: t,
                      })
                    }
                    multiline={true}
                    error={Bio.error}
                    inputStyling={{
                      ...styles.inputField,
                      height: RFV(100),
                    }}
                    label="BIO"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(15),
                      marginBottom: RFV(3),
                    }}
                    maxLength={Bio.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={Expertise.value}
                    onChangeText={(t) =>
                      setExpertise({
                        ...Expertise,
                        value: t,
                      })
                    }
                    error={Expertise.error}
                    inputStyling={styles.inputField}
                    label="EXPERTISE"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={Expertise.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={FacebookURL.value}
                    onChangeText={(t) =>
                      setFacebookURL({
                        ...FacebookURL,
                        value: t,
                      })
                    }
                    error={FacebookURL.error}
                    inputStyling={styles.inputField}
                    label="FACEBOOK URL"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={FacebookURL.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={InstagramURL.value}
                    onChangeText={(t) =>
                      setInstagramURL({
                        ...InstagramURL,
                        value: t,
                      })
                    }
                    error={InstagramURL.error}
                    inputStyling={styles.inputField}
                    label="INSTAGRAM URL"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={InstagramURL.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={LinkedinURL.value}
                    onChangeText={(t) =>
                      setLinkedinURL({
                        ...LinkedinURL,
                        value: t,
                      })
                    }
                    error={LinkedinURL.error}
                    inputStyling={styles.inputField}
                    label="LINKEDIN URL"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={LinkedinURL.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={YoutubeURL.value}
                    onChangeText={(t) =>
                      setYoutubeURL({
                        ...YoutubeURL,
                        value: t,
                      })
                    }
                    error={YoutubeURL.error}
                    inputStyling={styles.inputField}
                    label="YOUTUBE URL"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={YoutubeURL.maxLength}
                  />
                </View>
                <View
                  style={{
                    //
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: RFV(10),
                    marginHorizontal: RFV(10),
                  }}>
                  <Text
                    style={{
                      height: RFV(20),
                      fontSize: RFV(12),
                      color: '#8c8a8b',
                      paddingBottom: RFV(6),
                      textAlignVertical: 'center',
                      textAlign: 'center',
                      marginBottom: RFV(3),
                      // backgroundColor: '#f0f',
                    }}>
                    SELECT SERVICE TAGS
                  </Text>
                  <View
                    style={{
                      ...styles.input,
                      padding: RFV(12),
                      height: RFV(160),
                      flexDirection: 'column',
                      // backgroundColor: '#f90',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        margin: 1,
                        flex: 1,
                        // justifyContent:""
                      }}>
                      <CheckBoxInput
                        label="Blowouts"
                        onValueChange={(value) =>
                          onSelectCate('Blowouts', value, '22')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(22)}
                      />
                      <CheckBoxInput
                        label="Fashion"
                        onValueChange={(value) =>
                          onSelectCate('Fashion', value, '25')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(25)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        margin: 1,
                        flex: 1,
                        // justifyContent:""
                      }}>
                      <CheckBoxInput
                        label="Haircuts"
                        onValueChange={(value) =>
                          onSelectCate('Haircuts', value, '21')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(21)}
                      />
                      <CheckBoxInput
                        label="Photographic/Film"
                        onValueChange={(value) =>
                          onSelectCate('Photographic/Film', value, '24')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(24)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        margin: 1,
                        flex: 1,
                        // justifyContent:""
                      }}>
                      <CheckBoxInput
                        label="Med Spa / Skin Services"
                        onValueChange={(value) =>
                          onSelectCate('Med Spa / Skin Services', value, '27')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(27)}
                      />
                      <CheckBoxInput
                        label="Prom"
                        onValueChange={(value) =>
                          onSelectCate('Prom', value, '23')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(23)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        margin: 1,
                        flex: 1,
                        // justifyContent:""
                      }}>
                      <CheckBoxInput
                        label="Wedding"
                        onValueChange={(value) =>
                          onSelectCate('Wedding', value, '26')
                        }
                        // isToggled={() => UserFormData.service_tags.includes(26)}
                      />
                    </View>
                  </View>
                  {!!ServiceError && (
                    <View>
                      <Text
                        style={{
                          color: Colors.orange,
                          fontSize: RFV(16),
                          padding: RFV(5),
                        }}>
                        {ServiceError}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    width: Dimensions.get('screen').width - RFV(70),
                    height: RFV(50),
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      display: 'flex',
                      fontSize: RFV(20),
                      color: '#6c6a6b',
                    }}>
                    Bank Detials (Optional)
                  </Text>
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={AccountType.value}
                    onChangeText={(t) =>
                      setAccountType({
                        ...AccountType,
                        value: t,
                      })
                    }
                    error={AccountType.error}
                    inputStyling={styles.inputField}
                    label="ACCOUNT TYPE"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={AccountType.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={AccountNumber.value}
                    onChangeText={(t) =>
                      setAccountNumber({
                        ...AccountNumber,
                        value: t,
                      })
                    }
                    error={AccountNumber.error}
                    inputStyling={styles.inputField}
                    label="ACCOUNT NUMBER"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={AccountNumber.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <CountryPicker
                    value={BankCountry.value}
                    onChangeText={(t) =>
                      setBankCountry({
                        ...BankCountry,
                        value: t.value,
                      })
                    }
                    error={BankCountry.error}
                    inputStyling={styles.inputField}
                    label="BANK COUNTRY"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={BankCountry.maxLength}
                  />
                </View>
                <View style={styles.form_row}>
                  <LabeledInput
                    value={AccountName.value}
                    onChangeText={(t) =>
                      setAccountName({
                        ...AccountName,
                        value: t,
                      })
                    }
                    error={AccountName.error}
                    inputStyling={styles.inputField}
                    label="ACCOUNT NAME"
                    labelColor="#8c8a8b"
                    inputLabelContainerStyle={{
                      marginTop: RFV(5),
                      marginBottom: RFV(3),
                    }}
                    maxLength={AccountName.maxLength}
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
                        {Loading ? <ActivityIndicator color="#fff" /> : 'NEXT'}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                {/* ///SUBMIT */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default CompanyInfo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffd9d3',
    // height: Dimensions.get('screen').height,
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
    height: RFV(2200),
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
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
  inputLabel: {
    fontSize: RFV(16),
    marginBottom: RFV(5),
    color: '#8c8a8b',
  },
  input: {
    padding: RFV(15),
    backgroundColor: '#ffd9d3',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
