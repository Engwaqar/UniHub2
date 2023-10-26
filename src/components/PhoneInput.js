import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import { hp, wp } from "../helpers/Responsiveness";
import PhoneInput1 from "react-native-phone-number-input";

const PhoneInput = ({
  iconSize,
  height,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  placeholder,
  iconMargin,
  maxLength,
  rightIconMargin,
  placeholderTextColor,
  keyboardType,
  width,
  containerStyle,
  secureTextEntry,
  onChangeText,
  onChangeFormattedText,
  onChangeCountry,
  fontSize,
  multiline,
  value,
  onSubmitEditing,
  cardIcon,
  Text,
  inputHeight,
  marginHorizontal,
  editable,
  BadgeIcon,
  defaultValue,
  defaultCode,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true); // Track if API data is loading
  const [phoneNumber, setPhoneNumber] = useState(''); // Initialize with an empty string

  // Simulate an API call to fetch the phone number
  useEffect(() => {
    // Replace this with your actual API call to fetch the phone number
    // Make sure to set the phoneNumber state when you have the data
    setTimeout(() => {
      const fetchedPhoneNumber = defaultCode; // Replace with the actual fetched data
      setPhoneNumber(fetchedPhoneNumber);
      setIsLoading(false); // Set loading to false when data is available
    }, 1000); // Simulating a delay for the API call
  }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS=='ios'? 'height':undefined} enabled>
      <View
        style={[
          styles.container,

          margin ? handleMargin(margin) : undefined,
          padding ? handlePadding(padding) : undefined,
          props.style,
          height && { height },
          width && { width },
          {
            zIndex: zIndex,
            marginHorizontal:marginHorizontal?marginHorizontal:wp(5)
          },
          containerStyle,
        ]}
      >
        
        <View style={{flex:1}} >

        <PhoneInput1
            // ref={phoneInput}
            defaultValue={defaultValue}
            value={value}
            defaultCode={defaultCode?defaultCode:'GB'}
            layout="first"
            onChangeText={onChangeText}
            onChangeFormattedText={onChangeFormattedText}
            onChangeCountry={onChangeCountry}
            placeholder={placeholder}
            // withDarkTheme
            // withShadow
            // autoFocus
            containerStyle={{backgroundColor:colors.background}}
            textInputStyle={{backgroundColor:colors.background}}
            codeTextStyle={{backgroundColor:colors.background}}
            countryPickerButtonStyle={{backgroundColor:colors.background}}
            flagButtonStyle={{backgroundColor:colors.background}}
            textContainerStyle={{backgroundColor:colors.background}}





          />
        </View>
         
      </View>
    </KeyboardAvoidingView>
  );
};
export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    //  height: wp(5),
    // flexDirection: 'row',
    height: 80,
    // marginHorizontal: wp(5),
    display: "flex",
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: colors.white,
    borderRadius: wp(1.5),
    // paddingLeft: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    // marginVertical: 0,
  },
  Input: {
    borderRadius: wp(1.5),
    flex: 1,
    paddingLeft: 10,
    marginTop: 5,
    fontFamily: Fonts.Regular,
    color: colors.primary,
    // height: hp(0),
    // marginLeft:7
  },
});
