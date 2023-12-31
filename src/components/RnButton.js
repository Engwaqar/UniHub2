import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { handleMargin, handlePadding } from "../constants/theme";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";

const RnButton = ({
  backgroundColor,
  textColor,
  width,
  padding,
  margin,
  gradColor,
  height,
  borderRadius,
  title,
  fontFamily,
  onPress,
  position,
  isIconFalse,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : null}
      style={[
        styles.Btn,
        props.btnStyle ? props.btnStyle : undefined,
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        position && { alignSelf: position },
        backgroundColor && { backgroundColor },
        width && { width },

      ]}
      {...props}
    >
      {title && (
        <ResponsiveText
          size={3.7}
          padding={[0, 10]}
          fontFamily={fontFamily ? fontFamily : "Bold"}
          color={textColor ? textColor : colors.white}
        >
          {title}
        </ResponsiveText>
      )}
      {isIconFalse?
      null:
      <Icon tintColor={colors.white}
       source={globalPath.ForwardArrow} />
    }
      {props.children}
    </TouchableOpacity>
  );
};

export default RnButton;

const styles = StyleSheet.create({
  Btn: {
    // paddingHorizontal: 20,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf:'center',
    backgroundColor: colors.primary,
    height: hp(7),
    width:wp(85),
    flexDirection: "row",
  },
});
