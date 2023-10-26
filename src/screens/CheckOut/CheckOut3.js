import React, { useEffect, useState, BackHandler } from "react";
import { Alert, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
const CheckOut3 = ({ navigation }) => {
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
                        marginTop: hp(10),
                        marginBottom: hp(4),
                        marginHorizontal: wp(5),
                    }}
                >
                    
                    <ResponsiveText textAlign={'center'} weight={"bold"} size={8} color={colors.primary}>
                        Order Placed!{" "}
                    </ResponsiveText>
                </View>
                <View style={{ height: hp(10) }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CheckOut3;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { height: hp(20), marginTop: 15 },
});

