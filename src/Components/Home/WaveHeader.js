import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
const WaveHeader = () => {
  return (
    <Svg
      style={{
        zIndex: 998,
        position: 'relative',
        top: -20,
      }}
      width="220%"
      height="260"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 190 600 300">
      <Path
        fill="#D98F84"
        d="M0,0H686V448.187s-179.561-20.752-351.061-20.752S0,448.187,0,448.187Z"></Path>
    </Svg>
  );
};

export default WaveHeader;
