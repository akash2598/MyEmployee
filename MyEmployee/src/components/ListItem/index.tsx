import React, {FC} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Images from '../../assets/images';
import {Colors} from '../../constants/colors';
import {style} from '../../constants/style';
import {heightScale, widthScale} from '../../utils/helpers/scaling';

interface Props {
  image?: string;
  name: string;
  age: string;
  salary: string;
  onPress: (val: any) => void;
}

export const EmployeeItem: FC<Props> = ({
  image = '',
  name = '',
  salary = '',
  age = '',
  onPress,
}) => {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.mainContainer}>
          <Image
            source={image ? {uri: image} : Images.user}
            resizeMode="contain"
            style={styles.imageStyle}
          />

          <View style={styles.infoContainer}>
            <Text>{`Name : ${name}`}</Text>
            <Text>{`Age : ${age}`}</Text>
            <Text>{`Salary : ${salary}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: Colors.Pink,
    padding: heightScale(10),
    borderRadius: 10,
    ...style.componentMargin,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    marginLeft: heightScale(20),
  },
  imageStyle: {
    height: heightScale(70),
    width: widthScale(70),
  },
});
