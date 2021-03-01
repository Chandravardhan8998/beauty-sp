import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LabeledInput from '../../../Components/Common UI/LabeledInput';
import {Colors} from '../../../Constants/Colors';
import {RFV, shortStr} from '../../../Constants/utility';
import {
  isInValidEmailInEdit,
  isInValidPhoneInEdit,
  isInValidValueInEdit,
} from '../../../Constants/Validation';
import SuggestInput from '../Varification/SuggestInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  editUserData,
  resetMessages,
  uploadImage,
} from '../../../Store/Action/User';
import CountryPicker from '../Varification/CountryPicker';
import CheckBox from '@react-native-community/checkbox';
import SimpleToast from 'react-native-simple-toast';
const CheckBoxInput = ({label, onValueChange, isToggled = false}) => {
  const [toggleBox, setToggleBox] = useState(isToggled);
  useEffect(() => {
    setToggleBox(isToggled);
  }, [isToggled]);
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
          flex: 1,
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
const EditUserForm = () => {
  const [UserFormData, setUserFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    image: 'http://beautyappadmin.stage02.obdemo.com/img/no-image.jpg',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    bio: '',
    current_latitude: 0,
    current_longitude: 0,
    facebook: '',
    instagram: '',
    youtube: '',
    linkdin: '',
    expertise: '',
    education: '',
    service_tags: [],
  });
  const [FormError, setFormError] = useState({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    emailError: '',
    addressError: '',
    cityError: '',
    countryError: '',
    stateError: '',
    zipcodeError: '',
    bioError: '',
    expertiseError: '',
    educationError: '',
    fbError: '',
    instaError: '',
    youtubeError: '',
    linkdinError: '',
  });
  const dispatch = useDispatch();
  const [ShowImageUploadButton, setShowImageUploadButton] = useState(false);
  const {userData, loading} = useSelector((state) => state.auth);
  const [ImageData, setImageData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [LoadingImage, setLoadingImage] = useState(false);
  useEffect(() => {
    if (!!userData.service_tags.length) {
      setUserFormData({
        ...userData,
        service_tags: userData.service_tags.map((s) => s.tag_id.toString()),
      });
      console.log(userData.service_tags.map((s) => s.tag_id.toString()));
    } else {
      setUserFormData(userData);
    }
  }, [userData]);
  console.log('LOADING', Loading);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  useEffect(() => {
    dispatch(resetMessages());
  }, []);
  const resetForm = () => {
    setFormError({
      firstNameError: '',
      lastNameError: '',
      phoneError: '',
      emailError: '',
      addressError: '',
      cityError: '',
      countryError: '',
      stateError: '',
      zipcodeError: '',
    });
  };
  const onSelectCate = (value, select, code) => {
    let categoryArray = [...UserFormData.service_tags];
    if (select) {
      categoryArray.push(code);
    } else {
      categoryArray = categoryArray.filter((c) => c !== code);
    }
    setUserFormData({...UserFormData, service_tags: categoryArray});
  };

  console.log(Loading);
  const onSubmitHandler = () => {
    setLoading(true);
    Keyboard.dismiss();
    if (!UserFormData.current_latitude && !UserFormData.current_longitude) {
      //TODO Lat long verification an changing
      setLoading(false);
      return SimpleToast.show('Address is Not correctly Setup.', 4000);
    }
    if (
      !isInValidValueInEdit(UserFormData.first_name) &&
      !isInValidValueInEdit(UserFormData.last_name) &&
      !isInValidPhoneInEdit(UserFormData.phone_number) &&
      !isInValidEmailInEdit(UserFormData.email) &&
      !isInValidValueInEdit(UserFormData.address) &&
      !isInValidValueInEdit(UserFormData.city) &&
      !isInValidValueInEdit(UserFormData.country) &&
      !isInValidValueInEdit(UserFormData.state) &&
      !isInValidValueInEdit(UserFormData.zip_code) &&
      UserFormData.zip_code.value !== 0 &&
      UserFormData.country.value !== 0 &&
      !isInValidValueInEdit(UserFormData.bio) &&
      !isInValidValueInEdit(UserFormData.expertise) &&
      !isInValidValueInEdit(UserFormData.education) &&
      !isInValidValueInEdit(UserFormData.instagram) &&
      !isInValidValueInEdit(UserFormData.facebook) &&
      !isInValidValueInEdit(UserFormData.linkdin) &&
      !isInValidValueInEdit(UserFormData.youtube)
    ) {
      if (!UserFormData.service_tags.length) {
        setLoading(false);
        return SimpleToast.show('Service Tags Required', 2000);
      }
      dispatch(
        editUserData({
          ...UserFormData,
          linkdin_url: UserFormData.linkdin,
          facebook_url: UserFormData.facebook,
          instagram_url: UserFormData.instagram,
          youtube_url: UserFormData.youtube,
          service_tags: JSON.stringify(UserFormData.service_tags),
        }),
      );
      resetForm();
    } else {
      setFormError({
        firstNameError: isInValidValueInEdit(UserFormData.first_name),
        lastNameError: isInValidValueInEdit(UserFormData.last_name),
        phoneError: isInValidPhoneInEdit(UserFormData.phone_number),
        emailError: isInValidEmailInEdit(UserFormData.email),
        addressError: isInValidValueInEdit(UserFormData.address),
        countryError: isInValidValueInEdit(UserFormData.country),
        cityError: isInValidValueInEdit(UserFormData.city),
        stateError: isInValidValueInEdit(UserFormData.state),
        zipcodeError: isInValidValueInEdit(UserFormData.zip_code),
        bioError: isInValidValueInEdit(UserFormData.bio),
        educationError: isInValidValueInEdit(UserFormData.education),
        expertiseError: isInValidValueInEdit(UserFormData.expertise),
        fbError: isInValidValueInEdit(UserFormData.facebook),
        instaError: isInValidValueInEdit(UserFormData.instagram),
        linkdinError: isInValidValueInEdit(UserFormData.linkdin),
        youtubeError: isInValidValueInEdit(UserFormData.youtube),
      });
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: RFV(100),
            height: RFV(100),
            borderRadius: RFV(50),
            overflow: 'hidden',
          }}>
          <TouchableNativeFeedback
            onPress={() => {
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  maxHeight: 500,
                  maxWidth: 500,
                  includeBase64: true,
                },
                ({uri, didCancel, fileName, type}) => {
                  setLoadingImage(true);
                  if (!didCancel) {
                    dispatch(resetMessages());
                    setUserFormData({...UserFormData, image: uri});
                    setShowImageUploadButton(true);
                    const formdata = new FormData();
                    formdata.append('image', {uri, name: fileName, type});
                    setImageData(formdata);
                    setLoadingImage(false);
                    return;
                  }
                  setLoadingImage(false);
                },
              );
            }}>
            <Image
              // loadingIndicatorSource={}
              source={{uri: UserFormData.image}}
              style={{
                width: RFV(100),
                height: RFV(100),
                backgroundColor: Colors.pink,
              }}
            />
          </TouchableNativeFeedback>
        </View>
        {LoadingImage && (
          <View style={styles.form_row}>
            <ActivityIndicator color={Colors.pink} size="small" />
          </View>
        )}
        {ShowImageUploadButton ? (
          <View style={styles.form_row}>
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(uploadImage(ImageData));
              }}>
              <View
                style={{
                  // flex: 0.5,
                  height: RFV(40),
                  width: RFV(120),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.orange,
                  alignSelf: 'flex-start',
                  margin: RFV(5),
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  {Loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    'Upload Image'
                  )}
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setUserFormData({...UserFormData, image: userData.image});
                // setUserImage(userData.image);
                setShowImageUploadButton(false);
                dispatch(resetMessages());
              }}>
              <View
                style={{
                  // flex: 0.5,
                  height: RFV(40),
                  width: RFV(120),
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  margin: RFV(5),
                  borderColor: Colors.orange,
                  borderWidth: RFV(2),
                }}>
                <Text
                  style={{
                    color: Colors.orange,
                  }}>
                  Close
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : (
          <View style={{marginVertical: RFV(5)}}>
            <Text>Upload Image</Text>
          </View>
        )}
      </View>
      <View>
        {!UserFormData.current_longitude && !UserFormData.current_latitude && (
          <ActivityIndicator color={Colors.pink} size="large" />
        )}
      </View>
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
            value={UserFormData.first_name}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, first_name: t})
            }
            error={FormError.firstNameError}
            inputStyling={styles.input}
            label="FIRST NAME"
            labelColor="#aaa"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            textContentType="name"
          />
          <LabeledInput
            value={UserFormData.last_name}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, last_name: t})
            }
            error={FormError.lastNameError}
            inputStyling={styles.input}
            label="LAST NAME"
            labelColor="#aaa"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            textContentType="name"
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.phone_number}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, phone_number: t})
            }
            error={FormError.phoneError}
            inputStyling={styles.input}
            label="PHONE"
            labelColor="#aaa"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.email}
            onChangeText={(t) => setUserFormData({...UserFormData, email: t})}
            error={FormError.emailError}
            inputStyling={styles.input}
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            label="EMAIL"
            labelColor="#aaa"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.form_row}>
          <SuggestInput
            onChangeText={(t, geo, pin) => {
              if (parseInt(pin.long_name) >= 0) {
                setUserFormData({
                  ...UserFormData,
                  zip_code: pin.long_name,
                  address: t,
                  current_latitude: geo.lat,
                  current_longitude: geo.lng,
                });
              } else {
                setUserFormData({
                  ...UserFormData,
                  zip_code: '',
                  address: t,
                  current_latitude: geo.lat,
                  current_longitude: geo.lng,
                });
              }
            }}
            placeholder={UserFormData.address}
            error={FormError.addressError}
            label="ADDRESS"
            labelColor="#8c8a8b"
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.city}
            onChangeText={(t) => setUserFormData({...UserFormData, city: t})}
            error={FormError.cityError}
            inputStyling={styles.input}
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            label="CITY"
            labelColor="#aaa"
          />
        </View>
        <View style={styles.form_row}>
          <CountryPicker
            value={UserFormData.country}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, country: t.id})
            }
            error={FormError.countryError}
            inputStyling={styles.inputField}
            label="COUNTRY"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            textContentType="countryName"
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.state}
            onChangeText={(t) => setUserFormData({...UserFormData, state: t})}
            error={FormError.stateError}
            inputStyling={styles.input}
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            label="STATE"
            labelColor="#aaa"
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.zip_code}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, zip_code: t})
            }
            error={FormError.zipcodeError}
            inputStyling={styles.input}
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
            label="POSTAL CODE"
            labelColor="#aaa"
          />
        </View>
        <View
          style={{
            ...styles.form_row,
            marginTop: RFV(30),
            marginBottom: RFV(30),
          }}>
          <LabeledInput
            value={UserFormData.bio}
            onChangeText={(t) => setUserFormData({...UserFormData, bio: t})}
            multiline={true}
            error={FormError.bioError}
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
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.expertise}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, expertise: t})
            }
            error={FormError.expertiseError}
            inputStyling={styles.inputField}
            label="EXPERTISE"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.facebook}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, facebook: t})
            }
            error={FormError.fbError}
            inputStyling={styles.inputField}
            label="FACEBOOK URL"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.instagram}
            onChangeText={(t) =>
              setUserFormData({...UserFormData, instagram: t})
            }
            error={FormError.instaError}
            inputStyling={styles.inputField}
            label="INSTAGRAM URL"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.linkdin}
            onChangeText={(t) => setUserFormData({...UserFormData, linkdin: t})}
            error={FormError.linkdinError}
            inputStyling={styles.inputField}
            label="LINKEDIN URL"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
          />
        </View>
        <View style={styles.form_row}>
          <LabeledInput
            value={UserFormData.youtube}
            onChangeText={(t) => setUserFormData({...UserFormData, youtube: t})}
            error={FormError.youtubeError}
            inputStyling={styles.inputField}
            label="YOUTUBE URL"
            labelColor="#8c8a8b"
            inputLabelContainerStyle={{
              marginTop: RFV(5),
              marginBottom: RFV(3),
            }}
          />
        </View>
        <View
          style={{
            // backgroundColor: '#f00',
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
              padding: RFV(15),
              backgroundColor: '#ffd9d3',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: RFV(12),
              height: RFV(160),
              flexDirection: 'column',
              // backgroundColor: '#f90',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 1,
                // justifyContent:""
              }}>
              <CheckBoxInput
                label="Blowouts"
                onValueChange={(value) => onSelectCate('Blowouts', value, '22')}
                isToggled={() => UserFormData.service_tags.includes('22')}
              />
              <CheckBoxInput
                label="Fashion"
                onValueChange={(value) => onSelectCate('Fashion', value, '25')}
                isToggled={() => UserFormData.service_tags.includes('25')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 1,
                // justifyContent:""
              }}>
              <CheckBoxInput
                label="Haircuts"
                onValueChange={(value) => onSelectCate('Haircuts', value, '21')}
                isToggled={() => UserFormData.service_tags.includes('21')}
              />
              <CheckBoxInput
                label="Photographic/Film"
                onValueChange={(value) =>
                  onSelectCate('Photographic/Film', value, '24')
                }
                isToggled={() => UserFormData.service_tags.includes('24')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 1,
                // justifyContent:""
              }}>
              <CheckBoxInput
                label="Med Spa / Skin Services"
                onValueChange={(value) =>
                  onSelectCate('Med Spa / Skin Services', value, '27')
                }
                isToggled={() => UserFormData.service_tags.includes('27')}
              />
              <CheckBoxInput
                label="Prom"
                onValueChange={(value) => onSelectCate('Prom', value, '23')}
                isToggled={() => UserFormData.service_tags.includes('23')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 1,
                // justifyContent:""
              }}>
              <CheckBoxInput
                label="Wedding"
                onValueChange={(value) => onSelectCate('Wedding', value, '26')}
                isToggled={() => UserFormData.service_tags.includes('26')}
              />
            </View>
          </View>
        </View>
        {/* SUBMIT */}
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
    </React.Fragment>
  );
};

export default EditUserForm;

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
  inputField: {
    backgroundColor: '#ffd9d4',
    color: '#444',
    marginBottom: RFV(0),
    height: RFV(50),
    marginHorizontal: RFV(10),
    paddingLeft: 8,
    fontSize: RFV(14),
  },
});
