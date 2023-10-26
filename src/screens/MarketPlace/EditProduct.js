import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { _toast } from "../../constants/Index";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { getSellerProducts } from "../../redux/actions/user.actions";
import SmallButton from "../../components/SmallButton";
const EditProduct = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;

  const [categories, setcategory] = useState([]);
  const [singleFile1, setSingleFile1] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorString, setErrorString] = useState("");

  useEffect(() => {
    getCategories();
    setProductName(item.name);
    setProductDesc(item.descreption);
    setSelectedCategory(item.category_id);
    setPrice(JSON.stringify(item.price));
    setStock(JSON.stringify(item.stock));
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.PRODUCT_CATEGORIES);
      if (res && res.status == 200) {
        setcategory(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const deleteProduct = async () => {
    try {
      setLoading(true);
      const res = await Api.delete(urls.PRODUCTS + "/" + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getSellerProducts());
        _toast(res.message);
        navigation.goBack();
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const Submit = async () => {
    setErrorString("");

    if (productName == "") {
      setErrorString("Product name is required!");
      return false;
    } else if (productDesc == "") {
      setErrorString("Product description is required!");
      return false;
    } else if (selectedCategory == null) {
      setErrorString("Category is required!");
      return false;
    } else if (price == "") {
      setErrorString("Price is required!");
      return false;
    } else if (stock == "") {
      setErrorString("Quantity is required!");
      return false;
    }
    // else if(singleFile1==null){
    //   setErrorString("Image is required!");
    //   return false;
    // }

    const formdata = new FormData();
    formdata.append("name", productName);
    formdata.append("category_id", selectedCategory);
    formdata.append("descreption", productDesc);
    formdata.append("price", price);
    formdata.append("stock", stock);
    formdata.append("_method", "PUT");

    formdata.append(
      "image",
      singleFile1 != null
        ? {
            uri: singleFile1.path,
            type: "image/jpeg",
            name: singleFile1.filename,
          }
        : null
    );

    try {
      setLoading(true);
      const res = await Api.post(urls.PRODUCTS + "/" + item.id, formdata);
      console.log("==== edit products res ====", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getSellerProducts());
        _toast(res.message);
        navigation.goBack();
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };

  const toggel = (file) => {
    Alert.alert("Profile Image", "change profile Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "open Camera",
        onPress: async () => {
          openCamera(file);
        },
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary(file);
        },
      },
    ]);
  };
  const takephotofromgallary = (setFile) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };
  const openCamera = (setFile) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };
  const EventActivate = async (type) => {
    if (type == "Activate" && item.status_id == 1) {
      _toast("The product is already in an active state");
      return false;
    } else if (type == "deActivate" && item.status_id == 2) {
      _toast("The product is already in a deactivated state");
      return false;
    }
    try {
      setLoading(true);
      const res = await Api.get(urls.ACTIVE_DEACTIVATE_PRODUCT + "/" + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        dispatch(getSellerProducts());
        _toast(res.message);
        navigation.goBack();
        setLoading(false);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Marketplace"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Edit Products
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Checkout our products provided by one expert vendors and select the
            needed one.
          </ResponsiveText>
        </View>
        <InputText
          Text={"Product Name"}
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <InputText
          Text={"Product Description"}
          style={styles.box}
          value={productDesc}
          multiline
          onChangeText={(text) => setProductDesc(text)}
        />
        <View style={{ marginTop: 25 }}>
          <DropDown
            title={"Category*"}
            defaultButtonText={
              categories.find((v) => v.id == selectedCategory)?.title
            }
            data={categories.map((v) => v.title)}
            onSelect={(item) => {
              var id = categories.find((v) => v.title == item)?.id;
              setSelectedCategory(id);
            }}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Price"}
            value={price}
            onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
            keyboardType={"numeric"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <InputText
            Text={"Quantity"}
            keyboardType={"numeric"}
            value={stock}
            onChangeText={(text) => setStock(text.replace(/[^0-9]/g, ""))}
          />
        </View>
        <TouchableOpacity onPress={() => toggel(setSingleFile1)}>
          <View
            style={{
              // backgroundColor: colors.lighterGrey,
              alignItems: "center",
              paddingVertical: wp(5),
              marginHorizontal: wp(5),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.lighterGrey,
              marginTop: 20,
            }}
          >
            {singleFile1 ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  borderRadius={5}
                  style={{ width: wp(85), height: hp(15), marginTop: hp(0) }}
                  source={{ uri: singleFile1?.path }}
                />
              </View>
            ):item.cover_img?(
              <View style={{ alignItems: "center" }}>
                <Image
                  borderRadius={5}
                  style={{ width: wp(85), height: hp(15), marginTop: hp(0) }}
                  source={{ uri: urls.IMG_BASE_URL+item.cover_img }}
                />
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Icon
                  margin={[0, 0, 0, 0]}
                  size={25}
                  source={globalPath.Camera}
                  tintColor={colors.grey1}
                ></Icon>
                <ResponsiveText size={3.3} color={colors.grey1}>
                  Upload Event Image
                </ResponsiveText>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Upload Files
        </ResponsiveText>
        <TouchableOpacity>
          <View
            style={{
              // backgroundColor: colors.lighterGrey,

              paddingVertical: wp(5),
              marginHorizontal: wp(5),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.lighterGrey,
              marginTop: 10,
            }}
          >
            <ResponsiveText
              margin={[0, 0, 0, 10]}
              size={3.3}
              color={colors.grey1}
            >
              {singleFile1 != null
                ? singleFile1.size + "." + singleFile1.mime
                : "None"}
            </ResponsiveText>
          </View>
        </TouchableOpacity> */}
        {errorString ? (
          <ResponsiveText margin={[wp(6)]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Update Product"}
          onPress={() => Submit()}
        />
        <View style={{ alignItems: "center", marginTop: hp(4) }}>
          <SmallButton
            backgroundColor={colors.red}
            btnStyle={{ height: hp(4), width: wp(40) }}
            title={"Delete Product"}
            onPress={() => {
              Alert.alert("", "Do you want to delete the product?", [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    deleteProduct();
                  },
                },
              ]);
            }}
          />
          <SmallButton
            backgroundColor={colors.primary}
            btnStyle={{ height: hp(4), width: wp(40) }}
            margin={[10, 0, 0, 0]}
            title={"Deactivate Product"}
            onPress={() => EventActivate("deActivate")}
          />
          <SmallButton
            backgroundColor={colors.green}
            btnStyle={{ height: hp(4), width: wp(40) }}
            margin={[10, 0, 0, 0]}
            title={"Activate Product"}
            onPress={() => EventActivate("Activate")}
          />
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
