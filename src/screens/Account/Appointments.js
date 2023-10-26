import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ResponsiveText from "../../components/RnText";
import { colors, } from "../../constants/colorsPallet";
import { hp, wp, screenWidth } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { useDispatch, useSelector } from "react-redux";
import { getAppoinments } from "../../redux/actions/user.actions";
import { routeName } from "../../constants/routeName";
import Modal from "react-native-modal";
import SmallButton from "../../components/SmallButton";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";

const Appointments = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [paymentIntentSelected, setpaymentIntentSelected] = useState(null)

  const dispatch = useDispatch();
  const MyAppointments = useSelector(
    (state) => state.userReducers.AppointmentsList?.data
  );
  const loading = useSelector(
    (state) => state.userReducers.AppointmentsList?.refreshing
  );

  console.log("MyAppointments", MyAppointments);
  useEffect(() => {
    dispatch(getAppoinments());
  }, []);
 
  const Submit = async () => {
 
    const formdata = new FormData();
    formdata.append("payment_intent", paymentIntentSelected);
    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const res = await Api.post(urls.CANCEL_SERVICE, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        setModalVisible(false)
        dispatch(getAppoinments());
        _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);
        setModalVisible(false)
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
      setModalVisible(false)
    }
  };
  const Data = [
    {
      id: 1,
      userName: 'Arslan A.',
      title: 'Cleaner',
      date_time: '08:00 AM-05:00 PM'
    },
    {
      id: 2,
      userName: 'Arslan A.',
      title: 'Cleaner',
      date_time: '08:00 AM-05:00 PM'
    },
    {
      id: 3,
      userName: 'Arslan A.',
      title: 'Cleaner',
      date_time: '08:00 AM-05:00 PM',
    },

  ];
  return (
    <>
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
              backgroundColor: colors.ModelClr,
              borderRadius: 30,
              shadowColor: "#000",
              height:hp(40),
              
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: 0.70 * screenWidth,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  padding: 10,
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
            <ResponsiveText textAlign={'center'} margin={[0,10,0,10]} color={colors.black} size={3.5}>
              Keep in mind that Non{'\n'} Refundable Deposit and Service 
              {'\n'}Charges will not be Refunded.
            </ResponsiveText>
            <ResponsiveText margin={[10,0,10,0]} textAlign={'center'} color={colors.black} size={3.5}>
             Do you still want to cancel{'\n'} Your appointment?
            </ResponsiveText>
            <SmallButton
              btnStyle={{ height: hp(5), width: wp(30) }}
              title={"Yes"}
            onPress={Submit}
            />
            <SmallButton
              backgroundColor={colors.grey1}
              margin={[hp(2)]}
              btnStyle={{ height: hp(5), width: wp(30) }}
              title={"No"}
            onPress={() => {
              setModalVisible(false);
            }}
            />
          </View>
        </View>
      </Modal>
      <View>
        <ResponsiveText color={colors.primary} size={4} weight="bold">
          Manage Your Appointments
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
          View, reschedule or cancel your bookings and easily book again.
        </ResponsiveText>

        {MyAppointments?.length > 0 ? (
          MyAppointments.map((item, index) => (
            <View style={[styles.listView, { backgroundColor: index % 2 === 0 ? colors.lightgreen : colors.white }]}>
              <ResponsiveText size={3.5}>
                {item.userName}({item.date_time})
              </ResponsiveText>
              <ResponsiveText size={3.5}>
                {item.service.title}
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => {
                  setpaymentIntentSelected(item.stripe_payment_intent)
                  setModalVisible(!isModalVisible);
                }}
                style={{ alignItems: 'flex-end', }}>
                <ResponsiveText
                 textDecorationLine= 'underline' 
                 size={3}>
                  {'Cancel'}
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <>
            <ResponsiveText
              margin={[hp(5), 0, 5, 0]}
              color={colors.grey1}
              size={2.8}
            >
              You’ve got nothing booked at the moment.
            </ResponsiveText>
          </>
        )}

        <RnButton
          onPress={() =>
            navigation.navigate(routeName.HUB_SERVICE, {
              screen: routeName.ServiceProvider,
              params:routeName.PROFILE
            })
          }
          margin={[hp(5), 0, 0, 0]}
          title={"Check Out Our Services"}
        />
      </View>
    </>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  listView: {
    // backgroundColor: colors.lightgreen,
    // width: wp(100),
    // alignItems: "center",
    paddingTop:10,
    paddingHorizontal: 30,
    padding: 5,
    // borderRadius: 15,
    marginTop: hp(2),

  },
});
