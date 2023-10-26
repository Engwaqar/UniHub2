import { StyleSheet, View, Image, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import { globalPath } from "../../constants/globalPath";
import PackageTabs from "../Home/PackageTabs";
import RnButton from "../../components/RnButton";
import urls from "../../redux/lib/urls";
import moment from "moment";
import { currency } from "../../constants/constantVeriable";

const Ticket1 = ({ navigation, route }) => {
  // const { itemDetail } = route.params;
  // console.log('first', itemDetail)
  const itemDetail = {
    "id": 22,
    "user_id": 68,
    "status_id": 1,
    "university_id": 1,
    "title": "dance event",
    "seat_limit": 100,
    "seat_booked": 2,
    "each_person_buying_capacity": 1,
    "descreption": "dance event",
    "date_time": "2023-03-27 13:00:00",
    "address": "200",
    "lat": 72.23,
    "lng": 46.23,
    "cover_img": "storage/event/image/41LopVoXCzSdp0xVrRgimD7e0oQYFphUFhtDKALg.jpg",
    "status": {
      "id": 1,
      "title": "active",
      "created_at": "2023-04-29T04:03:09.000000Z",
      "updated_at": "2023-04-29T04:03:09.000000Z"
    },
    "created_at": "2023-05-26T19:04:25.000000Z",
    "updated_at": "2023-08-02T18:48:42.000000Z",
    "rating_count": null,
    "reviews_count": 0,
    "reviews": [],
    "user": {
      "id": 68,
      "name": "saifa",
      "email": "saifalich77@gmail.com",
      "email_verified_at": null,
      "profile_img": null,
      "address": null,
      "zip": null,
      "phone": null,
      "university_id": 1,
      "country": null,
      "city": null,
      "house_number": null,
      "street": null,
      "apt_number": null,
      "town": null,
      "postal_code": null,
      "timezone": null,
      "currency": null,
      "otp": null,
      "facebook_login_id": null,
      "google_login_id": null,
      "apple_login_id": null,
      "mailing_address": null,
      "stripe_account_id": "acct_1NAoycIvUGOX80YJ",
      "is_seller": 0,
      "status": 1,
      "created_at": "2023-05-23T06:45:48.000000Z",
      "updated_at": "2023-07-19T07:37:23.000000Z",
      "stripe_id": "cus_NwiP8qVuDchtah",
      "pm_type": null,
      "pm_last_four": null,
      "trial_ends_at": null
    },
    "prices": [
      {
        "id": 50,
        "event_id": 22,
        "title": "basic",
        "price": 50,
        "created_at": "2023-05-26T19:04:25.000000Z",
        "updated_at": "2023-05-26T19:04:25.000000Z"
      },
      {
        "id": 51,
        "event_id": 22,
        "title": "standard",
        "price": 250,
        "created_at": "2023-05-26T19:04:25.000000Z",
        "updated_at": "2023-05-26T19:04:25.000000Z"
      },
      {
        "id": 52,
        "event_id": 22,
        "title": "premium",
        "price": 600,
        "created_at": "2023-05-26T19:04:25.000000Z",
        "updated_at": "2023-05-26T19:04:25.000000Z"
      }
    ]
  }
  const [selectedPakage, setSelectedPakage] = useState(itemDetail.prices[0]);

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Events"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Kirkland Still Water
          </ResponsiveText>
          <View style={{ flexDirection: 'row' }} >

            <Image
              style={styles.ImgStyle}
              source={{ uri: urls.IMG_BASE_URL + itemDetail.cover_img }}
            />
            <View style={{ width: wp(55), marginHorizontal: 10 }} >

              <ResponsiveText
                margin={[hp(2), 0, 0, 7]}
                size={4}
                color={colors.black}
              // textAlign='center'
              >
                Business Details
              </ResponsiveText>
              <ResponsiveText
                margin={[hp(1), 0, 0, 0]}
                size={2.5}
                color={colors.grey1}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries.
              </ResponsiveText>
            </View>
          </View>

          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            //  weight={"bold"}
            // size={4}
            color={colors.black}
          >
            Book Ticket
          </ResponsiveText>

          <FlatList
            scrollEnabled={false}
            data={itemDetail.prices}
            numColumns={3}
            renderItem={({ item }) => (
              <View
                style={{ flex: 1, marginVertical: hp(2), alignItems: "center" }}
              >
                <PackageTabs
                  onPress={() => setSelectedPakage(item)}
                  title={item.title}
                  price={currency + item.price}
                  isSelected={selectedPakage?.id == item.id}
                />
              </View>
            )}
          />

          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Date & Time:{"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {moment(itemDetail.date_time).format("DD MMM YYYY hh:mm:ss")}
            </ResponsiveText>
          </ResponsiveText>
          {/* <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={3}
            // color={colors.grey1}
          >
            Timezone:
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.primary}>
            Greenwich Mean Time (GMT)
          </ResponsiveText> */}
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Location: {"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {itemDetail.address}
            </ResponsiveText>
          </ResponsiveText>

          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Next"}
            onPress={() =>
              navigation.navigate("Ticket2", {
                itemDetail: itemDetail,
                selectedPakage: selectedPakage,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
  },
  box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  ImgStyle: {
    marginTop: hp(1),
    height: wp(33),
    width: wp(30),
    resizeMode: "cover",
    // marginBottom: 20,
    // alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
