import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import RadioButton from "../../components/RadioButton";

const PackageTabs = ({ title, source, onPress, price, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.IconStyle}>
            <ResponsiveText size={2.3} color={colors.black} >{title}</ResponsiveText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 5 }} >
                <ResponsiveText  size={2.5} color={colors.grey1} >{price}</ResponsiveText>
                <RadioButton onPress={onPress} checked={isSelected} />
            </View>
        </TouchableOpacity>
    );
};

export default PackageTabs;

const styles = StyleSheet.create({
    IconStyle: {
        backgroundColor: colors.background,
        width: wp(25),
        height: hp(9),
        borderRadius: wp(3),
        padding: wp(3),
        borderColor: colors.primary,
        borderWidth: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
});
