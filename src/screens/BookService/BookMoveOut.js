import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { _toast } from "../../constants/Index";

const BookMoveOut = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const expressions = {
    email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  };
  const Validation = () => {
    if (email === "") {
      _toast("Email is required");
      return false;
    } else if (!expressions.email.test(email) || email.includes(" ")) {
      _toast(email === "" ? "Email is required" : "Invalid Email");
      return false;
    } else {
      _toast("Coming Soon!");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Book a Service"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Book Move Out{" "}
          </ResponsiveText>

          <ResponsiveText
            size={3.5}
            margin={[hp(3), 0, 0, 0]}
            weight={"bold"}
            color={colors.black}
          >
            Coming Soon!
          </ResponsiveText>
          <ResponsiveText
            size={3.5}
            margin={[hp(5), 0, 0, 0]}
            weight={"bold"}
            color={colors.black}
          >
            Be the first to know
          </ResponsiveText>
          <ResponsiveText
            size={3}
            // weight={'bold'}
            color={colors.black}
          >
            Subscribe to our newsletter to receive news and updates.
          </ResponsiveText>
        </View>
        <View
          style={{
            marginBottom: hp(4),
          }}
        >
          <ResponsiveText
            size={3.5}
            margin={[0, 0, hp(1.5), hp(3)]}
            // weight={'bold'}
            color={colors.black}
          >
            Enter your email here
          </ResponsiveText>
          <InputText
            Text={"Email Address*"}
            placeholder={"Email Address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Subscribe"}
          onPress={Validation}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookMoveOut;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
