import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Colors} from '../../../Constants/Colors';
import {RFV} from '../../../Constants/utility';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          justifyContent: 'center',
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
            }}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const PersonalInfoForm = (props) => {
  //NOTE Date picker content
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [date, setDate] = useState(new Date(timeStamp));
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  //NOTE Gender picker content
  const data = [
    {
      label: 'male',
    },
    {
      label: 'female',
    },
  ];
  const [InitialRadioValue, setInitialRadioValue] = useState(1);
  const [Gender, setGender] = useState('male');
  //NOTE Cate Selector
  // useEffect(() => {
  //   const fun = async () => {
  //     const data = await AsyncStorage.getItem('userData');
  //     console.log(JSON.parse(data));
  //   };
  //   fun();
  // }, []);
  const [Category, setCategory] = useState([]);
  const onChange = (event, selectedDate) => {
    const newTimestamp = event.nativeEvent.timestamp;
    setTimeStamp(newTimestamp || timeStamp);
    // setShow(Platform.OS === 'ios');
    console.log(newTimestamp);
    setShow(false);
  };

  const onSelectCate = (value, select) => {
    let categoryArray = [...Category];
    if (select) {
      categoryArray.push(value);
    } else {
      categoryArray = categoryArray.filter((c) => c !== value);
    }
    setCategory(categoryArray);
    console.log(categoryArray);
  };
  const onSubmit = () => {
    setLoading(true);
    if (!!Category.length && !!timeStamp) {
      const data = {
        categories: JSON.stringify(Category),
        gender: Gender,
        dob: moment(timeStamp).format('YYYY-MM-DD'),
      };
      console.log(data);
      //validation for DOB
      props.navigation.navigate('CompanyInfo');
      AsyncStorage.setItem('personalinfo', JSON.stringify(data)).then((res) => {
        console.log(res);
      });
      console.log(JSON.stringify(data));
      setLoading(false);
    } else {
      Toast.show('Fill Complete Form!!', 1000);
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{height: Dimensions.get('screen').height}}
      contentInsetAdjustmentBehavior="automatic">
      <StatusBar backgroundColor={'#ffd9d3'} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title}>Personal Info</Text>
        </View>
        <View style={styles.form_container}>
          <View style={styles.form}>
            <View style={styles.form_row}>
              <Text style={styles.inputLabel}>DOB</Text>
              <TouchableNativeFeedback onPress={() => setShow(true)}>
                <View style={styles.input}>
                  <Text style={styles.inputText}>
                    {!!timeStamp
                      ? moment(timeStamp).format('DD/MM/YYYY')
                      : 'DD/MM/YYYY'}
                  </Text>
                  <MIcon
                    name="calendar-today"
                    size={RFV(20)}
                    style={{
                      margin: 0,
                      padding: 0,
                      marginHorizontal: RFV(10),
                    }}
                    color="#8c8a8b"
                  />
                </View>
              </TouchableNativeFeedback>
              {show && (
                <DateTimePicker
                  // testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="calendar"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.form_row}>
              <Text style={styles.inputLabel}>GENDER</Text>
              <View style={{...styles.input, padding: RFV(4)}}>
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
                    setGender(e.label);
                    console.log(e.label);
                  }}
                />
              </View>
            </View>
            <View style={styles.form_row}>
              <Text style={styles.inputLabel}>
                Select categories you would like to receive inquiries for?
              </Text>
              <View style={{...styles.input, padding: RFV(12)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flex: 1,
                    // justifyContent:""
                  }}>
                  {[
                    {label: 'Beauty', id: '28'},
                    {label: 'Salon', id: '30'},
                    {label: 'Spa', id: '29'},
                  ].map(({id, label}) => (
                    <CheckBoxInput
                      key={id}
                      label={label}
                      onValueChange={(value) => onSelectCate(id, value)}
                    />
                  ))}
                  {/* <CheckBoxInput
                    label="Beauty"
                    onValueChange={(value) => onSelectCate('28', value)}
                  />
                  <CheckBoxInput
                    label="Spa"
                    onValueChange={(value) => onSelectCate('29', value)}
                  />
                  <CheckBoxInput
                    label="Salon"
                    onValueChange={(value) => onSelectCate('30', value)}
                  /> */}
                </View>
              </View>
            </View>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: Dimensions.get('screen').width - RFV(60),
              }}>
              <TouchableNativeFeedback onPress={onSubmit}>
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInfoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ffd9d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_container: {
    height: RFV(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: RFV(15),
    width: Dimensions.get('screen').width - RFV(30),
  },
  title: {fontSize: RFV(30), color: Colors.orange},
  form_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  form: {
    backgroundColor: '#fff',
    flex: 0.8,
    marginHorizontal: RFV(15),
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFV(10),
  },
  form_row: {
    width: Dimensions.get('screen').width - RFV(50),
    marginVertical: RFV(2),
    padding: RFV(5),
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
  inputText: {
    color: '#8c8a8b',
    fontSize: RFV(20),
  },
  submitButton: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFV(8),
    marginVertical: RFV(5),
    backgroundColor: Colors.orange,
  },
});
