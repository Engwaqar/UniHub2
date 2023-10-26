import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import { hp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/actions/user.actions";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";
import PhoneInput from "../../components/PhoneInput";

const MyDetails = React.forwardRef((props, ref) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const refreshing = useSelector(
    (state) => state.userReducers.getMyProfile.refreshing
  );
  console.log("MyProfile", MyProfile);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [HouseNo, setHouseNo] = useState("");
  const [Street, setStreet] = useState("");
  const [AptNumber, setAptNumber] = useState("");
  const [Town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [PostCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");

  //Billing fields
  const [b_name, setB_Name] = useState("");
  const [BillingphoneNumber, setBillingPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [b_PostCode, setB_PostCode] = useState("");
  const [B_city, setB_City] = useState("");
  const [B_country, setB_Country] = useState("");
  const [B_countryCode, setB_CountryCode] = useState("");

  // const [loading, setLoading] = useState(false);
  // React.useEffect(() => {
  //   ref.current = Submit
  // }, [])
  React.useImperativeHandle(ref, () => ({ Submit }));
  useEffect(() => {
    setName(MyProfile.name?MyProfile.name:'');
    setAddress(MyProfile.address?MyProfile.address:'');
    setPhone(
      MyProfile.phone && MyProfile.phone != "null" ? MyProfile.phone : ""
    );

    setAptNumber(MyProfile.apt_number?MyProfile.apt_number:'');
    setPostCode(MyProfile.postal_code?MyProfile.postal_code:'');
    setTown(MyProfile.town?MyProfile.town:'');
    setHouseNo(MyProfile.house_number?MyProfile.house_number:'');
    setStreet(MyProfile.street?MyProfile.street:'');
    setCity(MyProfile.city?MyProfile.city:'');
    setCountry(MyProfile.country?MyProfile.country:'');
    setCountryCode(MyProfile.country_code?MyProfile.country_code:'')

    if (MyProfile?.billingaddresses?.length>0) {
      setB_Name(MyProfile?.billingaddresses[0].name)
      setBillingAddress(MyProfile?.billingaddresses[0].address)
      setBillingPhoneNumber(MyProfile?.billingaddresses[0].phone)
      setB_City(MyProfile?.billingaddresses[0].city)
      setB_Country(MyProfile?.billingaddresses[0].country)
      setB_CountryCode(MyProfile?.billingaddresses[0].country_code)

      setB_PostCode(MyProfile?.billingaddresses[0].postal_code)

    }

  }, []);
  const Submit = async (imgFile) => {
    // console.log('imgFile', imgFile)
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("address", address);
    formdata.append("phone", phone);
    formdata.append("house_number", HouseNo);
    formdata.append("city", city);
    formdata.append("street", Street);
    formdata.append("apt_number", AptNumber);
    formdata.append("town", Town);
    formdata.append("postal_code", PostCode);
    formdata.append("country", country);
    formdata.append("country_code", countryCode);

    formdata.append(
      "profile_img",
      imgFile != undefined
        ? {
            uri: imgFile.path,
            type: "image/jpeg",
            name: "name",
          }
        : null
    );
    //Billing
    // formdata.append(
    //   "billing_flag",
    //   MyProfile?.billingaddresses?.length == 0 ? "new" : "old"
    // );
    // formdata.append(
    //   "billing_id",
    //   MyProfile?.billingaddresses?.length == 0
    //     ? null
    //     : MyProfile?.billingaddresses[0].id
    // );


    // formdata.append(
    //   "billing_address",
    //   JSON.stringify({
    //     name: b_name,
    //     address: billingAddress,
    //     country_code: B_countryCode,
    //     postal_code: b_PostCode,
    //     country: B_country,
    //     phone: BillingphoneNumber,
    //     city: B_city,
    //   })
    // );

    console.log("formdata", formdata);
    try {
      setLoading(true);
      const res = await Api.post(urls.UPDATE_PROFILE, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getMyProfile());
        _toast(res.message);
        // navigation.goBack();
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <>
      <View>
        <ResponsiveText color={colors.primary} size={4} weight="bold">
          My Details
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
          View and edit your personal info below.
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.black} size={2.8}>
          Login email : {MyProfile.email}
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
          Your Login email can’t be changed
        </ResponsiveText>
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {/* <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Email Address*"}
          value={MyProfile.email}
          editable={false}
        /> */}
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Address (street number etc)"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"City"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Post Code"}
          value={PostCode}
          onChangeText={(text) => setPostCode(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Country"}
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
        {refreshing ? null : (
          <PhoneInput
            margin={[hp(3), 0, 0, 0]}
            defaultCode={countryCode}
            placeholder={"Mobile number"}
            defaultValue={phone}
            onChangeText={(text) => {
              text?.length <= 10 && setPhone(text);
            }}
            // onChangeFormattedText={(text)=> {text?.length<13&& setPhone(text)}}
            onChangeCountry={(text) => {
              console.log("country", text);
              setCountryCode(text.cca2);
              setCountry(text.name);
            }}
          />
        )}
        {/* <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Billing Address"}
          value={billingAddress}
          onChangeText={(text) => setBillingAddress(text)}
        /> */}
        {/* <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"House Number"}
          value={HouseNo}
          onChangeText={(text) => setHouseNo(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Apt Number (optional)"}
          value={AptNumber}
          onChangeText={(text) => setAptNumber(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Town"}
          value={Town}
          onChangeText={(text) => setTown(text)}
        />
       */}
        {/* <ResponsiveText
          margin={[20, 0, 0, 0]}
          color={colors.primary}
          size={4}
          weight="bold"
        >
          Billing Address
        </ResponsiveText>
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Name"}
          value={b_name}
          onChangeText={(text) => setB_Name(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Address (street number etc)"}
          value={billingAddress}
          onChangeText={(text) => setBillingAddress(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"City"}
          value={B_city}
          onChangeText={(text) => setB_City(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Post Code"}
          value={b_PostCode}
          onChangeText={(text) => setB_PostCode(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Country"}
          value={B_country}
          onChangeText={(text) => setB_Country(text)}
        />
        {refreshing ? null : (
          <PhoneInput
            margin={[hp(3), 0, 0, 0]}
            defaultCode={B_countryCode}
            placeholder={"Mobile number"}
            defaultValue={BillingphoneNumber}
            onChangeText={(text) => {
              text?.length <= 10 && setBillingPhoneNumber(text);
            }}
            // onChangeFormattedText={(text)=> {text?.length<13&& setPhone(text)}}
            onChangeCountry={(text) => {
              console.log("country", text);
              setB_CountryCode(text.cca2);
              setB_Country(text.name)
            }}
          />
        )} */}
        <RnButton
          margin={[hp(3), 0, hp(3), 0]}
          title={"Update Info"}
          onPress={() => Submit(undefined)}
        />
        {/* <ResponsiveText textAlign={"center"} color={colors.grey1} size={4}>
        Discard
      </ResponsiveText> */}
      </View>
    </>
  );
});

export default MyDetails;

const styles = StyleSheet.create({});
