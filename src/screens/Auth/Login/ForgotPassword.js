import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image,ScrollView } from "react-native";
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
import { routeName } from "../../../constants/routeName";
import { _toast } from "../../../constants/Index";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorString, setErrorString] = useState("");
  const [loading, setLoading] = useState(false);
  const expressions = {
    email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  };
  const Submit = async () => {
    setErrorString("");
    if (!expressions.email.test(email) || email.includes(' '))  {
      _toast(email === "" ?'Email is required':'Invalid Email');
      return false;
    }
    var formdata = new FormData();
    formdata.append("email", email);

    try {
      setLoading(true);
      const res = await Api.post(urls.FORGOT_PASSWORD, formdata);
      console.log("res", res);
      if (res.status == "200") {
        _toast(res.message);
        setLoading(false);
        navigation.navigate(routeName.OTP,{email:email, navigateTo: 'ForgotPass1'});
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorString(error);

    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>

      <Image style={styles.Rectangle} source={globalPath.Rectangle} />
      <AuthHeader
        navigation={navigation} title={"Forgot Password"} 
        />
      <View style={{ marginTop: hp(35), marginHorizontal: wp(10), flex: 1 }}>
      <Dots  />

        <ResponsiveText
          margin={[20, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          weight={"bold"}
          size={5}
          color={colors.primary}
        >
          Forgot your password
        </ResponsiveText>
        <ResponsiveText
          margin={[10, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          size={3}
          color={colors.black}
        >
          Enter your email address and we will send you a link to reset your
          password
        </ResponsiveText>
        <Input
          placeholder={"Email Address"}
          onChangeText={(text) => setEmail(text)}
          leftIcon={globalPath.EmailIcon}
          value={email}
        />

        <ResponsiveText color={colors.red} margin={[10, 0, 0, 0]}>
          {errorString}
        </ResponsiveText>
        <RnButton
          margin={[50, 0, 0, 0]}
          title={"Send Password Reset Link"}
          onPress={() => Submit()}
          // onPress={()=>navigation.navigate(routeName.OTP)}

        />
      </View>
      </ScrollView>
      {
        loading?<Loader/>:null
      }
      
    </View>
  );
};
export default ForgotPassword;
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
