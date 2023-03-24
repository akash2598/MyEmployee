import React, {FC} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../../constants/colors';
interface IProps {
  style?: object;
  color: string;
}

export const Loader: FC<IProps> = ({color, ...props}) => {
  let activityColor = color ? color : Colors.White;

  return (
    <View style={props.style}>
      <ActivityIndicator color={activityColor} />
    </View>
  );
};
