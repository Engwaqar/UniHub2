import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, ScrollView, View, BackHandler, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import moment from "moment/moment";
const OrderPlaced = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          // Handle the back button press here, for example, show an alert or prevent going back.
          // You can perform your custom logic here.
          return true; // Return true to prevent default back button behavior (e.g., going back to the previous screen).
        });
    
        return () => backHandler.remove(); // Clean up the event listener when the component is unmounted.
      }, []);
    
    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <ScrollView>
                {/* <MainHeader navigation={navigation} title={"Order Placed"} /> */}
                <View
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(4),
                        marginHorizontal: wp(5),
                    }}
                >
                    <Dots style={{ marginVertical: hp(3) }} />
                    <ResponsiveText weight={"bold"} size={4.5} color={colors.primary}>
                        Your Order is Placed, Checkout The following details of your Order.{" "}
                    </ResponsiveText>
                    <View style={{ flexDirection: 'row', borderColor: colors.lighterGrey, marginTop: hp(3) }}>
                        <ResponsiveText color={colors.black} size={3.5} weight={'bold'} >{'Order Number: '}</ResponsiveText>
                        <ResponsiveText color={colors.black}  size={3.5} weight={'bold'} >{'A2234FA1'}</ResponsiveText>
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: colors.lighterGrey, marginTop: hp(2) }}>
                        <ResponsiveText color={colors.black} size={3.5} weight={'bold'} >{'Order Date: '}</ResponsiveText>
                        <ResponsiveText color={colors.black}  size={3.5} weight={'bold'} >{moment(new Date).format('LL')}</ResponsiveText>
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: colors.lighterGrey, marginTop: hp(2) }}>
                        <ResponsiveText color={colors.black} size={3.5} weight={'bold'} >{'Delivery Date: '}</ResponsiveText>
                        <ResponsiveText color={colors.black}  size={3.5} weight={'bold'} >{'01 January 2023'}</ResponsiveText>
                    </View>
                    <ResponsiveText color={colors.black} size={3.5} weight={'bold'} margin={[10, 0, 0, 0]}>{'Details:'}</ResponsiveText>
                    <ResponsiveText color={colors.black} size={3.5} weight={'bold'} >{'Service X [1x]'}</ResponsiveText>
                    <ResponsiveText color={colors.black}  size={3.5} weight={'bold'}>{'Service 2 [4x]'}</ResponsiveText>
                </View>
                <View style={{ height: hp(10) }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderPlaced;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { height: hp(20), marginTop: 15 },
});

