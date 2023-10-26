import {
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import { hp, wp } from "../../helpers/Responsiveness";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import ResponsiveText from "../../components/RnText";
import Loader from "../../components/Loader";
import { colors } from "../../constants/colorsPallet";
import { Rating } from "react-native-ratings";
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
const Data = [
    {
        id: 1,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. '
    },

];
const DataImg = [
    {
        id: 1,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '
    },

    {
        id: 2,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '

    },
    {
        id: 3,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '

    },
    {
        id: 4,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '

    },
    {
        id: 5,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '

    },
   

];
const HubServicesDetail = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Hub Service Detail"} />
            <View
                style={{
                    marginTop: hp(3),
                    marginBottom: hp(4),
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder={'Search...'}
                    backgroundColor="#00000029"
                    height={hp(5)}
                    width={wp(60)}
                    searchBox />
                
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[10, 0, 0, 0]}>Deal of the day</ResponsiveText>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {Data.map((item) => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate(routeName.HUB_SERVICE_PRO_DETAIL)}>
                                <ImageBackground borderRadius={10} style={styles.Bg_Img_Style}
                                    source={item.url}
                                >
                                    <View style={{ justifyContent: 'center',flex:1,marginTop:hp(5) }}>
                                        <ResponsiveText size={3.5} margin={[0,0,0,10]} color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2.5} margin={[5,0,0,10]} color={colors.white}>{item.Des}</ResponsiveText>

                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[10, 0, 0, 0]}>Nails</ResponsiveText>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {DataImg.map((item) => {
                        return (
                            <View>
                                <ImageBackground borderRadius={10} style={styles.Img_Style}
                                    source={item.url}
                                >
                                    <View style={{ justifyContent: 'center',flex:1,marginTop:hp(5) }}>
                                        <ResponsiveText size={2.5} margin={[0,0,0,5]} color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2} margin={[0,0,0,5]} color={colors.white}>{item.Des}</ResponsiveText>

                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[10, 0, 0, 0]}>Barber</ResponsiveText>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {DataImg.map((item) => {
                        return (
                            <View>
                                <ImageBackground borderRadius={10} style={styles.Img_Style}
                                    source={item.url}
                                >
                                    <View style={{ justifyContent: 'center',flex:1,marginTop:hp(5) }}>
                                        <ResponsiveText size={2.5} margin={[0,0,0,5]} color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2} margin={[0,0,0,5]} color={colors.white}>{item.Des}</ResponsiveText>

                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    );
};

export default HubServicesDetail;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    Cat_Style: {
        backgroundColor: '#83AD6A',
        height: hp(8),
        width: wp(18),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 10,
        margin: 2,
    },
    Img_Style: {
        height: hp(14),
        width: wp(45),
        marginTop: 10,
        margin: 3,
        borderRadius: 5
    },
    Bg_Img_Style: {
        height: hp(22),
        width: wp(85),
        marginTop: 10,
        margin: 3,
        borderRadius: 5
    }
});
