import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { _toast } from "../../constants/Index";

import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import RnButton from "../../components/RnButton";
import { currency } from "../../constants/constantVeriable";
import { routeName } from "../../constants/routeName";
const IncomingTicketDetail = ({ navigation, route }) => {
  const item = route.params;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.NOTIFICATION_BY_ID + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        setData(res);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const acceptTicket = async (qr) => {
    const formdata = new FormData();
    formdata.append("qr", qr);
    console.log("formdata", formdata);
    try {
      setLoading(true);
      const res = await Api.post(urls.TRANSFER_EVENT_TICKET, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        navigation.navigate(routeName.CONFIRM_PAYMENT, {
            itemDetail: data,
            intent: res.intent,
           
          });
        setLoading(false);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Ticket Detail"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText size={3} color={colors.grey1}>
            Someone just placed an order, details are following, please Accept
            if you are able to fulfil it, otherwise reject it so we Will notify
            the buyer that you are currently not able to fulfil it.{" "}
          </ResponsiveText>
          <ResponsiveText
            margin={[20, 0, 0, 0]}
            color={colors.primary}
            size={5}
            weight={"bold"}
          >
            {"Ticket details"}
          </ResponsiveText>
          {Object.keys(data).length > 0 ? (
            <View style={{ marginLeft: wp(5) }}>
              <ResponsiveText
                color={colors.black}
                margin={[hp(2), 0, 0, 0]}
                size={3.5}
              >
                {data?.event.title}
              </ResponsiveText>
              <ResponsiveText
                color={colors.black}
                margin={[hp(2), 0, 0, 0]}
                size={3.5}
              >
                {"Quantity  "}
                {data.quantity}
              </ResponsiveText>
              <ResponsiveText
                color={colors.primary}
                margin={[hp(2), 0, hp(5), 0]}
                size={3.5}
              >
                {" "}
                {currency}
                {data.offer_price}
              </ResponsiveText>

              <RnButton
                onPress={() => acceptTicket(data.qr)}
                title={"Accept"}
              />
            </View>
          ) : null}
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default IncomingTicketDetail;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
