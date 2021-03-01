import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StaffCard from '../../../Components/Home/ManageStaff/StaffCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStaff} from '../../../Store/Action/Staff';

const StaffDetails = (props) => {
  const [staffs, setStaffs] = useState([]);
  const [LoadingStaff, setLoadingStaff] = useState(true);
  const dispatch = useDispatch();
  const {loading, staff} = useSelector((state) => state.staff);
  useEffect(() => {
    setLoadingStaff(loading);
  }, [loading]);
  useEffect(() => {
    setStaffs(staff);
  }, [staff]);
  useEffect(() => {
    dispatch(fetchStaff());
  }, []);
  return (
    <ScrollView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.cardBg,
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
              Staff Details
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              borderRadius: 10,
              marginRight: 20,
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('staffDetailsForm')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                padding: 8,
                backgroundColor: '#d98f84',
              }}>
              <Text style={{textAlign: 'center', color: '#FFF'}}>
                Add New Staff
              </Text>
            </TouchableOpacity>
          </View>
          {LoadingStaff ? (
            <ActivityIndicator size="large" color={Colors.pink} />
          ) : !!staffs.length ? (
            <FlatList
              data={staffs}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <StaffCard
                  item={item}
                  navigation={props.navigation}
                  onDelete={(id) => {
                    console.log('updating deleted');
                    let deleteStaff = staffs.filter((s) => s.id !== id);
                    console.log('updating deleted', deleteStaff);
                    setStaffs(deleteStaff);
                  }}
                  // onDelete={(id) => {
                  //   console.log(id);
                  // }}
                />
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          ) : (
            <View
              style={{
                padding: RFV(20),
                justifyContent: 'center',
                alignItems: 'center',
                // flex: 1,
              }}>
              <Text
                style={{
                  fontSize: RFV(20),
                  color: Colors.pink,
                }}>
                Welcome, Add Your Staff.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffDetails;
