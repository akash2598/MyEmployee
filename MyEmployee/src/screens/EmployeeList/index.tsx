import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {EmployeeItem} from '../../components/ListItem';
import Routes from '../../constants/routes';
import {style} from '../../constants/style';
import {RootStackParamList} from '../../navigators/Stack';
import {API} from '../../api';
import {Loader} from '../../components/Loader';
import {Colors} from '../../constants/colors';
import {heightScale, widthScale} from '../../utils/helpers/scaling';

interface IProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export type employee = {
  id: number;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  profile_image: string;
};

export const EmployeeList: FC<IProps> = ({navigation}) => {
  const [emplyees, setEmployees] = useState<employee[]>([]);

  const [isError, setError] = useState(false);

  const showDetails = (item: employee) => {
    navigation.navigate(Routes.MAIN_STACK.EMPLOYEE_DETAILS, {item});
  };

  const createEmployee = () => {
    navigation.navigate(Routes.MAIN_STACK.ADD_EMPOLYEE);
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = () => {
    setError(false);
    API.getEmployee(employeeResponse);
  };

  const employeeResponse = {
    success: (result: any) => {
      setEmployees(result);
    },
    error: (response: any) => {
      setError(true);
      Alert.alert('Unsuccessfull', response.message, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
  };

  const renderEmployees = ({item}) => {
    return (
      <EmployeeItem
        name={item.employee_name}
        age={item.employee_age}
        salary={item.employee_salary}
        image={item.profile_image}
        onPress={() => {
          showDetails(item);
        }}
      />
    );
  };

  const ListEmpty = () =>
    isError ? (
      <Button onPress={getEmployeeList} title="Retry" />
    ) : (
      <Loader color={Colors.Blue} />
    );

  return (
    <View style={[styles.viewContainer, style.componePadding]}>
      <FlatList
        data={emplyees}
        renderItem={renderEmployees}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={ListEmpty}
      />
      <TouchableOpacity style={styles.button} onPress={createEmployee}>
        <Text style={styles.textStyle}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  button: {
    height: heightScale(70),
    width: heightScale(70),
    borderRadius: heightScale(35),
    backgroundColor: Colors.Grey_2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: heightScale(10),
    right: widthScale(20),
  },
  textStyle: {
    fontSize: 25,
    color: Colors.White,
  },
});
