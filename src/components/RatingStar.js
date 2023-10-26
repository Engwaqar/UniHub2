import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { colors } from "../constants/colorsPallet";

const RatingStar = ({ data }) => {
    return (
        <>
            <Rating
                type="custom"
                ratingColor={colors.yellow}
                ratingBackgroundColor={colors.grey1}
                ratingCount={5}
                tintColor={colors.lighterGrey}
                imageSize={13}
                // startingValue={itrating}
                readonly
            />
        </>
    );
};

export default RatingStar;

const styles = StyleSheet.create({
    advertisementBannerImage: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    advertisementBannerTitleOverlay: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,

        // backgroundColor:  'rgba(52, 52, 52, 0.7)',
        opacity: 1,
        padding: 10,
    },
});
