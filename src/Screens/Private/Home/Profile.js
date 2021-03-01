import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import WaveHeader from '../../../Components/Home/WaveHeader';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 80;
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import {logout} from '../../../Store/Action/Auth';
const userInfo = ({text, image}) => {
  return (
    <View style={styles.userInfo}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={image}
          style={{
            height: 15,
            width: 15,
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flex: 4,
        }}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const userDetailsCard = () => {
  const {userData} = useSelector((state) => state.auth);
  const [UserData, setUserData] = useState({});
  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  const today = new Date().getFullYear();
  const dob =
    !!userData &&
    !!userData.dob &&
    today - parseInt(userData.dob.substring(0, 4));
  return (
    <View
      style={{
        ...styles.bgCard,
        paddingVertical: RFV(10),
        flex: 1,
        alignItems: 'center',
        marginVertical: RFV(10),
      }}>
      <WaveHeader />
      <Text
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: 60,
          fontSize: RFV(28),
          color: '#fff',
          zIndex: 999,
        }}>
        My Profile
      </Text>
      <Image
        source={{
          uri:
            UserData.image ||
            'http://beautyappadmin.stage02.obdemo.com/img/user.png',
        }}
        style={{
          width: RFV(160),
          height: RFV(160),
          position: 'absolute',
          top: 120,
          zIndex: 1000,
          borderRadius: RFV(160),
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={
            styles.username
          }>{`${UserData.first_name} ${UserData.last_name} `}</Text>
        <Text style={styles.subDetail}>{dob}, (Individual)</Text>
        <View style={styles.infoRows}>
          {userInfo({
            text: UserData.email,
            image: require('../../../../Assets/Images/UserProfile/envelope(48).png'),
          })}
          {userInfo({
            text: UserData.phone_number,
            image: require('../../../../Assets/Images/UserProfile/phone(48).png'),
          })}
        </View>
        <View style={styles.infoRows}>
          {userInfo({
            text: UserData.address,
            image: require('../../../../Assets/Images/UserProfile/location(48).png'),
          })}
          {userInfo({
            text: `Member Since ${moment(UserData.createdAt).format('Do MMM')}`,
            image: require('../../../../Assets/Images/UserProfile/clock(48).png'),
          })}
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};
const UserActionList = ({image, text, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          // flex: 1,
          justifyContent: 'flex-start',
          // backgroundColor: '#ffa',
          paddingVertical: RFV(5),
          paddingHorizontal: RFV(20),
          marginVertical: RFV(5),
          height: RFV(45),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={image}
            style={{
              width: RFV(23),
              height: RFV(23),
            }}
            on
          />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: RFV(22),
              color: '#000',
            }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const userActionsCard = (navigation) => {
  const {loading} = useSelector((state) => state.auth);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const dispatch = useDispatch();
  return (
    <View
      style={{
        ...styles.bgCard,
        marginTop: 0,
        flex: 3,
        paddingVertical: RFV(16),
        // backgroundColor: '#000',
      }}>
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Edit Profile"
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/password(72).png')}
        text="Change Password"
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Account Details"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/payment-methods(72).png')}
        text="Payment Methods"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/post-job-2x.png')}
        text="Post a Job"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/my-experts(96).png')}
        text="Appointments"
        onPress={() => {
          console.log('handle me');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Bank Details"
        onPress={() => {
          navigation.navigate('bankDetails');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Manage Categories"
        onPress={() => {
          navigation.navigate('manageCategories');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Membership Plans"
        onPress={() => {
          navigation.navigate('membershipPlans');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text="Staff Details"
        onPress={() => {
          navigation.navigate('staffDetails');
        }}
      />
      <UserActionList
        image={require('../../../../Assets/Images/UserProfile/edit-profile(72).png')}
        text={Loading ? <ActivityIndicator color="#000" /> : 'Log Out'}
        onPress={() => {
          Alert.alert('Are You Sure?', 'Want To logout?', [
            {
              text: 'Logout!',
              onPress: () => {
                dispatch(logout());
              },
            },
            {
              style: 'destructive',
              text: 'No',
            },
          ]);
        }}
      />
    </View>
    // </View>
  );
};
const Profile = (props) => {
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
          backgroundColor="#D98F84"
          barStyle="light-content"
          translucent={true}
        />
        <View
          style={{
            flex: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {userDetailsCard()}
          {userActionsCard(props.navigation)}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  navTitleView: {
    flexDirection: 'row',
    height: MIN_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    // opacity: 0,
    paddingHorizontal: RFV(20),
    backgroundColor: '#D98F84',
  },
  navTitle: {
    color: 'white',
    fontSize: RFV(24),
    backgroundColor: 'transparent',
  },
  bgCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 20,
    // marginVertical: RFV(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 40,
  },
  username: {
    fontSize: RFV(28),
    paddingBottom: RFV(8),
  },
  subDetail: {
    fontSize: RFV(14),
    padding: RFV(5),
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    fontSize: RFV(12),
    paddingVertical: RFV(5),
  },
});
