import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import QRCode from "react-native-qrcode-svg";
import { wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";

const QRCodeScreen = ({ navigation, route }) => {
  const qr = route.params ? route.params : "anything";
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.grey6 }}
      edges={["top", "left", "right"]}
    >
      <MainHeader navigation={navigation} title={"QR Code"} />
      <View style={styles.mainContainer}>
        <QRCode
          color={colors.white}
          backgroundColor={colors.grey6}
          size={wp(60)}
          value={qr}
        />
      </View>
    </SafeAreaView>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.grey6,
    justifyContent: "center",
    alignItems: "center",
  },
});
