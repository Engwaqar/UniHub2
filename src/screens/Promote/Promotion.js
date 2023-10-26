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

const Promotion = ({ navigation, route }) => {
  const { item,type } = route.params;
  const [loading, setLoading] = useState(false);
  const [Pkgs, setPkgs] = useState([]);
  const [markedDates, setmarkedDates] = useState(null);
  const [selectedDate, setselectedDate] = useState("");
  const itemDetail = {
    prices: [
      {
        id: 50,
        event_id: 22,
        title: "Daily",
        price: 50,
        created_at: "2023-05-26T19:04:25.000000Z",
        updated_at: "2023-05-26T19:04:25.000000Z",
      },
      {
        id: 51,
        event_id: 22,
        title: "Weekly",
        price: 250,
        created_at: "2023-05-26T19:04:25.000000Z",
        updated_at: "2023-05-26T19:04:25.000000Z",
      },
      {
        id: 52,
        event_id: 22,
        title: "Monthly",
        price: 600,
        created_at: "2023-05-26T19:04:25.000000Z",
        updated_at: "2023-05-26T19:04:25.000000Z",
      },
    ],
  };
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

  const getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      selected: true,
      color: "#00B0BF",
      textColor: "#FFFFFF",
    };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    setselectedDate(date);
    setmarkedDates(markedDates);
    console.log("mar", date);
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeader navigation={navigation} title={"Promotion"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <>
            <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
              Promotion{" "}
            </ResponsiveText>
            <ResponsiveText size={3} color={colors.grey1}>
              Select promotion Service
            </ResponsiveText>
            <View style={{ flexDirection: "row", marginTop: hp(1) }}>
              <ResponsiveText size={3} color={colors.black}>
                Title
              </ResponsiveText>
              <ResponsiveText
                margin={[0, 0, 0, 20]}
                size={2.5}
                color={colors.grey1}
              >
                {item.title}
              </ResponsiveText>
            </View>
            <View>
              <ResponsiveText
                margin={[hp(1), 0, 0, 0]}
                size={3}
                color={colors.black}
              >
                Description
              </ResponsiveText>
              <ResponsiveText
                margin={[hp(0.2), 0, 0, 0]}
                size={2.5}
                color={colors.grey1}
              >
                {item.descreption}
              </ResponsiveText>
            </View>
            <ResponsiveText
              margin={[20, 0, 10, 0]}
              size={3.3}
              weight={"bold"}
              color={colors.black}
            >
              Start Date
            </ResponsiveText>
            <Calendar
              hideExtraDays={true}
              minDate={new Date()}
              // selected={selectedDate}
              // Collection of dates that have to be marked. Default = {}
              markedDates={markedDates}
              onDayPress={(day) => {
                console.log("selected day", day);
                getSelectedDayEvents(day.dateString);
              }}
              style={{
                // borderWidth: 1,
                // borderColor: 'gray',
                height: hp(42),
                backgroundColor: colors.background,
              }}
              theme={{
                backgroundColor: colors.background,
                calendarBackground: colors.background,
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: "#ffffff",
                todayTextColor: colors.primary,
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: colors.black,
                disabledArrowColor: "#d9e1e8",
                monthTextColor: colors.black,
                indicatorColor: "blue",
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: "300",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: hp(3),
              }}
            >
              {Pkgs.map((item) => (
                <View
                  style={{
                    // flex: 1,
                    marginVertical: wp(2),
                    marginRight: 10,
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
            <RnButton
              width={"100%"}
              margin={[hp(3), 0, 0, 0]}
              title={"Pay"}
              onPress={Submit}
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
  box: { height: hp(20), marginTop: 15 },
});
