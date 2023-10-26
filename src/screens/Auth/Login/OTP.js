import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import Fonts from "../../../helpers/Fonts";
import Loader from "../../../components/Loader";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
import { routeName } from "../../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";
import { put } from "redux-saga/effects";
import types from "../../../redux/actions/types";
import { CommonActions } from "@react-navigation/native";

const OTP = ({ navigation, route }) => {
  const [otpCode, setOtpCode] = React.useState("");
  const [errorString, setErrorString] = React.useState("");
  const [loading, setLoading] = useState(false);

  const { email, navigateTo, user, message } = route.params;
  const Submit = async (text) => {
    setErrorString("");
    if (text == "") {
      setErrorString("Please enter Otp");
      return false;
    }
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("otp", text);

    try {
      setLoading(true);
      const res = await Api.post(
        user?.is_verified || navigateTo == "ForgotPass1" ? urls.MATCH_OTP : urls.NEW_MATCH_OTP,
        formdata
      );
      console.log("MATCH_OTP res", res);
      if (res.status == "200") {
        setLoading(false);
        if (message == "User is verified but not complete registeration!") {
          navigation.replace(routeName.ADD_DETAIL, res.user);
        } else if (
          user?.is_verified &&
          res.token &&
          navigateTo == "BottomTabs"
        ) {
          await AsyncStorage.setItem("@token", res.token);
          await AsyncStorage.setItem("@userId", JSON.stringify(res.user.id));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: routeName.HOME_STACK }],
            })
          );
          // navigation.replace(routeName.HOME_STACK);
          put({ type: types.LOGIN_USER_SUCCESS, payload: res });
        } else if (navigateTo == "ForgotPass1") {
          await AsyncStorage.setItem("@token", res.token);
          await AsyncStorage.setItem("@userId", JSON.stringify(res.user.id));
          navigation.navigate(routeName.FORGOT_PASSWORD1);
          setErrorString(res.message);
        } else {
          navigation.replace(routeName.ADD_DETAIL, res.user);
        }
      } else {
        setLoading(false);
        setErrorString(res.message);
      }
    } catch (error) {
      console.log("====== error while match otp =======", error);
      setLoading(false);
      setErrorString(error);
    }
  };
  const handleChange = (text) => {
    console.log("text", text);
    // Handle type checking here
    setOtpCode(text);
    if (text?.length === 6) {
      Submit(text);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.Rectangle} source={globalPath.Rectangle} />
      <AuthHeader navigation={navigation} title={"OTP Request"} />
      <View style={{ marginTop: hp(35), marginHorizontal: wp(10), flex: 1 }}>
        <Dots />

        <ResponsiveText
          margin={[20, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          weight={"bold"}
          size={5}
          color={colors.primary}
        >
          Enter The OTP Code
        </ResponsiveText>
        <Input
          placeholder={"Enter The OTP Code"}
          value={otpCode}
          maxLength={6}
          onChangeText={(text) => handleChange(text)}
          leftIcon={globalPath.LockIcon}
        />
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
          {errorString}
        </ResponsiveText>
        {/* <RnButton
          margin={[50, 0, 0, 0]}
          title={"Submit"}
          onPress={() => Submit()}
        /> */}
      </View>
      {loading ? <Loader /> : null}
    </View>
  );
};
export default OTP;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F5",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Rectangle: {
    height: hp(68),
    width: wp(140),
    top: hp(-33),
    left: wp(-20),
    position: "absolute",
    // resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
    tintColor:colors.secondary,
  },
  footer: {
    alignItems: "center",
    bottom: hp(5),
  },
});
