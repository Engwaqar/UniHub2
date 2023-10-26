import {
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Image
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
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import RnButton from "../../components/RnButton";
import Swiper from 'react-native-swiper'
import ServiceSwiper from "../Home/ServiceSwiper";
import RatingStar from "../../components/RatingStar";


const HubServiceProDetl = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Services');
    const DataImg = [
        {
            id: 1,
            url: require('../../assets/icons/image.jpeg'),
        },
        {
            id: 2,
            url: require('../../assets/icons/image.jpeg'),
        },
        {
            id: 3,
            url: require('../../assets/icons/image.jpeg'),
        },
        {
            id: 4,
            url: require('../../assets/icons/image.jpeg'),
        },
    ];
    const Data = [
        {
            id: 1,
            title: 'Nails 1',
            Price: '£10.00'
        },

        {
            id: 2,
            title: 'Nails 2',
            Price: '£10.00'
        },
        {
            id: 3,
            title: 'Nails 3',
            Price: '£10.00'
        },
        {
            id: 4,
            title: 'Nails 4',
            Price: '£10.00'
        },
        {
            id: 5,
            title: 'Nails 5',
            Price: '£10.00'
        },
    ];
    const Meg_Data = [
        {
            id: 1,
            Name: 'John Snow',
            Meg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        },

        {
            id: 2,
            Name: 'John Snow',
            Meg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        },
    ];
    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Hub Service Detail"} />
            <View
                style={{
                    margin: wp(5),
                }}
            >
                <View style={styles.banner}>
                    <ServiceSwiper data={DataImg} />
                </View>
                <ResponsiveText weight={'bold'} color={colors.black} size={4} margin={[0, 0, 5, 0]}>Business Details Goes Here</ResponsiveText>
                <ResponsiveText color={colors.black} size={2.7} margin={[0, 0, 0, 0]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </ResponsiveText>
                <View
                    style={{ flexDirection: 'row', marginTop: hp(2) }}
                >
                    <TouchableOpacity onPress={() => setActiveTab('Services')}>
                        <ResponsiveText color={activeTab == 'Services' ? colors.primary : colors.grey1} weight={'bold'} size={5} margin={[0, 0, 0, 0]}>Services</ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Reviews')}>
                        <ResponsiveText color={activeTab == 'Reviews' ? colors.primary : colors.grey1} weight={'bold'} size={5} margin={[0, 0, 0, 20]}>Reviews</ResponsiveText>
                    </TouchableOpacity>
                </View>
                {activeTab == 'Services' ?
                    <View style={{ marginTop: hp(2) }}>
                        {Data.map((item) => {
                            return (
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flex: 1 }}>
                                        <ResponsiveText color={colors.black} size={3} margin={[5, 0, 0, 0]}>{item.title}</ResponsiveText>
                                    </View>
                                    <View>
                                        <ResponsiveText color={colors.primary} size={3} margin={[5, 15, 0, 0]}>{item.Price}</ResponsiveText>
                                    </View>
                                    <TouchableOpacity style={styles.Btn_style}
                                        onPress={() => navigation.navigate(routeName.BOOK_APPOINTMENT)}
                                    >
                                        <ResponsiveText textAlign={'center'} color={colors.white} size={2.5} margin={[0, 0, 0, 0]}>Book</ResponsiveText>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                    :
                    <View>
                        {Meg_Data.map((item) => {
                            return (
                                <View style={{ backgroundColor: colors.lighterGrey, borderRadius: 10, marginTop: hp(2) }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <ResponsiveText color={colors.black} size={3} margin={[5, 0, 0, 10]}>{item.Name}</ResponsiveText>
                                        <View style={{ marginRight: 10, marginTop: 5 }}>
                                            <RatingStar />
                                        </View>
                                    </View>
                                    <ResponsiveText color={colors.black} size={2} margin={[5, 0, 10, 10]}>{item.Meg}</ResponsiveText>
                                </View>
                            )
                        })}

                    </View>
                }
                <View style={styles.sellerChat}>
                    <ResponsiveText size={3.5} weight={"bold"} color={colors.black}>
                        Seller
                    </ResponsiveText>
                    <TouchableOpacity
                        style={{ flexDirection: "row" }}

                    >
                        <ResponsiveText
                            margin={[0, 10, 0, 0]}
                            weight={"bold"}
                            size={3}
                            color={colors.grey1}
                        >
                            Chat with seller
                        </ResponsiveText>
                        <Icon
                            size={20}
                            source={globalPath.Chat}
                            tintColor={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.sellerProf}

                >
                    <Icon
                        borderRadius={wp(25)}
                        size={45}
                        defaultSource={globalPath.ProfileIcon}
                        backgroundColor={colors.grey1}
                    // source={{ uri: urls.IMG_BASE_URL + itemDetail?.user?.profile_img }}
                    />
                    <ResponsiveText
                        weight={"bold"}
                        margin={[hp(2), 0, 0, 5]}
                        flex={1}
                        size={3.5}
                        color={colors.black}
                    >
                        {'Robert H.'}
                    </ResponsiveText>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: colors.lighterGrey,
                            width: wp(22),
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            height: wp(6),
                            marginTop: 5,
                        }}
                    >
                        <Icon
                            size={13}
                            source={globalPath.Star}
                            tintColor={colors.primary}
                        />
                        <ResponsiveText weight={"bold"} size={3} color={colors.black}>
                            {"4.2"}
                            |
                        </ResponsiveText>
                        <ResponsiveText size={3} color={colors.grey1}>
                            {" "}
                            {'140'}
                        </ResponsiveText>
                    </View>
                </TouchableOpacity>
            </View>
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    );
};

export default HubServiceProDetl;

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
        margin: 2
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
    },
    banner: {
        height: hp(23),
        width: wp(100),
        alignSelf: "center",
        marginVertical: hp(2),
    },
    Btn_style: {
        backgroundColor: colors.BtnClr,
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 1,
        marginRight: 10
    },
    sellerChat: {
        flexDirection: "row",
        marginTop: 50,
        justifyContent: "space-between",
        // borderTopWidth:1
    },
    sellerProf: {
        flexDirection: "row",
        marginTop: 10,
        // borderTopWidth:1
    },
});
