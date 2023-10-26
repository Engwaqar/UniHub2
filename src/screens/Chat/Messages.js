import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ResponsiveText from "../../components/RnText";
import {
  hp,
  screenHeight,
  screenWidth,
  wp,
} from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
// import All_header from "../../constants/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/user.actions";
// import Loader from "../../components/loader";
import SelectDropdown from "react-native-select-dropdown";
import ImagePicker from "react-native-image-crop-picker";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { fee } from "../../constants/mock";
import { routeName } from "../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";
import RecordNotFound from "../../components/RecordnotFound";
import ChatHeader from "../../components/ChatHeader";
import MainHeader from "../../components/MainHeader";
import Input from "../../components/Input";
import database from "@react-native-firebase/database";
import { _encode, _toast } from "../../constants/Index";
import { StackActions } from "@react-navigation/native";
import moment from "moment";
import Loader from "../../components/Loader";
import Modal from "react-native-modal";
import Fonts from "../../helpers/Fonts";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import SmallButton from "../../components/SmallButton";
import LoginModal from "../../components/LoginModal";

const Messages = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const [guestModal, setGuestModal] = useState(false);
  const [image, setImage] = useState("");
  const [errorString, setErrorString] = React.useState("");
  console.log(" ====== MyProfile =====", MyProfile.email);
  const [UserChats, setUserChats] = useState([]);
  const [loadingUserConnections, setLoadingUserConnections] = useState(false);
  const [showChats, setShowChats] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [reasons, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  const Reasons = ["-", "My account may be compromised", "Login & Security"];

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (MyProfile.user_type != "Guest") {
        loadUserChats();
        setLoadingUserConnections(true);
        setTimeout(() => {
          setLoadingUserConnections(false);
        }, 500);
      } else {
        if (MyProfile.user_type === "Guest") {
          setGuestModal(true);
        }
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const loadUserChats = async () => {
    console.log("==== inside load user chats =======");
    setUserChats([]);
    // setLoadingChats(true)
    await database()
      .ref("chatlist/" + _encode(MyProfile.email))
      .on("child_added", (snapshot) => {
        console.log("snapshot.val()", snapshot.val());
        let item1 = snapshot.val();
        database()
          .ref("users/" + item1.id)
          .once("value", (snapshot) => {
            let new_ob = snapshot.val();
            let userChats = [
              ...UserChats,
              {
                ...item1,
                name: new_ob?.name,
                email: new_ob.email,
                avatar: new_ob.avatar,
              },
            ];
            let dd = userChats.sort((a, b) =>
              a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
            );
            console.log("============= user chats =============", dd);
            setUserChats(dd);
            // setLoadingChats(false)
          });
      });
    // setLoadingChats(false)
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
      setImage(image);

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

  const Validation = () => {
    const expressions = {
      email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    };
   
    setErrorString("");

    if (!expressions.email.test(email) || email.includes(' ')) {
      setErrorString(email === "" ? 'Email is required' : 'Please enter valid email');
    }
    // navigation.navigate(routeName.OTP,{email:email});
    // return false
      else if (reasons === "") {
      setErrorString("select a reason for request.");
    } else if (subject === "") {
      setErrorString("subject field is required.");
    } else if (detail === "") {
      setErrorString("detail field is required.");
    } else {
      sendReq();
      setErrorString("");
    }
  };

  const sendReq = async () => {
    try {
     let body = {
        "email": email,
        "problem": reasons,
        "subject": subject,
        "paragraph": detail,
        "files": []
    }
      setLoading(true);
      const res = await Api.post(urls.inquiry, body);
      console.log("res", res);
      if (res && res.status == 200) {
        setSubject("");
        setReason("");
        setDetail("");
        setEmail("");
        setLoading(false);
        _toast(res.message);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      console.log({error})
      setLoading(false);
      _toast(error?.toString());

      // setErrorString(error);
    }
  };

  const renderView = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate(routeName.CHATBOX, {
            to: item.email,
            name: item?.name,
            profilePicture: MyProfile,
          })
        }
      >
        <Icon
          borderRadius={30}
          size={50}
          resizeMode={"cover"}
          source={globalPath.ProfileIcon}
        />
        <View style={{ flex: 1, margin: 5, paddingHorizontal: 10 }}>
          <ResponsiveText size={3.8} weight={"bold"} color={colors.black}>
            {item?.name}
          </ResponsiveText>
          <ResponsiveText numberOfLines={1} size={2.5} color={colors.grey1}>
            {item.text}
          </ResponsiveText>
        </View>
        <View>
          <ResponsiveText size={2.3} color={colors.grey1}>
            {moment(item.createdAt).format("hh:mm a")}
          </ResponsiveText>
          {/* {item.messages ?
                        <View style={{ height: wp(5), width: wp(5), backgroundColor: colors.green, borderRadius: 10, alignItems: 'center', marginLeft: wp(4) }}>
                            <ResponsiveText textAlign={'center'} size={3} color={colors.white}>{item.messages}</ResponsiveText>
                        </View>

                        : undefined} */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={[{}, styles.container]}
      edges={["left", "right", "top"]}
    >
      <View style={[{}, styles.header]}>
        <View style={{ flexDirection: "row", height: hp(5) }}>
          <TouchableOpacity
            onPress={() => {
              setShowChats(true), setShowInquiry(false);
            }}
            style={{
              width: wp(25),
              backgroundColor: showChats ? "green" : colors.primary,
              height: hp(5),
              justifyContent: "center",
              borderTopLeftRadius: hp(3),
              borderBottomLeftRadius: hp(3),
              borderWidth: 0.5,
              borderColor: colors.white,
            }}
          >
            <Text style={[{ alignSelf: "center" }, styles.topTab]}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (setShowInquiry(true), setShowChats(false))}
            style={{
              width: wp(25),
              backgroundColor: showInquiry ? "green" : colors.primary,
              height: hp(5),
              justifyContent: "center",
              borderTopRightRadius: hp(3),
              borderBottomRightRadius: hp(3),
              borderWidth: 0.5,
              borderColor: colors.white,
            }}
          >
            <Text style={[{ alignSelf: "center" }, styles.topTab]}>
              Support
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            size={25}
            margin={[10, wp(3), 0, 0]}
            tintColor={colors.white}
            source={globalPath.backarrow}
          />
        </TouchableOpacity> */}
        {/* {UserChats.length > 0 ?  */}
        {/* <Input
          style={{ width: wp(80), borderRadius: wp(5), height: hp(5) }}
          placeholder="Search..."
          searchBox
        /> */}
        {/* : <View style={{ width: wp(80), borderRadius: wp(5)}}  />
        } */}
      </View>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {showChats && UserChats.length > 0 && (
          <ResponsiveText
            margin={wp(5)}
            color={colors.black}
            weight={"bold"}
            size={6}
          >
            {"Messages"}
          </ResponsiveText>
        )}
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          {UserChats.length > 0
            ? UserChats.map((item, index) => renderView(item, index))
            : !loadingUserConnections &&
              showChats && (
                <RecordNotFound
                  verbiage={"Looks like you haven't made any connection yet"}
                  paddingTop={0.32 * screenHeight}
                  marginTop={0}
                />
              )}
          {showInquiry && (
            <>
              <ResponsiveText
                margin={wp(5)}
                color={colors.black}
                weight={"bold"}
                size={6}
              >
                {"Submit a request"}
              </ResponsiveText>
              <InputText
                // margin={[hp(1), 0, 0, 0]}
                // marginHorizontal={10}
                // height={wp(10)}
                Text={"Your email address"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View style={{ marginVertical: hp(2), alignItems: "center" }}>
                <SelectDropdown
                  statusBarTranslucent={false}
                  dropdownStyle={{ borderRadius: 5 }}
                  dropdown1RowTxtStyle={{
                    color: colors.black,
                    textAlign: "left",
                    marginStart: 20,
                    fontSize: 14,
                  }}
                  defaultButtonText={"How can we help?"}
                  rowTextStyle={{ color: colors.black, fontSize: 14 }}
                  rowStyle={{
                    backgroundColor: "null",
                    borderBottomColor: colors.black1,
                    borderBottomWidth: 0,
                  }}
                  buttonStyle={{
                    backgroundColor: null,
                    // height: props.btnheight ? props.btnheight : hp(6.5),
                    // width: props.btnwidth ? props.btnwidth : wp(90),
                    height: hp(10),
                    width: wp(90),
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.grey,
                  }}
                  buttonTextStyle={{
                    color: colors.gray,
                    fontSize: 14,
                    textAlign: "left",
                  }}
                  data={Reasons}
                  onSelect={(selectedItem, index) => {
                    setReason(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
              <InputText
                // margin={[hp(1), 0, 0, 0]}
                // marginHorizontal={10}
                // height={wp(10)}
                Text={"Subject"}
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />
              <View style={{ marginTop: hp(2) }}></View>
              <InputText
                multiline={true}
                maxLength={140}
                // margin={[hp(1), 0, 0, 0]}
                // marginHorizontal={10}
                height={wp(30)}
                Text={"Tell us a bit more about how we can help you."}
                value={detail}
                onChangeText={(text) => setDetail(text)}
              />
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={toggel}
              >
                <Input
                  width={wp(90)}
                  editable={false}
                  placeholder={"Attachments(optional)"}
                  // onChangeText={(text) => setConfirmPassword(text)}
                  // leftIcon={globalPath.Doc_Up}
                  value={image.path}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: hp(5),
                  width: wp(90),
                  alignSelf: "center",
                  margin: wp(2),
                }}
              >
                <ResponsiveText color={colors.red}>
                  {errorString}
                </ResponsiveText>
              </View>

              <SmallButton
                btnStyle={{ height: hp(5), width: wp(45) }}
                title={"Submit"}
                onPress={() => {
                  Validation();
                  // navi.navigate(routeName.ADD_STACK, {
                  //   screen: routeName.SELL_HUB_SERVICE,
                  // });
                  // setModalVisible(false);
                }}
              />
            </>
          )}
        </ScrollView>
      </View>
      {(loadingUserConnections || loading) && <Loader />}
      <LoginModal
        isVisible={guestModal}
        onClose={setGuestModal}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};
export default Messages;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    backgroundColor: colors.primary,
    padding: wp(4),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  badge: {
    backgroundColor: colors.green3,
    padding: 3,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: colors.green4,
    borderWidth: 0.4,
  },
  cardContainer: {
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    backgroundColor: colors.background,
    shadowColor: colors.grey1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topTab: { color: colors.white, fontWeight: "bold", fontSize: 16 },
});
