import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";

import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import Api from "../../redux/lib/api";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

const MarketProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const AllProducts = useSelector(
    (state) => state.userReducers.getAllProducts?.data
  );
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const loading = useSelector(
    (state) => state.userReducers.getAllProducts?.refreshing
  );
  const [isloading, setLoading] = useState(false);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // console.log("getAllProducts", AllProducts);
  const DataImg = [
    {
      id: 1,
      title: "Business Details Goes Here",
      url: require("../../assets/icons/image.jpeg"),
      Des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ",
    },

    {
      id: 2,
      title: "Business Details Goes Here",
      url: require("../../assets/icons/image.jpeg"),
      Des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ",
    },
    {
      id: 3,
      title: "Business Details Goes Here",
      url: require("../../assets/icons/image.jpeg"),
      Des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ",
    },
    {
      id: 4,
      title: "Business Details Goes Here",
      url: require("../../assets/icons/image.jpeg"),
      Des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ",
    },
    {
      id: 5,
      title: "Business Details Goes Here",
      url: require("../../assets/icons/image.jpeg"),
      Des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, ",
    },
  ];
  // useEffect(() => {
  //   dispatch(getAllProducts());
  //   getCategories();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getAllProducts(MyProfile.user_type));
      getCategories();
      // loadUserChats();
      // setLoadingUserConnections(true)
      // setTimeout(() => {
      //   setLoadingUserConnections(false)
      // }, 500);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.PRODUCT_CATEGORIES);
      console.log("PRODUCT_CATEGORIES", res);
      if (res && res.status == 200) {
        setLoading(false);
        setCategoriesData(res.data);
        setSelectedCategory(res.data[0].id);
        // _toast(res.message);
      } else {
        // _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Function to update filtered data
  const updateFilteredData = (query) => {
    console.log('query', query)
    // setSearchQuery(query);
    const filtered = AllProducts.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const headerComponent = () => {
    return (
      <>
        <View style={{ marginVertical: hp(1) }}>
          <Input
            placeholder={"Search..."}
            backgroundColor="#00000029"
            height={hp(5)}
            width={wp(60)}
            onChangeText={(query) => {
              console.log('query', query)
              setSearchQuery(query);
              // updateFilteredData(query);
            }}
            value={searchQuery}
            searchBox
          />
          <ResponsiveText
            weight={"bold"}
            size={5}
            margin={[hp(3), 0, 0, 0]}
            color={colors.primary}
          >
            Products{" "}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Checkout our products provided by one expert vendors and select the
            needed one.
          </ResponsiveText>
        </View>
        {CategoriesData.length > 0 ? (
          <ResponsiveText
            margin={[hp(2), 0, hp(1), 0]}
            weight={"bold"}
            size={4}
            color={colors.black}
          >
            Categories
          </ResponsiveText>
        ) : null}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CategoriesData.map((item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory == item.id ? null : item.id
                  )
                }
                style={[
                  styles.catCard,
                  {
                    backgroundColor:
                      selectedCategory == item.id
                        ? colors.primary
                        : colors.lightgreen,
                  },
                ]}
              >
                <Icon
                  size={wp(10)}
                  margin={[10,0,0,0]}
                  resizeMode={"contain"}
                  source={
                    require('../../assets/Images/barber.png')
                    // item.url
                      // ? { uri: urls.IMG_BASE_URL + item.url }
                      // : globalPath.MarketPlace
                  }
                />
                <ResponsiveText
                  textAlign={"center"}
                  margin={[5, 0, 0, 0]}
                  color={
                    selectedCategory == item.id ? colors.white : colors.black
                  }
                >
                  {item.title}
                </ResponsiveText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ResponsiveText margin={[10, 0, 0, 0]} textAlign="center">
        Recommendations
        </ResponsiveText>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
        >
          {DataImg.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  _toast("This data is for demonstration purposes only.");
                }}
              >
                <ImageBackground
                  borderRadius={10}
                  style={styles.Img_Style}
                  source={item.url}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      marginTop: hp(5),
                    }}
                  >
                    <ResponsiveText
                      size={2.5}
                      margin={[0, 0, 0, 5]}
                      color={colors.white}
                    >
                      {item.title}
                    </ResponsiveText>
                    <ResponsiveText
                      size={2}
                      margin={[0, 0, 0, 5]}
                      color={colors.white}
                    >
                      {item.Des}
                    </ResponsiveText>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ResponsiveText
          margin={[hp(2), 0, 0, 0]}
          weight={"bold"}
          size={4}
          color={colors.black}
        >
          items
        </ResponsiveText>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Marketplace"} />

      <FlatList
        style={{ marginHorizontal: wp(5) }}
        showsVerticalScrollIndicator={false}
        extraData={filteredData} // Prevent unintentional re-renders

        data={
          searchQuery != ""
            ? filteredData
            : selectedCategory == null
            ? AllProducts
            : AllProducts.filter((v) => v.category_id == selectedCategory)
        }
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ width: wp(30) }}
              onPress={() =>
                navigation.navigate(routeName.PRODUCT_DETAILS, {
                  itemDetail: item,
                })
              }
            >
              <View style={styles.productCard}>
                <Icon
                  size={50}
                  source={
                    item.cover_img
                      ? { uri: urls.IMG_BASE_URL + item.cover_img }
                      : globalPath.MarketPlace
                  }
                />
              </View>
              <ResponsiveText
                textAlign={"center"}
                margin={[0, 0, 0, 0]}
                color={colors.black}
              >
                {item.name}
              </ResponsiveText>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={
          AllProducts?.length == 0 ? <RecordNotFound /> : null
        }
      />
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default MarketProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //  padding: wp(1)
  },
  box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
  catCard: {
    backgroundColor: colors.lightgreen,
    padding: 10,
    alignItems: "center",
    width: wp(25),
    height: wp(28),
justifyContent:'space-between',
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
  },
  productCard: {
    backgroundColor: colors.lighterGrey,
    alignItems: "center",
    justifyContent: "center",
    height: wp(22),
    width: wp(22),
    borderRadius: 15,
    margin: 10,
  },
  Img_Style: {
    height: hp(14),
    width: wp(45),
    marginTop: 10,
    margin: 3,
    borderRadius: 5,
  },
});
