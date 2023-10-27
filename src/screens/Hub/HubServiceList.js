import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import SmallButton from "../../components/SmallButton";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getAllHubServices } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import moment from "moment";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";
import ServiceSwiper from "../Home/ServiceSwiper";

const HubServiceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const HubServices = useSelector(
    (state) => state.userReducers.getAllHubServices?.data
  );
  const loading = useSelector(
    (state) => state.userReducers.getAllHubServices?.refreshing
  );

  console.log("getAllHubServices", HubServices);
  useEffect(() => {
    dispatch(getAllHubServices());
  }, []);
  const DataImg = [
    {
      id: 1,
      url: require("../../assets/icons/image.jpeg"),
    },
    {
      id: 2,
      url: require("../../assets/icons/image.jpeg"),
    },
    {
      id: 3,
      url: require("../../assets/icons/image.jpeg"),
    },
    {
      id: 4,
      url: require("../../assets/icons/image.jpeg"),
    },
  ];
  const ListData = [
    {
      id: 1,
      title: "Service",
      Edit: "Edit",
      Preview: "Preview",
      Share: "Share",
    },
    {
      id: 2,
      title: "Service",
      Edit: "Edit",
      Preview: "Preview",
      Share: "Share",
    },
    {
      id: 3,
      title: "Service",
      Edit: "Edit",
      Preview: "Preview",
      Share: "Share",
    },
    {
      id: 4,
      title: "Service",
      Edit: "Edit",
      Preview: "Preview",
      Share: "Share",
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"My Service"} />
      <View style={{ marginBottom: hp(4), marginLeft: 15 }}>
        <View style={styles.banner}>
          <ServiceSwiper data={DataImg} />
        </View>
        <ResponsiveText size={5} color={colors.black}>
          Business Details Goes Here{" "}
        </ResponsiveText>
        <ResponsiveText size={2.5} color={colors.grey1}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s,
        </ResponsiveText>
        <ResponsiveText
          margin={[10, 0, 0, 0]}
          weight={"bold"}
          size={4.2}
          color={colors.primary}
          textDecorationLine={'underline'}
        >
          Services
        </ResponsiveText>
        <View
          style={{
            padding: hp(3),
            marginTop: hp(1),
            backgroundColor: colors.primary,
            borderRadius: 25,
            marginHorizontal: wp(1),
          }}
        >
          {ListData.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: hp(0.5),
                }}
              >
                <ResponsiveText size={3.5} color={colors.white}>
                  {item.title}
                </ResponsiveText>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity>
                    <ResponsiveText
                      margin={[0, 10, 0, 0]}
                      size={3.5}
                      color={colors.white}
                      textDecorationLine={'underline'}
                    >
                      {item.Edit}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <ResponsiveText
                      margin={[0, 10, 0, 0]}
                      size={3.5}
                      color={colors.white}
                      textDecorationLine={'underline'}
                    >
                      {item.Preview}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <ResponsiveText
                      margin={[0, 10, 0, 0]}
                      size={3.5}
                      color={colors.white}
                    >
                      {item.Share}
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <SmallButton
          btnStyle={{ height: hp(5), width: wp(28), marginTop: hp(3) }}
          title={"Boost"}
          TextSize={3}
          onPress={() => navigation.navigate(routeName.PROMOTION)}
        />
      </View>

      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderBottomColor: colors.lighterGrey,
        }}
      >
        <ResponsiveText weight={"bold"} size={4} color={colors.black}>
          Hub Service
        </ResponsiveText>
        <SmallButton
          btnStyle={{ height: hp(4), width: wp(40) }}
          // margin={[0, 0, 10, 0]}
          title={"Add Hub Service"}
          onPress={() => navigation.navigate(routeName.SELL_HUB_SERVICE)}
        />
      </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: colors.lighterGrey,
          padding: 15,
          marginTop: hp(1),
        }}
      >
        <ResponsiveText size={3.7} color={colors.black}>
          Name
        </ResponsiveText>
        <ResponsiveText size={3.7} color={colors.black}>
          Event Date
        </ResponsiveText>
        <ResponsiveText size={3.7} color={colors.black}>
          Status
        </ResponsiveText>
        {/* <ResponsiveText size={3.7} color={colors.black}>
          Status
        </ResponsiveText> */}
      {/* <ResponsiveText size={3.7} color={colors.black}>
          Action
        </ResponsiveText> */}
      {/* </View> */}
      {/* {HubServices?.length > 0 ? (
        HubServices.map((item) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: wp(2),
              }}
            >
              <View style={styles.box}>
                <ResponsiveText
                  fontFamily={"bold"}
                  size={3.2}
                  color={colors.black}
                >
                  {item.title}
                </ResponsiveText>
              </View>
              <View style={styles.box}>
                <ResponsiveText
                  fontFamily={"bold"}
                  size={2.8}
                  color={colors.black}
                >
                  {moment(item.date_time).format("DD MMM YYYY")}
                </ResponsiveText>
              </View>

              <View style={styles.box}>
                <ResponsiveText
                  fontFamily={"bold"}
                  size={3.2}
                  color={colors.black}
                >
                  {item.status_id == 1 ? "Active" : "InActive"}
                </ResponsiveText>
              </View>
              {/* <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate(routeName.EDIT_HUB_SERVICE,{item:item})}>
                                <ResponsiveText weight={"bold"} size={3.5} color={colors.primary}>
                                    Edit
                                </ResponsiveText>
                            </TouchableOpacity> */}
      {/* <View style={styles.Text_box}>
                <SmallButton
                  btnStyle={{ height: hp(3), width: wp(20) }}
                  title={"Edit"}
                  onPress={() =>
                    navigation.navigate(routeName.EDIT_HUB_SERVICE, {
                      item: item,
                    })
                  }
                />
                <SmallButton
                  btnStyle={{
                    height: hp(3),
                    width: wp(20),
                    marginTop: hp(0.5),
                  }}
                  title={"Promote"}
                  onPress={() =>
                    navigation.navigate(routeName.PROMOTION, {
                      item: item,
                      type: "service",
                    })
                  }
                />
              </View>
            </View>
          );
        })
      ) : loading == false ? (
        <RecordNotFound />
      ) : null} */}
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default HubServiceList;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: {
    width: wp(20),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  Text_box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(1),
  },
  banner: {
    height: hp(23),
    width: wp(100),
    alignSelf: "center",
    marginVertical: hp(2),
  },
});
