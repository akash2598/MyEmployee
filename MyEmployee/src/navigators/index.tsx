//THis consider as root navigator
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import EmployeeStack from '../navigators/Stack';

export default () => (
  <NavigationContainer>
    <EmployeeStack />
  </NavigationContainer>
);
