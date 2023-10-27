import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import { currency } from "../../constants/constantVeriable";
import PackageTabs from "../Home/PackageTabs";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { Linking } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment/moment";
import Loader from "../../components/Loader";
import SmallButton from "../../components/SmallButton";

const Promotion = ({ navigation, route }) => {
  // const { item,type } = route.params;
  const [loading, setLoading] = useState(false);
  const [Pkgs, setPkgs] = useState([]);
  const [markedDates, setmarkedDates] = useState(null);
  const [selectedDate, setselectedDate] = useState("");
  const itemDetail = [
    {
      id: 50,
      event_id: 22,
      title: "Standard",
      price: 50,
      created_at: "2023-05-26T19:04:25.000000Z",
      updated_at: "2023-05-26T19:04:25.000000Z",
    },
    {
      id: 51,
      event_id: 22,
      title: "Gold",
      price: 250,
      created_at: "2023-05-26T19:04:25.000000Z",
      updated_at: "2023-05-26T19:04:25.000000Z",
    },
    {
      id: 52,
      event_id: 22,
      title: "Premium",
      price: 600,
      created_at: "2023-05-26T19:04:25.000000Z",
      updated_at: "2023-05-26T19:04:25.000000Z",
    },
  ];
  const itemDeal = [
    {
      id: 53,
      event_id: 22,
      title: "Deal of the day",
      price: 50,
      created_at: "2023-05-26T19:04:25.000000Z",
      updated_at: "2023-05-26T19:04:25.000000Z",
    },
  ];
  const [selectedPakage, setSelectedPakage] = useState(null);
  useEffect(() => {
    getPkgs();
  }, []);

  const getPkgs = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_PROMOTION_PKGS);
      console.log("res", res);
      if (res && res.status == 200) {
        setPkgs(res.packages);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const Submit = async () => {
    if (selectedDate == "") {
      _toast("Start date is required.");
      return false;
    } else if (selectedPakage == null) {
      _toast("Select a package.");
      return false;
    }
    const formdata = new FormData();
    formdata.append("item_id", item.id);
    formdata.append("package_id", selectedPakage.id);
    formdata.append("type", type); //event,product,service
    formdata.append("success_url", urls.BASE_URL + "success_url");
    formdata.append("cancel_url", urls.BASE_URL + "cancel_url");
    formdata.append("start_date", moment(selectedDate).format("YYYY-MM-DD"));

    try {
      setLoading(true);
      const res = await Api.post(urls.PROMOTION, formdata);
      console.log("==== res =====", res);
      if (res && res.status == 200) {
        setLoading(false);
        // _toast(res.message);
        Linking.openURL(res.session.url);
        // navigation.navigate(routeName.BUYER_CHECKOUT, {
        //   // itemDetail: itemDetail,
        // });
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("error while add promotion", error);
      //   setErrorString(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeader navigation={navigation} title={"Boost"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>Standard:</ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, 1]}>
                It contains x days for x amount
              </ResponsiveText>
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>Gold:</ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, 1]}>
                It contains x days for x amount
              </ResponsiveText>
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>Premium:</ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, 1]}>
                It contains x days for x amount
              </ResponsiveText>
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>
                Deal of the day:
              </ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, 1]}>
                It contains x days for x amount
              </ResponsiveText>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: hp(3),
              }}
            >
              {itemDetail.map((item) => (
                <View
                  style={{
                    // flex: 1,
                    marginVertical: wp(1),
                    marginRight: 8,
                    alignItems: "center",
                  }}
                >
                  <PackageTabs
                    onPress={() => setSelectedPakage(item)}
                    title={item.title}
                    price={currency + item.price}
                    isSelected={selectedPakage?.id == item.id}
                  />
                </View>
              ))}
            </View>
            <ResponsiveText
              textAlign={"center"}
              fontFamily={"100"}
              margin={[10, 0, 0, 0]}
            >
              OR select
            </ResponsiveText>
            <View
              style={{
                // flexDirection: "row",
                alignItems:'center',
                marginTop: hp(2),
              }}
            >
              {itemDeal.map((item) => (
                <View
                  style={{
                    alignContent:"center"
                  }}
                >
                  <PackageTabs
                    onPress={() => setSelectedPakage(item)}
                    title={item.title}
                    price={currency + item.price}
                    isSelected={selectedPakage?.id == item.id}
                  />
                </View>
              ))}
            </View>
            <SmallButton
              btnStyle={{ height: hp(5), width: wp(33), marginTop: hp(3) }}
              title={"Boost"}
              TextSize={3}
              onPress={() => navigation.navigate(routeName.PROMOTION)}
            />
          </>
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading && <Loader />}
    </SafeAreaView>
  );
};

export default Promotion;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
    backgroundColor: colors.background,
  },
  box: {
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: hp(1.2),
  },
  // box: { height: hp(20), marginTop: 15 },
});
