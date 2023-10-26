import { Alert, StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";

import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import RnButton from "../../components/RnButton";
import { useDispatch, useSelector } from "react-redux";
import AllCards from "../Account/AllCards";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { getMyOrder, getMyTickets, getTicketNotification } from "../../redux/actions/user.actions";
import moment from "moment";
import Loader from "../../components/Loader";
import { currency } from "../../constants/constantVeriable";
import { routeName } from "../../constants/routeName";

const ConfirmPayment = ({ navigation,route }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const { itemDetail,intent, phone, address } = route.params;
  const toggel = (url) => {
    Alert.alert("Confirm Payment", "Do you want to pay?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          confirmPay(url);
        },
      },
    ]);
  };
  const confirmPay = async (url) => {
    console.log("url", url);
    var requestOptions = {
      method: "GET",
      // headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log("-----------Payment--------", result))
      .catch((error) => {
        console.log("error", error);
        dispatch(getMyTickets());
        dispatch(getTicketNotification());

        _toast('Payment Successfull');

        navigation.replace(routeName.HOME)
      });
  };
  const Submit = async () => {
    const formdata = new FormData();
    formdata.append("payment_intent", intent);
    formdata.append("address", '');
    formdata.append("phone", '');

    try {
      setLoading(true);
      const res = await Api.post(urls.CONFIRM_PAYEMENT, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        toggel(res.payment.next_action.use_stripe_sdk.stripe_js);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Event Booking"} />

        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />

          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Booking Summary
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={2.8}
            color={colors.grey1}
          >
            Confirm your booking details
          </ResponsiveText>

          
          <ResponsiveText
            size={3.4}
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            color={colors.black}
          >
            Payment Details
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(0),
            }}
          >
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              color={colors.black}
            >
              Total:
            </ResponsiveText>
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              color={colors.primary}
            >
              {currency}{itemDetail.price}
            </ResponsiveText>
          </View>
          <AllCards />
          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Pay"}
            onPress={Submit}
          />
        </View>
      </ScrollView>
      {loading?<Loader/>:null}
    </SafeAreaView>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
  },
  box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  ImgStyle: {
    marginTop: hp(1),
    height: hp(18),
    width: wp(88),
    resizeMode: "contain",
    // marginBottom: 20,
    // alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 6,
  },
});
