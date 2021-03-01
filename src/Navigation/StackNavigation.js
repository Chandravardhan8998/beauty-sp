import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../Constants/Colors';
const {Navigator, Screen} = createStackNavigator();
export const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        name="Login"
        getComponent={() => require('../Screens/Public/Login').default}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="Plans"
        getComponent={() => require('../Screens/Public/Plans').default}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="Signup"
        getComponent={() => require('../Screens/Public/Signup').default}
        options={() => ({
          headerShown: false,
        })}
      />
      <Screen
        name="ForgetPassword"
        getComponent={() => require('../Screens/Public/ForgetPass').default}
        options={() => ({
          headerShown: false,
          animationEnabled: false,
        })}
      />
    </Navigator>
  );
};
export const HomeStack = () => {
  return (
    <Navigator headerMode="screen">
      <Screen
        name="Home"
        options={({navigation}) => ({
          headerShown: false,
        })}
        getComponent={() => require('../Screens/Private/Home/Home').default}
      />
      <Screen
        name="Profile"
        getComponent={() => require('../Screens/Private/Home/Profile').default}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#000',
        }}
      />
      <Screen
        name="EditProfile"
        getComponent={() =>
          require('../Screens/Private/Home/EditProfile').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#D98F84',
        }}
      />
      <Screen
        name="ChangePassword"
        getComponent={() =>
          require('../Screens/Private/Home/ChangePassword').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#D98F84',
        }}
      />
      <Screen
        name="bankDetails"
        getComponent={() =>
          require('../Screens/Private/Home/bankDetails').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
      <Screen
        name="manageCategories"
        getComponent={() =>
          require('../Screens/Private/Home/manageCategories').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
      <Screen
        name="membershipPlans"
        getComponent={() =>
          require('../Screens/Private/Home/membershipPlans').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
      <Screen
        name="staffDetails"
        getComponent={() =>
          require('../Screens/Private/Home/staffDetails').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
      <Screen
        name="staffDetailsForm"
        getComponent={() =>
          require('../Screens/Private/Home/staffDetailsForm').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
      <Screen
        name="editStaffDetailsForm"
        getComponent={() =>
          require('../Screens/Private/Home/EditStaff').default
        }
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.pink,
        }}
      />
    </Navigator>
  );
};
export const ApprovalStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen
        name="PersonalInformation"
        getComponent={() =>
          require('../Screens/Private/Varification/PersonalInfoForm').default
        }
      />
      <Screen
        name="CompanyInfo"
        getComponent={() =>
          require('../Screens/Private/Varification/CompanyInfo').default
        }
      />
      <Screen
        name="IDVerificationForm"
        getComponent={() =>
          require('../Screens/Private/Varification/IDVerificationForm').default
        }
      />
    </Navigator>
  );
};
export const PendingStack = () => {
  return (
    <Navigator>
      <Screen
        options={{
          detachPreviousScreen: true,
          headerShown: false,
        }}
        name="PendingApproval"
        getComponent={() =>
          require('../Screens/Private/Varification/PendingApproval').default
        }
      />
    </Navigator>
  );
};
export const FailedApprovalStack = () => {
  return (
    <Navigator>
      <Screen
        options={{
          detachPreviousScreen: true,
          headerShown: false,
        }}
        name="RejectApproval"
        getComponent={() =>
          require('../Screens/Private/Varification/FailedApproval').default
        }
      />
    </Navigator>
  );
};
