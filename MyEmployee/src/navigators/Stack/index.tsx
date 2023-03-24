import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import routes from '../../constants/routes';
import {AddEmployee} from '../../screens/AddEmployee';
import {EmployeeList} from '../../screens/EmployeeList';
import {UpdateEmployee} from '../../screens/UpdateEmployee';
import {EmployeeDetails} from '../../screens/EmployeeDetails';

export type RootStackParamList = {
  [key: string]: any;
};

const Stack = createStackNavigator<RootStackParamList>();
export default () => (
  <Stack.Navigator initialRouteName={routes.MAIN_STACK.EMPLOYEE_LIST}>
    <Stack.Screen
      name={routes.MAIN_STACK.EMPLOYEE_LIST}
      component={EmployeeList}
    />

    <Stack.Screen
      name={routes.MAIN_STACK.ADD_EMPOLYEE}
      component={AddEmployee}
    />

    <Stack.Screen
      name={routes.MAIN_STACK.UPDATE_EMPLOYEE}
      component={UpdateEmployee}
    />
    <Stack.Screen
      name={routes.MAIN_STACK.EMPLOYEE_DETAILS}
      component={EmployeeDetails}
    />
  </Stack.Navigator>
);
