import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Text,
} from "react-native";
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
import { _toast, _encode } from "../../../constants/Index";
import DropDown from "../../../components/DropDown";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
import database from "@react-native-firebase/database";
import ImagePicker from "react-native-image-crop-picker";
import Icon from "../../../components/Icon";

const Signup = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUniy, setselectedUniy] = useState(null);
  const [Universities, setUniversities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const userRegister = async () => {
    var formdata = new FormData();
    formdata.append("email", email);
    if (activeTab == 0) {
      formdata.append("verify_email", 1);
    } else if (activeTab == 1) {
      formdata.append("verify_card", 1);
      formdata.append(
        "card",
        imageFile != undefined
          ? {
              uri: imageFile.path,
              type: "image/jpeg",
              name: "name",
            }
          : null
      );
    }

    console.log("formdata", formdata);
    // return false
    try {
      setLoading(true);
      const res = await Api.post(urls.NEW_REGISTER, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        await database()
          .ref("users")
          .child(_encode(email))
          .set({
            id: _encode(email),
            name: userName,
            email: email,
            // deviceToken: deviceToken,
          })
          .catch(() => {
            _toast("Something went wrong with firebase");
          });

        if (res.message == "please wait for the admin approvel") {
          setEmail("");
          setImageFile(null);
          setActiveTab(0);
          navigation.goBack();
        } else if (res.message == "user already exist") {
        } else {
          navigation.navigate(routeName.OTP, {
            email: email,
            navigateTo: "AddDetail",
            user:res.user
          });
        }
        _toast(res.message);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorString(error);
    }
  };
  const toggel = () => {
    Alert.alert("Profile Image", "Change profile image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "open Camera",
        onPress: async () => {
          openCamera();
        },
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary();
        },
      },
    ]);
  };
  const takephotofromgallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      // profileRef.current?.Submit(image);
      setImageFile(image);

      console.log(image, "image working");
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // profileRef.current?.Submit(image);

      // addPhoto(image);
      setImage(image);
      console.log(image, "image working");
    });
  };
  // const expressions = {
  //   email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  // };
  const Validation = (item) => {
    const regex = /^[A-Za-z0-9._%+-]+@(?!gmail\.com|hotmail\.com|outlook\.com|aol\.com|zoho\.com|mail\.com|protonmail\.com|yahoo\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // navigation.navigate(routeName.OTP,{email:email});
    // return false
    setErrorString("");
    // if (
    //   userName === "" &&
    //   email === "" &&
    //   password === "" &&
    //   confirmPassword === "" &&
    //   selectedUniy == null
    // ) {
    //   setErrorString("All fields are required");
    // } else if (userName === "") {
    //   setErrorString("Full name field is required.");
    // } else
    if (!regex.test(email) || email.includes(" ")) {
      _toast(email === "" ? "Email is required" : "Please enter a valid student email address");
    } else if (activeTab == 1 && imageFile === null) {
      _toast("University ID is required.");
    } else {
      userRegister();
      setErrorString("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.Rectangle} source={globalPath.Rectangle} />
        <AuthHeader navigation={navigation} title={"Sign up"} />
        <View style={{ marginTop: hp(35), marginHorizontal: wp(5) }}>
          <Dots style={{ marginLeft: hp(2) }} />
          <ResponsiveText
            margin={[20, 0, 0, 20]}
            fontFamily={Fonts.Bold}
            weight={"bold"}
            size={5}
            color={colors.primary}
          >
            Hello, Welcome to UNIHUB!
          </ResponsiveText>
          <ResponsiveText
            margin={[10, 0, 0, 20]}
            fontFamily={Fonts.Bold}
            size={3}
            color={colors.black}
          >
            Create your UNIHUB store account
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: hp(2),
            }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab(0)}
              style={[
                styles.Right_Tab,
                {
                  backgroundColor:
                    activeTab == 0 ? colors.primary : colors.lighterGrey,
                },
              ]}
            >
              <ResponsiveText
                textAlign={"center"}
                weight={"bold"}
                color={activeTab == 0 ? colors.white : colors.black}
              >
                Verify By Email
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab(1)}
              style={[
                styles.Left_Tab,
                {
                  backgroundColor:
                    activeTab == 1 ? colors.primary : colors.lighterGrey,
                },
              ]}
            >
              <ResponsiveText
                textAlign={"center"}
                weight={"bold"}
                color={activeTab == 1 ? colors.white : colors.black}
              >
                Verify By Student ID
              </ResponsiveText>
            </TouchableOpacity>
          </View>

          {activeTab == 0 ? (
            <View>
              <Input
                placeholder={"Email Address"}
                onChangeText={(text) => setEmail(text)}
                leftIcon={globalPath.EmailIcon}
                value={email}
                keyboardType={"email-address"}
              />

              <ResponsiveText color={colors.red} margin={[10, 0, 10, 10]}>
                {errorString}
              </ResponsiveText>
            </View>
          ) : (
            <View>
              <Input
                placeholder={"Email Address"}
                onChangeText={(text) => setEmail(text)}
                leftIcon={globalPath.EmailIcon}
                value={email}
                keyboardType={"email-address"}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  height: hp(6.6),
                  width: wp(85),
                  flexDirection: "row",
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginTop: hp(2),
                }}
                onPress={toggel}
              >
                <Icon source={globalPath.Doc_Up} tintColor={colors.primary} />
                <View style={{ width: wp(70), marginLeft: 10 }}>
                  <ResponsiveText numberOfLines={1} size={3}>
                    {imageFile
                      ? imageFile?.path
                      : "Upload Your University ID for Verification"}
                  </ResponsiveText>
                </View>
              </TouchableOpacity>
              {imageFile ? (
                <View style={{ alignItems: "center" }}>
                  <Image
                    borderRadius={5}
                    style={{ width: wp(80), height: hp(20), marginTop: hp(2) }}
                    source={{ uri: imageFile?.path }}
                  />
                </View>
              ) : null}
            </View>
          )}
          <RnButton
            margin={[hp(3), 0, 0, 0]}
            title={"Continue"}
            onPress={() => Validation()}
            // onPress={() => navigation.navigate(routeName.ADD_DETAIL)}
          />

          <View style={styles.footer}>
            <ResponsiveText margin={[0, 10]} color={colors.black}>
              Already have an account?{" "}
              <ResponsiveText
                fontFamily="Bold"
                color={colors.primary}
                onPress={() => navigation.navigate(routeName.LOGIN)}
              >
                Sign in
              </ResponsiveText>
            </ResponsiveText>
          </View>
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </View>
  );
};
export default Signup;
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
    marginVertical: hp(5),
  },
  Left_Tab: {
    width: wp(43),
    height: hp(5),
    justifyContent: "center",
    borderTopRightRadius: hp(3),
    borderBottomRightRadius: hp(3),
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  Right_Tab: {
    height: hp(5),
    width: wp(43),
    justifyContent: "center",
    borderTopLeftRadius: hp(3),
    borderBottomLeftRadius: hp(3),
    borderWidth: 0.5,
    borderColor: colors.white,
  },
});
