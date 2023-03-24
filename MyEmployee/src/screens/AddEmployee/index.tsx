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
}

export const AddEmployee: FC<IProps> = ({navigation}) => {
  const [state, setState] = useState({
    emplyeeName: '',
    age: '',
    salary: '',
    error: true,
    errorArray: ['true', 'true', 'true'],
  });

  const createEmployee = () => {
    const data = {
      name: state.emplyeeName,
      age: state.age,
      salary: state.salary,
    };
    API.AddEmployee(employeeResponse, data);
  };

  const employeeResponse = {
    success: (result: any) => {
      Alert.alert('Successfull', 'Employee Created Successfully', [
        {text: 'OK', onPress: () => navigation.popToTop()},
      ]);
    },
    error: (response: any) => {
      Alert.alert(
        'Unsuccessfull',
        `Failed To Create Employee - ${response.message}`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    },
  };

  return (
    <View style={[style.componePadding, styles.viewContainer]}>
      <View>
        <Input
          label={Strings.EmployeeList.employeeName}
          placeholder={Strings.EmployeeList.eployeeNamePlaceholder}
          value={state.emplyeeName}
          validationType="req||name"
          onChangeText={value => {
            setState(prev => ({...prev, emplyeeName: value}));
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
          value={state.age}
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
          value={state.salary}
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
        onPress={createEmployee}
        title={Strings.button.addEmployee}
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
