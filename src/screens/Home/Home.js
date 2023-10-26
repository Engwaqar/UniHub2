import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { _exit_and_go_to_login } from "../../constants/Index";
import TabsView from "./TabsView";
import { routeName } from "../../constants/routeName";
import Dots from "../../components/Dots";
import ChatHeader from "../../components/ChatHeader";
import SmallButton from "../../components/SmallButton";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ChatHeader onPress={() => navigation.navigate(routeName.PROFILE)} />
      <View
        style={{
          paddingHorizontal: wp(5),
          flex: 0.8,
          justifyContent: "center",
        }}
      >
        <Dots style={{ marginBottom: hp(4) }} />
        <ResponsiveText
          textAlign="center"
          margin={[0, 0, hp(4), 0]}
          size={6.5}
          color={colors.black}
        >
          Choose Your category
        </ResponsiveText>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TabsView
            onPress={() => navigation.navigate(routeName.HUB_SERVICE_LIST)}
            source={globalPath.Hub}
            title={"HUB"}
          />
          <TabsView
            onPress={() => navigation.navigate(routeName.EVENT_LISTED)}
            source={globalPath.Event}
            title={"Events"}
          />
          <TabsView
            onPress={() => navigation.navigate(routeName.YOUR_PRODUCTS)}
            source={globalPath.MarketPlace}
            title={"Marketplace"}
          />
        </View>
        <SmallButton
          btnStyle={{ height: hp(5), width: wp(25), marginTop: hp(0.5) }}
          title={"Dashboard"}
          TextSize={3}
          onPress={() =>
            navigation.navigate(routeName.EVENTS_DASHBOARD)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(5) },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
