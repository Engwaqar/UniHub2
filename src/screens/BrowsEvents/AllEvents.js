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
import Input from "../../components/Input";
const Data = [
    {
        id: 1,
        title: 'Business Details Goes Here',
        url: require('../../assets/icons/image.jpeg'),
        Des:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, '
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
const AllEvents = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Events"} />
            <View
                style={{
                    marginTop: hp(2),
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
                
                <View style={{ flexDirection: 'row' ,marginVertical:20,justifyContent:'space-between',width:wp(90),}}>
                    <ResponsiveText  >Event of the Month</ResponsiveText>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[0, 10, 0, 0]} size={2.7} color={colors.grey1}>Sort by:</ResponsiveText>
                    <ResponsiveText  size={3.3} >Highly Rated ⌄</ResponsiveText>

                    </TouchableOpacity>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {Data.map((item) => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate('Ticket1')}>
                                <ImageBackground borderRadius={10} style={styles.Bg_Img_Style}
                                    source={item.url}
                                >
                                        <ResponsiveText size={3.5}  color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2.3} margin={[10,0,20,0]} color={colors.white}>{item.Des}</ResponsiveText>

                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[10, 0, 0, 0]}>Events Near You</ResponsiveText>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {DataImg.map((item) => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate('Ticket1')}>
                                <ImageBackground borderRadius={10} style={styles.Img_Style}
                                    source={item.url}
                                >
                                        <ResponsiveText size={2.5} margin={[0,0,0,5]} color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2} margin={[0,0,0,5]} color={colors.white}>{item.Des}</ResponsiveText>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <ResponsiveText margin={[10, 0, 0, 0]}>Upcoming Events</ResponsiveText>
                </View>
                <ScrollView horizontal style={{ flexDirection: 'row' }}>
                    {DataImg.map((item) => {
                        return (
                            <TouchableOpacity onPress={()=>navigation.navigate('Ticket1')}>
                                <ImageBackground borderRadius={10} style={styles.Img_Style}
                                    source={item.url}
                                >
                                        <ResponsiveText size={2.5} margin={[0,0,0,5]} color={colors.white}>{item.title}</ResponsiveText>
                                        <ResponsiveText size={2} margin={[0,0,0,5]} color={colors.white}>{item.Des}</ResponsiveText>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    );
};

export default AllEvents;

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
        padding:10,
        margin: 3,
        borderRadius: 5,
        justifyContent:'flex-end'

    },
    Bg_Img_Style: {
        height: hp(22),
        width: wp(85),
        marginTop: 10,
        padding:10,
        margin: 3,
        borderRadius: 5,
        justifyContent:'flex-end'
    }
});
