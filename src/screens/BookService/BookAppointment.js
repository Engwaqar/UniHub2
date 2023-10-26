import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import { hp, wp } from "../../helpers/Responsiveness";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import ResponsiveText from "../../components/RnText";
import Loader from "../../components/Loader";
import { colors } from "../../constants/colorsPallet";
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";
import { globalPath } from "../../constants/globalPath";
import RnButton from "../../components/RnButton";
import { Calendar } from "react-native-calendars";
import moment from "moment/moment";

const BookAppointment = ({ navigation }) => {
  const [ActiveTab, setActiveTab] = useState("");
  const [markedDates, setmarkedDates] = useState(null);
  const [selectedDate, setselectedDate] = useState("");
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
  const DataTime = [
    {
      id: 1,
      Time: "9:00 AM",
    },
    {
      id: 2,
      Time: "10:00 AM",
    },
    {
      id: 3,
      Time: "11:00 AM",
    },
    {
      id: 4,
      Time: "12:00 AM",
    },
  ];
  const Data = [
    {
      id: 1,
      title: "Nails 1",
      Price: "£10.00",
    },

    {
      id: 2,
      title: "Nails 2",
      Price: "£10.00",
    },
    {
      id: 3,
      title: "Nails 3",
      Price: "£10.00",
    },
    {
      id: 4,
      title: "Nails 4",
      Price: "£10.00",
    },
    {
      id: 5,
      title: "Nails 5",
      Price: "£10.00",
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Book an Appointment"} />
      <ScrollView>
        <View
          style={{
            margin: wp(5),
          }}
        >
          <ResponsiveText
            margin={[10, 0, 10, 0]}
            weight={"bold"}
            color={colors.primary}
            size={4}
          >
            Select date
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
          <ResponsiveText
            margin={[30, 0, 10, 0]}
            weight={"bold"}
            color={colors.primary}
            size={4}
          >
            Select time
          </ResponsiveText>
          <ScrollView horizontal style={{ flexDirection: "row" }}>
            {DataTime.map((item) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => setActiveTab(item.id)}
                    style={[
                      styles.Time_Btn,
                      {
                        backgroundColor:
                          item.id == ActiveTab ? colors.white : colors.BtnClr,
                        borderColor:
                          item.id == ActiveTab ? colors.black : colors.BtnClr,
                      },
                    ]}
                  >
                    <ResponsiveText
                      textAlign={"center"}
                      color={item.id == ActiveTab ? colors.black : colors.white}
                      size={2.5}
                    >
                      {item.Time}
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <ResponsiveText
            weight={"bold"}
            color={colors.primary}
            size={4}
            margin={[10, 0, 0, 0]}
          >
            + Add Another Service
          </ResponsiveText>
          <View style={{ marginTop: hp(2) }}>
            {Data.map((item) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <ResponsiveText
                      color={colors.black}
                      size={3}
                      margin={[5, 0, 0, 0]}
                    >
                      {item.title}
                    </ResponsiveText>
                  </View>
                  <View>
                    <ResponsiveText
                      color={colors.primary}
                      size={3}
                      margin={[5, 15, 0, 0]}
                    >
                      {item.Price}
                    </ResponsiveText>
                  </View>
                  <TouchableOpacity
                    //  onPress={(()=>navigation.navigate(routeName.ORDER_PLACED))}
                    style={styles.Btn_style}
                  >
                    <ResponsiveText
                      textAlign={"center"}
                      color={colors.white}
                      size={2.5}
                      margin={[0, 0, 0, 0]}
                    >
                      Book
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: colors.lighterGrey,
                marginTop: hp(5),
              }}
            >
              <View style={{ flex: 1 }}>
                <ResponsiveText
                  color={colors.black}
                  size={4}
                  margin={[5, 0, 0, 0]}
                >
                  {"Total"}
                </ResponsiveText>
              </View>
              <View>
                <ResponsiveText
                  color={colors.primary}
                  weight={"bold"}
                  size={4}
                  margin={[5, 15, 0, 0]}
                >
                  {"£10.00"}
                </ResponsiveText>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <RnButton
              onPress={(() => navigation.navigate(routeName.ORDER_PLACED))}
              title={"Book"} />
          </View>
        </View>
      </ScrollView>
      {/* {loading ? <Loader /> : null} */}
    </SafeAreaView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  Cat_Style: {
    backgroundColor: "#83AD6A",
    height: hp(8),
    width: wp(18),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 10,
    margin: 2,
  },
  Img_Style: {
    height: hp(14),
    width: wp(45),
    marginTop: 10,
    margin: 3,
    borderRadius: 5,
  },
  Bg_Img_Style: {
    height: hp(22),
    width: wp(85),
    marginTop: 10,
    margin: 3,
    borderRadius: 5,
  },
  banner: {
    height: hp(23),
    width: wp(100),
    alignSelf: "center",
    marginVertical: hp(2),
  },
  Btn_style: {
    backgroundColor: colors.BtnClr,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 1,
    marginRight: 10,
  },
  sellerChat: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    // borderTopWidth:1
  },
  sellerProf: {
    flexDirection: "row",
    marginTop: 10,
    // borderTopWidth:1
  },
  Time_Btn: {
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },
});
