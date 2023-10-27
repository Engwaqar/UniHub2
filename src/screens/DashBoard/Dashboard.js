import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import { currency } from "../../constants/constantVeriable";
import SalesCard from "../Account/SalesCard";
import MainHeader from "../../components/MainHeader";
import SmallButton from "../../components/SmallButton";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import { Calendar } from "react-native-calendars";
import moment from "moment/moment";
import Graph from "../../components/Graph";
import SmallDropDown from "../../components/SmallDropDown";

const Dashboard = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const mycat = [
    { id: 1, title: "Hub" },
    { id: 2, title: "Event" },
    { id: 3, title: "MarketPlace" },
  ];
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Dashboard"} />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: wp(5),
            justifyContent: "center",
          }}
        >
          <View style={{ marginTop: 20 }}>
            <SmallDropDown
              borderColor={colors.black}
              width={wp(17)}
              height={hp(2.4)}
              data={mycat.map((v) => v.title)}
              onSelect={(item) => {
                var id = mycat.find((v) => v.title == item)?.id;
                setSelectedCategory(id);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: hp(2),
            }}
          >
            <SmallButton
              fontFamily={"100"}
              btnStyle={{ height: hp(4), width: wp(33), marginTop: hp(0.5) }}
              title={"Withdraw funds"}
              TextSize={3}
              //   onPress={() => navigation.navigate(routeName.EVENTS_DASHBOARD)}
            />
            <SmallButton
              fontFamily={"100"}
              btnStyle={{ height: hp(4), width: wp(33), marginTop: hp(0.5) }}
              title={"Add New Event"}
              TextSize={3}
              //   onPress={() => navigation.navigate(routeName.EVENTS_DASHBOARD)}
            />
          </View>
          <View style={styles.Card_View}>
            <View style={{ marginTop: 10 }}>
              <SmallDropDown
                borderColor={colors.black}
                width={wp(17)}
                height={hp(2.4)}
                data={mycat.map((v) => v.title)}
                onSelect={(item) => {
                  var id = mycat.find((v) => v.title == item)?.id;
                  setSelectedCategory(id);
                }}
              />
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>Total Events:</ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, hp(5)]}>
                09
              </ResponsiveText>
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>Total Revenue:</ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, hp(5)]}>
                $123
              </ResponsiveText>
            </View>
            <View style={styles.box}>
              <ResponsiveText fontFamily={"100"}>
                Current Balance:
              </ResponsiveText>
              <ResponsiveText fontFamily={"100"} margin={[0, 0, 0, hp(5)]}>
                $5,789
              </ResponsiveText>
            </View>
            <View style={{ alignItems: "center", marginTop: hp(2) }}>
              <Graph />
            </View>
          </View>
          <View style={styles.Card_View}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: wp(5),
                alignItems: "center",
                marginTop: hp(2),
              }}
            >
              <ResponsiveText>All Event</ResponsiveText>
              <SmallDropDown
                borderColor={colors.black}
                width={wp(17)}
                height={hp(2.4)}
                data={mycat.map((v) => v.title)}
                onSelect={(item) => {
                  var id = mycat.find((v) => v.title == item)?.id;
                  setSelectedCategory(id);
                }}
              />
              <Icon
                margin={[0, 0, 0, 0]}
                size={30}
                source={globalPath.Filer_Icon}
                tintColor={colors.grey1}
              ></Icon>
            </View>
            {[0, 0, 0]?.length > 0 ? (
              <View style={{ marginTop: hp(1) }}>
                {[0, 0, 0].map((item) => (
                  <SalesCard
                    onPress={() =>
                      navigation.navigate(routeName.ORDER_SUMMARY, item)
                    }
                    type={item.paid == 1}
                    title={"Order #" + item.id}
                    date={item.created_at}
                    price={item.total + " " + currency}
                  />
                ))}
              </View>
            ) : (
              <ResponsiveText
                margin={[hp(5), 0, 0, 0]}
                color={colors.black}
                size={3}
              >
                You haven’t placed any orders yet.
              </ResponsiveText>
            )}
          </View>
          <View style={styles.Card_View}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <ResponsiveText margin={[10, 0, 7, 0]} size={5}>
                Events
              </ResponsiveText>
              <SmallDropDown
                borderColor={colors.black}
                width={wp(17)}
                height={hp(2.4)}
                data={mycat.map((v) => v.title)}
                onSelect={(item) => {
                  var id = mycat.find((v) => v.title == item)?.id;
                  setSelectedCategory(id);
                }}
              />
            </View>

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
                borderRadius: 15,
                height: hp(38),
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
          </View>
          <SmallButton
            fontFamily={"100"}
            btnStyle={{ height: hp(5), width: wp(33), marginTop: hp(3) }}
            title={"Scan"}
            TextSize={4}
            onPress={() => navigation.navigate(routeName.BARCODE_READER)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(5) },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(1.5),
  },
  Card_View: {
    backgroundColor: colors.white,
    marginTop: hp(2),
    borderRadius: 20,
  },
});
