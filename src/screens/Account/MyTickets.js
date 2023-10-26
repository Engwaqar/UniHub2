import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import SmallButton from "../../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { getMyTickets } from "../../redux/actions/user.actions";
import RecordNotFound from "../../components/RecordnotFound";
import moment from "moment";
import { routeName } from "../../constants/routeName";
import InputText from "../../components/InputText";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";

const MyTickets = ({ navigation }) => {
  const dispatch = useDispatch();
  const [SentTicketView, setSentTicketView] = useState(false);
  const [selected, setSelected] = useState(null);
  const [email, setemail] = useState('')
  const [price, setprice] = useState('')
  const [isLoading, setLoading] = useState(false);

  const MyTickets = useSelector(
    (state) => state.userReducers.getMyTickets?.data
  );
  const loading = useSelector(
    (state) => state.userReducers.getMyTickets?.refreshing
  );

  console.log("getMyTickets", MyTickets);
  useEffect(() => {
    dispatch(getMyTickets());
  }, []);

  const Submit = async () => {
    if (email=='') {
      _toast('Email is required!')
      return false
    }else if (price=='') {
      _toast('Price is required!')
      return false
    }
    const formdata = new FormData();
    formdata.append("booking_id", selected.id);
    formdata.append("price", price);
    formdata.append("quantity", selected.quantity);
    formdata.append("currency", "gbp");
    formdata.append("email", email);

    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const res = await Api.post(urls.GENERATING_SELLING_QR, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        setSentTicketView(false);
        dispatch(getMyTickets());
        _toast(res.message);
        setemail('')
        setprice('')
        
      } else {
        _toast(res.message);
        setLoading(false);
        setSentTicketView(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
      setSentTicketView(false);
    }
  };

  const TransferTicket = async (qr) => {
   
    const formdata = new FormData();
  
    formdata.append("qr", qr);

    console.log("formdata", formdata);
    // return false;
    try {
      // setLoading(true);
      const res = await Api.post(urls.TRANSFER_EVENT_TICKET, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        setSentTicketView(false);
        dispatch(getMyTickets());
        _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);
        setSentTicketView(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
      setSentTicketView(false);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: hp(4) }}>
        <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
          My tickets
        </ResponsiveText>
        <ResponsiveText size={3.5} color={colors.grey1}>
          See your active tickets and generate your QR
        </ResponsiveText>
      </View>
      {SentTicketView ? (
        <>
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Email of Receiver"}
            placeholder={"Enter Email of Receiver"}
            onChangeText={(text)=>setemail(text)}
            value={email}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Ticket Price"}
            keyboardType={"numeric"}
            placeholder={"Enter Ticket Price"}
            onChangeText={(text)=>setprice(text)}
            value={price}

          />
          <SmallButton
            btnStyle={{ marginTop: hp(3), height: hp(4), width: wp(40) }}
            // margin={[0, 0, 10, 0]}
            title={"Send Request"}
            onPress={Submit}
          />
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: colors.lighterGrey,
            }}
          >
            <ResponsiveText weight={"bold"} size={3.5} color={colors.black}>
              Tickets List
            </ResponsiveText>
            <SmallButton
              btnStyle={{ height: hp(4), width: wp(40) }}
              // margin={[0, 0, 10, 0]}
              title={"Browse Events"}
              onPress={() =>
                navigation.navigate(routeName.HOME_STACK, {
                  screen: routeName.BROWSE_EVENT,
                })
              }
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: colors.lighterGrey,
              padding: 15,
              marginTop: hp(1),
            }}
          >
            <ResponsiveText size={3.3} color={colors.black}>
              Event
            </ResponsiveText>
            <ResponsiveText size={3.3} color={colors.black}>
              Date
            </ResponsiveText>
            <ResponsiveText size={3.3} color={colors.black}>
              Time
            </ResponsiveText>
            <ResponsiveText size={3.3} color={colors.black}>
              Action
            </ResponsiveText>
          </View>
          {MyTickets?.length > 0 ? (
            MyTickets.map((item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={styles.box}>
                    <ResponsiveText
                      fontFamily={"bold"}
                      size={3}
                      color={colors.black}
                    >
                      {item?.event?.title}
                    </ResponsiveText>
                  </View>
                  <View style={styles.box}>
                    <ResponsiveText size={2.5} color={colors.black}>
                      {moment(item?.event?.date_time).format("DD MMM YYYY")}
                    </ResponsiveText>
                  </View>
                  <View style={styles.box}>
                    <ResponsiveText size={2.7} color={colors.primary}>
                      {moment(item?.event?.date_time).format("hh:mm A")}
                    </ResponsiveText>
                  </View>
                  <View style={styles.box}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(routeName.QR_CODE,item.qr_code)
                      }}>
                      <ResponsiveText size={2.5} color={colors.primary}>
                        QR Code
                      </ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(item);
                        setSentTicketView(true);
                      }}
                      style={{ marginTop: 10 }}
                    >
                      <ResponsiveText size={2.5} color={colors.primary}>
                        Transfer
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : loading == false ? (
            <RecordNotFound />
          ) : null}
        </>
      )}
      {/* {loading ? <Loader /> : null} */}
    </View>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  Tran_box: {
    // width: wp(15),
    // alignItems: "center",
    paddingVertical: hp(4),
  },
});
