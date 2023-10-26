import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import { hp, wp, screenWidth } from "../../helpers/Responsiveness";
import { useSelector } from "react-redux";
import { _toast } from "../../constants/Index";
import ResponsiveText from "../../components/RnText";
import { View } from "react-native";
import { globalPath } from "../../constants/globalPath";
import SmallButton from "../../components/SmallButton";
import Modal from "react-native-modal";
import Icon from "../../components/Icon";
import urls from "../../redux/lib/urls";

const UserID = React.forwardRef((props, ref) => {
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  console.log("---------------MyProfile", MyProfile);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [guestModal, setGuestModal] = React.useState(false);
  return (
    <>
      {/* <ResponsiveText color={colors.primary} size={4} weight="bold">
            ID
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
            See Your Verification Status.
        </ResponsiveText> */}
      <Modal
        isVisible={isModalVisible}
        onModalHide={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              padding: 10,
              elevation: 5,
              width: 0.8 * screenWidth,
              borderWidth: 1.5,
              borderColor: colors.primary,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  padding: 3,
                  right: screenWidth * 0.02,
                  flexDirection: "row",
                  textAlign: "right",
                  color: colors.black,
                  // fontFamily: fontFamily.pt_sans,
                  // fontSize: fontSize.verbiage
                }}
              >
                ✖
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
              <View style={{ width: wp(50) }}>
                <ResponsiveText
                  margin={[0, 0, 0, 15]}
                  color={colors.grey1}
                  size={3.2}
                >
                  Name
                </ResponsiveText>
                <ResponsiveText
                  margin={[5, 0, 0, 15]}
                  numberOfLines={1}
                  weight={"bold"}
                  color={colors.black}
                  size={3.2}
                >
                  {MyProfile.name}
                </ResponsiveText>
                <ResponsiveText
                  margin={[10, 0, 0, 15]}
                  color={colors.grey1}
                  size={3.2}
                >
                  University
                </ResponsiveText>
                <ResponsiveText
                  margin={[5, 0, 0, 15]}
                  numberOfLines={1}
                  weight={"bold"}
                  color={colors.black}
                  size={3.2}
                >
                  {MyProfile.uni_name}
                </ResponsiveText>
                <ResponsiveText
                  margin={[10, 0, 0, 15]}
                  color={colors.grey1}
                  size={3.2}
                >
                  ID Status
                </ResponsiveText>
                <View style={{ flexDirection: "row",alignItems:'center',marginBottom:10 }}>
                  <ResponsiveText
                    margin={[5, 0, 0, 15]}
                    weight={"bold"}
                    color={colors.black}
                    size={3.2}
                  >
                    Verified
                  </ResponsiveText>
                  <Icon
                    margin={[0, 0, 0, 5]}
                    size={18}
                    source={globalPath.IconMetrial}
                  />
                </View>
              </View>
              <Image
                style={styles.userImg}
                source={ MyProfile.profile_img?{uri:urls.IMG_BASE_URL + MyProfile.profile_img}: globalPath.ProfileIcon}
              />
            </View>
          </View>
        </View>
      </Modal>
      <InputText
        margin={[hp(3), 0, 0, 0]}
        marginHorizontal={1}
        // Text={"Name"}
        value={MyProfile.name}
        editable={false}
      />
      <InputText
        margin={[hp(3), 0, 0, 0]}
        marginHorizontal={1}
        // Text={"Name"}
        value={MyProfile.uni_name}
        editable={false}
        BadgeIcon={globalPath.IconMetrial}
      />
      <InputText
        margin={[hp(3), 0, 0, 0]}
        marginHorizontal={1}
        // Text={"ID# 567"}
        value={"ID# 567"}
        editable={false}
      />
      <SmallButton
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
        backgroundColor={colors.primary}
        margin={[hp(2)]}
        btnStyle={{ height: hp(4), width: wp(40) }}
        title={"Show ID card"}
       
      />
    </>
  );
});
export default UserID;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: wp(1),
      backgroundColor: colors.background,
    },
    userImg: {  height: wp(20),
        width: wp(20),
        borderWidth: 5,
        borderRadius: wp(15),
        borderColor: colors.primary,
        resizeMode: "cover",
        marginTop: hp(1), },
  });
  