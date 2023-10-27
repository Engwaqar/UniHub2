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
    <View
      style={{
        // marginHorizontal: 10,
        flexDirection:'row',
        justifyContent:'flex-end'
      }}
    >
      <TouchableOpacity
       onPress={props.ChatNav}>
        <Icon margin={[0,10,0,0]}
          borderRadius={30}
          size={30}
          resizeMode={"contain"}
          source={globalPath.Chat}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={props.onPress}>
        <Icon
          borderRadius={30}
          size={30}
          resizeMode={"contain"}
          source={globalPath.ProfileIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnBack: {
    backgroundColor: colors.green5,
    padding: 0,
    borderRadius: 45,
    marginRight: 5,
  },
});
