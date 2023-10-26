import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import { routeName } from "../constants/routeName";

export default function ChatHeader(props) {

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        alignItems: 'flex-end',
        marginHorizontal: 10,
      }}
    >
      <Icon
        borderRadius={30}
        size={30}
        resizeMode={"contain"}
        source={globalPath.ProfileIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  btnBack: {
    backgroundColor: colors.green5, padding: 0, borderRadius: 45, marginRight: 5
  }
});
