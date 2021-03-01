import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenticateUser} from '../Store/Action/Auth';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../Constants/Colors';

const MainNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthenticateUser());
  }, []);
  const {auth, userData} = useSelector((state) => state.auth);
  const {is_approved} = userData;
  const [isAuth, setIsAuth] = useState(auth);
  const [isApproved, setIsApproved] = useState(2);
  useEffect(() => {
    setIsAuth(auth);
    setIsApproved(is_approved);
  }, [auth, is_approved]);
  if (auth && isApproved === undefined) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.pink,
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  let MainNav;
  if (isAuth) {
    if (isApproved === 0) {
      MainNav = require('./StackNavigation').ApprovalStack();
    } else if (isApproved === 1) {
      MainNav = require('./StackNavigation').PendingStack();
    } else if (isApproved === 2) {
      MainNav = require('./TabNavigation').MainTabNavigation();
    } else if (isApproved === 3) {
      MainNav = require('./StackNavigation').FailedApprovalStack();
    }
  } else {
    MainNav = !auth && require('./StackNavigation').AuthStack();
  }
  return <NavigationContainer>{MainNav}</NavigationContainer>;
};

export default MainNavigation;
