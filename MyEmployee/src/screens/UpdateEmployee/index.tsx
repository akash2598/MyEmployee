import React, {FC, useState} from 'react';

import {View, StyleSheet, Button, Alert} from 'react-native';
import {API} from '../../api';
import {Input} from '../../components/Input';
import {Strings} from '../../constants/strings';
import {style} from '../../constants/style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/Stack';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
  item?: object;
}

export const UpdateEmployee: FC<IProps> = ({navigation, ...props}) => {
  const {item} = props?.route.params;

  const [state, setState] = useState({
    name: item.employee_name,
    age: item.employee_age,
    salary: item.employee_salary,
    error: true,
    errorArray: ['false', 'false', 'false'],
  });

  const updateEmployee = () => {
    const data = {
      name: state.name,
      age: state.age,
      salary: state.salary,
    };
    API.UpdateEmployee(employeeResponse, data, item.id);
  };

  const employeeResponse = {
    success: (result: any) => {
      Alert.alert('Successfull', 'Data Updated Successfully', [
        {text: 'OK', onPress: () => navigation.popToTop()},
      ]);
    },
    error: (response: any) => {
      Alert.alert('Unsuccessfull', 'Failed To Update Data', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
  };

  return (
    <View style={[style.componePadding, styles.viewContainer]}>
      <View>
        <Input
          label={Strings.EmployeeList.employeeName}
          placeholder={Strings.EmployeeList.eployeeNamePlaceholder}
          value={state.name}
          validationType="req||name"
          onChangeText={value => {
            setState(prev => ({...prev, name: value}));
          }}
          errorCallBack={value => {
            let tempArray = state.errorArray;
            tempArray[0] = value;
            setState(prev => {
              return {...prev, errorArray: tempArray};
            });
          }}
        />
        <Input
          label={Strings.EmployeeList.employeeAge}
          placeholder={Strings.EmployeeList.employeeAgePlaceholder}
          value={state.age.toString()}
          validationType="req||age"
          onChangeText={value => {
            setState(prev => ({...prev, age: value}));
          }}
          errorCallBack={value => {
            let tempArray = state.errorArray;
            tempArray[1] = value;
            setState(prev => {
              return {...prev, errorArray: tempArray};
            });
          }}
        />
        <Input
          label={Strings.EmployeeList.employeeSalary}
          placeholder={Strings.EmployeeList.employeeSalaryPlaceholder}
          value={state.salary.toString()}
          validationType="req||salary"
          onChangeText={value => {
            setState(prev => ({...prev, salary: value}));
          }}
          errorCallBack={value => {
            let tempArray = state.errorArray;
            tempArray[2] = value;
            setState(prev => {
              return {...prev, errorArray: tempArray};
            });
          }}
        />
      </View>
      <Button
        onPress={updateEmployee}
        title={Strings.button.updateEmployee}
        disabled={state.errorArray.includes('true')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
