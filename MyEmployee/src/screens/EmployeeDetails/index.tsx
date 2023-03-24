import React, {FC} from 'react';

import {View, StyleSheet, Image, Text, Button} from 'react-native';
import Images from '../../assets/images';
import Routes from '../../constants/routes';
import {Strings} from '../../constants/strings';
import {style} from '../../constants/style';
import {RootStackParamList} from '../../navigators/Stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {fontScale, heightScale, widthScale} from '../../utils/helpers/scaling';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  item?: object;
}

export const EmployeeDetails: FC<Props> = ({navigation, ...props}) => {
  const {item} = props?.route.params;

  return (
    <View style={[styles.viewContainer, style.componePadding]}>
      <View style={styles.mainContainer}>
        <Image
          source={item.profile_image ? {uri: item.profile_image} : Images.user}
          resizeMode="contain"
          style={styles.imageStyle}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.textStyle}>{`Name : ${item.employee_name}`}</Text>
          <Text style={styles.textStyle}>{`Age : ${item.employee_age}`}</Text>
          <Text
            style={styles.textStyle}>{`Salary : ${item.employee_salary}`}</Text>
        </View>
      </View>
      <Button
        onPress={() => {
          navigation.navigate(Routes.MAIN_STACK.UPDATE_EMPLOYEE, {item});
        }}
        title={Strings.button.updateEmployee}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    padding: heightScale(10),
    justifyContent: 'space-between',
    flex: 1,
  },
  mainContainer: {
    paddingVertical: widthScale(10),
  },
  infoContainer: {
    marginTop: heightScale(50),
    marginLeft: widthScale(20),
  },
  imageStyle: {
    height: heightScale(150),
    width: widthScale(150),
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: fontScale(20),
  },
});
