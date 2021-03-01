import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../Store/Action/Auth';

export default logout = () => {
  const dispatch = useDispatch();
  Alert.alert('Are You Sure?', 'Want To logout', [
    {
      text: 'Logout',
      onPress: dispatch(logout()),
    },
    {
      style: 'destructive',
      text: 'No',
    },
  ]);
};
