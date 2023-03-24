import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../constants/colors';
import FONTS from '../../assets/fonts';
import {fontScale, heightScale, widthScale} from '../../utils/helpers/scaling';
import {style} from '../../constants/style';

interface Props {
  placeholder?: string;
  label?: string;
  value: string;
  validationType: string;
  onChangeText: (val: any) => void;
  errorCallBack: (val: any) => void;
}

export const Input: FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  label,
  errorCallBack,
  validationType,
}) => {
  const [state, setState] = useState({
    error: false,
    userError: '',
  });

  const requireText = () => {
    let errorMessage = 'Require this field';
    if (value?.length === 0) {
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else {
      setState(prev => ({...prev, error: false, userError: ''}));
      errorCallBack('false');
    }
  };

  const validateName = () => {
    let errorMessage = 'Please Enter Valid Name';
    if (value?.length < 3) {
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else {
      setState(prev => ({...prev, error: false, userError: ''}));
      errorCallBack('false');
    }
  };

  const validateAge = () => {
    const number = /^(\s*-?\d+(\.\d+)?)*$/;
    let errorMessage = 'Enter only numbers';
    if (!value.toString()?.match(number) && value?.length != 0) {
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else if (+value <= 17) {
      errorMessage = 'Age must be greater than 18';
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else {
      setState(prev => ({...prev, error: false, userError: ''}));
      errorCallBack('false');
    }
  };

  const validateSalary = () => {
    const number = /^(\s*-?\d+(\.\d+)?)*$/;
    let errorMessage = 'Enter only numbers';
    if (!value.toString()?.match(number) && value?.length != 0) {
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else if (+value <= 0) {
      errorMessage = 'Enter Valid Salary';
      setState(prev => ({...prev, error: true, userError: errorMessage}));
      errorCallBack('true');
    } else {
      setState(prev => ({...prev, error: false, userError: ''}));
      errorCallBack('false');
    }
  };

  const validate = () => {
    if (validationType !== undefined) {
      let validationModeArr = validationType.split('|');
      //log_e('validationArr', validationModeArr);
      validationModeArr.map(validationtype => {
        validationSwitch(validationtype);
      });
    }
  };

  const validationSwitch = (validationType: String) => {
    switch (validationType) {
      case 'req':
        requireText();
        break;
      case 'name':
        validateName();
        break;
      case 'age':
        validateAge();
        break;
      case 'salary':
        validateSalary();
        break;
      default:
        return false;
    }
  };

  return (
    <View style={styles.InputContainer}>
      {label && <Text style={[styles.labeStyle]}>{label}</Text>}
      <View style={styles.InputBox}>
        <TextInput
          style={styles.InputText}
          placeholder={placeholder}
          value={value}
          textAlignVertical="center"
          autoCapitalize={'none'}
          onBlur={validate}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.Grey_2}
        />
      </View>
      {state.error ? (
        <View>
          <Text style={styles.errorStyle}>{state.userError}</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: heightScale(14),
    color: Colors.Red,
    padding: heightScale(5),
    fontFamily: FONTS.AVERTA_REGULAR,
    marginBottom: -10,
  },
  labeStyle: {
    marginBottom: heightScale(10),
    fontSize: heightScale(14),
    fontFamily: FONTS.AVERTA_SEMIBOLD,
    color: Colors.Black,
  },
  InputContainer: {
    marginTop: heightScale(25),
    width: '100%',
    ...style.componentMargin,
  },
  InputBox: {
    flexDirection: 'row',
    backgroundColor: Colors.Grey_1,
    alignItems: 'center',
    borderRadius: heightScale(5),
  },

  InputText: {
    width: '80%',
    paddingLeft: widthScale(15),
    height: heightScale(47),
    fontSize: fontScale(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: Colors.Black,
  },
});
