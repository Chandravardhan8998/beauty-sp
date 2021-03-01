import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFV} from '../../../Constants/utility';
import {Colors} from '../../../Constants/Colors';
import {useDispatch} from 'react-redux';
import Services from '../../../Constants/Services.json';
import {removeStaff} from '../../../Backend/ManageStaff';
import {DELETE_STAFF_SUCCESS} from '../../../Store/Action';
import Toast from 'react-native-simple-toast';
const StaffCard = ({navigation, item, onDelete = () => {}}) => {
  const [Service, setService] = useState('');
  useEffect(() => {
    if (!!item && !!Services && !!Services.data.length) {
      const selectedService = Services.data.filter(
        (s) => s.id === +item.service,
      );
      if (
        !!selectedService &&
        !!selectedService.length &&
        !!selectedService[0].code
      ) {
        setService(selectedService[0].code);
      } else {
        setService('');
        // getServiceName();
      }
    }
  }, [item, Services]);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  return (
    <View
      style={{
        ...styles.bgCard,
        marginTop: 20,
        flex: 1,
        borderRadius: 15,
        elevation: 1,
        // backgroundColor: '#000',
      }}>
      <View
        style={{
          flex: 1,
          borderRadius: 7,
          margin: 15,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 5,
            borderBottomWidth: 0.5,
            borderColor: '#B8B8B8',
          }}>
          <View>
            <Text style={{fontSize: 17, fontWeight: 'bold', margin: 5}}>
              {item.name}
            </Text>
            <Text>{item.phone_number}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('editStaffDetailsForm', {item})
              }>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: RFV(22),
                  height: RFV(22),
                }}
                source={require('../../../../Assets/Images/Home/edit.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                removeStaff(item.id)
                  .then((res) => {
                    const {msg, status, data} = res;
                    if (status === 'error') {
                      Toast.show(msg, Toast.LONG);
                      setLoading(false);
                      return;
                    }
                    setLoading(false);
                    dispatch({
                      type: DELETE_STAFF_SUCCESS,
                      deletedStaffID: item.id,
                    });
                    onDelete(item.id);
                    return;
                  })
                  .catch((err) => {
                    Toast.show('Try Again', Toast.LONG);
                    setLoading(false);
                    return;
                  });
                // dispatch(deleteStaff(item.id));
              }}>
              {Loading ? (
                <ActivityIndicator
                  style={{margin: RFV(5)}}
                  color={Colors.pink}
                />
              ) : (
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{
                    width: RFV(22),
                    height: RFV(22),
                    marginLeft: 15,
                  }}
                  source={require('../../../../Assets/Images/Home/delete.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{justifyContent: 'center', paddingTop: 10, paddingBottom: 10}}>
          <Text>
            <Text style={{color: '#B8B8B8'}}>Email :</Text> {item.email}
          </Text>

          <Text
            style={{
              textTransform: 'capitalize',
            }}>
            <Text style={{color: '#B8B8B8'}}>Appointment :</Text>{' '}
            {item.appointment}
          </Text>

          <Text>
            <Text style={{color: '#B8B8B8'}}>Service Type :</Text>
            {/* {serviceString(item.service)} */}
            {Service}
          </Text>

          <Text>
            <Text style={{color: '#B8B8B8'}}>Status :</Text>{' '}
            {item.is_active === 1 ? 'Active' : 'Not Active'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StaffCard;

const styles = StyleSheet.create({
  bgCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'space-between',
  },
});
