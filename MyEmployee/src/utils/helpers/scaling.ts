import {Dimensions} from 'react-native';

const standardWidth = 375.0;
const standardHeight = 767.0;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export function widthScale(dimensionWidth: number) {
  return (dimensionWidth / standardWidth) * screenWidth;
}

export function heightScale(dimensionHeight: number) {
  return (dimensionHeight / standardHeight) * screenHeight;
}

export function fontScale(dimensionWidth: number) {
  return (dimensionWidth / standardWidth) * screenWidth;
}
