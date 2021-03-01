import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import MainNavigation from './Navigation/MainNavigation';
import AppTour from './Screens/AppTour';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import ReduxThink from 'redux-thunk';
import authReducer from './Store/Reducer/Auth';
import bankReducer from './Store/Reducer/Bank';
import staffReducer from './Store/Reducer/Staff';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const date=new Date.now()

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
  bank: bankReducer,
  staff: staffReducer,
});

// const composeEnhancers =
//   process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(ReduxThink)),
  applyMiddleware(ReduxThink),
);
const App = () => {
  useEffect(() => {
    async function loadTourStatus() {
      const tour = await AsyncStorage.getItem('tour');
      setTourDone(!!tour);
      SplashScreen.hide();
    }
    loadTourStatus();
  }, []);

  const tourDoneHandler = () => {
    setTourDone(true);
    AsyncStorage.setItem('tour', '1');
  };
  const [tourDone, setTourDone] = useState(true);
  let MainContent = <AppTour onFinish={tourDoneHandler} />;
  if (tourDone) {
    MainContent = <MainNavigation />;
  }
  return <Provider store={store}>{MainContent}</Provider>;
};

export default App;
