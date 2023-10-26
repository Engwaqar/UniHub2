import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View ,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { currency } from "../../constants/constantVeriable";
import Dots from "../../components/Dots";
import { routeName } from "../../constants/routeName";
import Loader from "../../components/Loader";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTicketNotification } from "../../redux/actions/user.actions";
const IncomingTicket = ({ navigation }) => {
  const dispatch = useDispatch();
  const TicketNotification = useSelector(
    (state) => state.userReducers.TicketNotification.data
  );
  const loading = useSelector(
    (state) => state.userReducers.TicketNotification.refreshing
  );
  console.log("TicketNotification", TicketNotification);
  useEffect(() => {
    dispatch(getTicketNotification());
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Incoming Ticket"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText size={3} color={colors.grey1}>
            Someone just transferred a ticket and you can see the details of the
            ticket below.After accepting it ,the price of the ticket will be
            deducted and your account will be charged for it.{" "}
          </ResponsiveText>
          <ResponsiveText
            margin={[20, 0, 0, 0]}
            color={colors.primary}
            size={5}
            weight={"bold"}
          >
            {"Ticket Requests"}
          </ResponsiveText>
          {TicketNotification?.length > 0
            ? TicketNotification.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        routeName.INCOMING_TICKET_DETAIL,
                        item
                      )
                    }
                    style={{
                      marginTop: wp(2),
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: colors.white,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View>
                      <ResponsiveText>
                        Ticket Number:{" "}
                        <ResponsiveText color={colors.grey1}>
                          {" "}
                          #{item.ticket_id}
                        </ResponsiveText>
                      </ResponsiveText>
                      <ResponsiveText margin={[10, 0, 0, 0]}>
                        Ticket Price:{" "}
                        <ResponsiveText color={colors.grey1}>
                          {" "}
                          {currency}
                          {item.price}
                        </ResponsiveText>
                      </ResponsiveText>
                    </View>
                    <ResponsiveText size={3} color={colors.grey1}>
                      {moment(item.created_at).format("Do MMM YYYY")}
                    </ResponsiveText>

                    {/* <TouchableOpacity onPress={()=>navigation.navigate(routeName.INCOMING_TICKET_DETAIL)}>
                                    <ResponsiveText margin={[20, 0, 0, 0]} color={colors.black} size={4}  >{'EVENT TITLE GOES HERE'}</ResponsiveText>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', marginTop: hp(2), }}>
                                        <ResponsiveText color={colors.black} size={3.5} flex={1} >{'Event details goes here so you can check it .'}</ResponsiveText>
                                        <ResponsiveText color={colors.black} margin={[0, 0, 0, wp(8)]} size={3.5} flex={0.8}  >{moment(item.created_at).format("Do MMM YYYY")}</ResponsiveText>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: hp(2), justifyContent: 'space-around', borderBottomWidth: 1, borderColor: colors.lighterGrey }}>
                                        <SmallButton
                                            btnStyle={{ height: hp(4), width: wp(30), marginBottom: hp(2) }}
                                            title={"Accept"}
                                         onPress={()=>getDatabyId(item.id)}
                                        />
                                        <SmallButton
                                            backgroundColor={colors.red}
                                            btnStyle={{ height: hp(4), width: wp(30), marginBottom: hp(2) }}
                                            title={"Reject"}
                                        // onPress={Submit}
                                        />
                                    </View> */}
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default IncomingTicket;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
