import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View ,ScrollView, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, screenHeight, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";

import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch } from "react-redux";
import { getAllHubServices } from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";
const SellHubService = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ServiceData, setServiceData] = useState([]);
  const [Universities, setUniversities] = useState([]);
  const [singleFile1, setSingleFile1] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");

  const [Pkgs, setPkgs] = useState([{ title: "", price: "" }]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedUni, setSelectedUni] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [errorString, setErrorString] = useState("");

  useEffect(() => {}, [rendering]);

  useEffect(() => {
    getCategories();
    getUniversities();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.SERVICE_CATEGORIES);
      if (res && res.status == 200) {
        setServiceData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const getUniversities = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.UNIVERSITIES);
      if (res && res.status == 200) {
        setUniversities(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };



  const Submit = async () => {
    setErrorString("");
    if (serviceName == "") {
      setErrorString("Service name is required!");
      return false;
    } else if (serviceDesc == null) {
      setErrorString("Service description is required!");
      return false;
    } else if (selectedService == null) {
      setErrorString("Please select service!");
      return false;
    } else if (checkPkgs()) {
      setErrorString("All packages must be filled");
      return false;
    } else if (selectedUni == null) {
      setErrorString("Please select University!");
      return false;
    } else if (singleFile1 == null) {
      setErrorString("Image is required!");
      return false;
    }

    const formdata = new FormData();
    formdata.append("title", serviceName);
    formdata.append("university_id", selectedUni);
    formdata.append("descreption", serviceDesc);
    formdata.append("packages", JSON.stringify({ prices: Pkgs }));
    formdata.append("category_id", selectedService);
    formdata.append("slot_ids", '1,2,3,4,5,6,7,8');

    formdata.append(
      "image",
      singleFile1 != null
        ? {
            uri: singleFile1.path,
            type: "image/jpeg",
            name: "name",
          }
        : null
    );
    console.log("formdata", formdata);

    try {
      setLoading(true);
      const res = await Api.post(urls.HUB_SERVICES, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getAllHubServices());
        _toast(res.message);

        setSelectedService(null)
        setServiceName('')
        setServiceDesc('')
        setPkgs([
          { title: "", price: "" }
        ])
        setSelectedUni(null)
        setSingleFile1(null)
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
  const UpdatePkgs = (text, index, type) => {
    if (type == "name") {
      Pkgs[index].title = text;
    } else {
      Pkgs[index].price = text;
    }
    setPkgs(Pkgs);
    setRendering(!rendering);
  };

 
  const checkPkgs = () => {
    return Pkgs.some((v) => v.title == "" || v.price == "");
  };
  const addEvents = () => {
    Pkgs.push({ title: "", price: "" })
    setPkgs(Pkgs)
    // setIsAddEventModal(true)
    setRendering(!rendering);

  }
  const removePkg = (index) => {
    Pkgs.splice(index, 1)
    setPkgs(Pkgs)
    // setIsAddEventModal(true)
    setRendering(!rendering);

  }
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Student Hub Service"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Sell Service
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Sell your services and get the customers to get benefits of
            services.
          </ResponsiveText>
        </View>
        <View style={{ marginTop: 25 }}>
          <DropDown
            title={"Select Service"}
            defaultButtonText={ServiceData.find((v) => v.id == selectedService)?.title}
            data={ServiceData.map((v) => v.title)}
            onSelect={(item) => {
              var id = ServiceData.find((v) => v.title == item)?.id;
              setSelectedService(id);
            }}
          />
        </View>
        <InputText
          style={styles.box}
          Text={"Service Name"}
          value={serviceName}
          onChangeText={(text) => setServiceName(text)}
        />
        <InputText
          Text={"Service Description"}
          style={[styles.box, { height: hp(20) }]}
          value={serviceDesc}
          multiline
          onChangeText={(text) => setServiceDesc(text)}
        />
        {Pkgs.map((item, index) => {
          return (
            <>
              <View style={{
                flex: 1,
                // marginTop: screenHeight * 0.02,
                justifyContent: 'space-between',
                // marginHorizontal: wp(5),
                flexDirection: 'row',
              }}>
                <ResponsiveText
                  margin={[20, 0, 0, 20]}
                  size={3.3}
                  weight={"bold"}
                  color={colors.black}
                >
                  Package {index + 1}
                </ResponsiveText>
                {index==0?null:
                <TouchableOpacity
                  onPress={() => removePkg(index)}
                >
                  <View style={{
                    flex: 1,
                    marginTop: screenHeight * 0.02,
                    justifyContent: 'flex-end',
                    marginHorizontal: wp(5),
                    flexDirection: 'row',
                  }}>

                    <ResponsiveText
                      fontFamily="Bold"
                      // color={colors.primary}
                      color={colors.grey1}
                    // onPress={() => SignInAsGuest()}
                    >
                      Remove Package
                    </ResponsiveText>
                    <View style={{ marginHorizontal: 10 }} />

                    <Icon
                      margin={[0, 0, 0, 0]}
                      size={22}
                      source={globalPath.DeleteIcon}
                      tintColor={colors.red}
                    />
                  </View>
                </TouchableOpacity>}
              </View>

              <View style={{ marginTop: 10 }}>
                <InputText
                  Text={"Package Name"}
                  value={item.title}
                  onChangeText={(text) => UpdatePkgs(text, index, 'name')}
                />
              </View>
              <View style={{ marginTop: 25 }}>
                <InputText
                  Text={"Price"}
                  value={item.price.toString()}
                  keyboardType={"numeric"}
                  onChangeText={(text) =>
                    UpdatePkgs(text.replace(/[^0-9]/g, ""), index, "price")
                  }
                />
              </View>
            </>
          );
        })}
        <TouchableOpacity
          onPress={() => addEvents()}
        >
          <View style={{
            flex: 1,
            marginTop: screenHeight * 0.02,
            justifyContent: 'flex-end',
            marginHorizontal: wp(5),
            flexDirection: 'row',
          }}>

            <ResponsiveText
              fontFamily="Bold"
              // color={colors.primary}
              color={colors.grey1}
            // onPress={() => SignInAsGuest()}
            >
              Create Package
            </ResponsiveText>
            <View style={{ marginHorizontal: 10 }} />

            <Icon
              margin={[0, 0, 0, 0]}
              size={22}
              source={globalPath.plusU}
              tintColor={colors.primary}
            />
          </View>
        </TouchableOpacity>
        <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Select University
        </ResponsiveText>
        <View style={{ marginTop: 25 }}>
          <DropDown
            title={"Select University"}
            data={Universities.map((v) => v.name)}
            onSelect={(item) => {
              var id = Universities.find((v) => v.name == item)?.id;
              setSelectedUni(id);
            }}
          />
        </View>
        <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Upload Image
        </ResponsiveText>
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
              marginTop: 10,
            }}
          >
             {singleFile1 ?
              <View style={{ alignItems: 'center' }}>
                <Image borderRadius={5} style={{ width: wp(85), height: hp(15), marginTop: hp(0) }} source={{ uri: singleFile1?.path }} />
              </View>
              :
              <View  style={{ alignItems: 'center' }}>
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
            }
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
            {singleFile1 != null ? singleFile1.size+"."+singleFile1.mime : "None"}
          </ResponsiveText>
        </View> */}
        {errorString ? (
          <ResponsiveText margin={[wp(6)]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Post Service"}
          onPress={() => Submit()}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default SellHubService;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { marginTop: 15 },
});
