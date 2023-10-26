import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import Dots from "../../components/Dots";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import RnButton from "../../components/RnButton";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";

import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useDispatch,useSelector } from "react-redux";
import { getAllCards,getMyProfile} from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";
import PhoneInput from "../../components/PhoneInput";


const AddCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const refreshing = useSelector(
    (state) => state.userReducers.getMyProfile.refreshing
  );
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expDate, setExpDate] = useState("");
  const [name, setName] = useState('')
  const [errorString, setErrorString] = useState('')
  const [cvc, setCvc] = useState("");
  //Billing fields
  const [b_name, setB_Name] = useState("");
  const [BillingphoneNumber, setBillingPhoneNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [b_PostCode, setB_PostCode] = useState("");
  const [B_city, setB_City] = useState("");
  const [B_country, setB_Country] = useState("");
  const [B_countryCode, setB_CountryCode] = useState("");

  useEffect(() => {

    if (MyProfile?.billingaddresses?.length>0) {
      setB_Name(MyProfile?.billingaddresses[0].name)
      setBillingAddress(MyProfile?.billingaddresses[0].address)
      setBillingPhoneNumber(MyProfile?.billingaddresses[0].phone)
      setB_City(MyProfile?.billingaddresses[0].city)
      setB_Country(MyProfile?.billingaddresses[0].country)
      setB_CountryCode(MyProfile?.billingaddresses[0].country_code)

      setB_PostCode(MyProfile?.billingaddresses[0].postal_code)

    }else{
      setB_Name(MyProfile?.name?MyProfile?.name:'')
      setBillingAddress(MyProfile?.address?MyProfile?.address:'')
      setBillingPhoneNumber(MyProfile?.phone?MyProfile?.phone:'')
      setB_City(MyProfile?.city?MyProfile?.city:'')
      setB_Country(MyProfile?.country?MyProfile?.country:'')
      setB_CountryCode(MyProfile?.country_code?MyProfile?.country_code:'')

      setB_PostCode(MyProfile?.postal_code?MyProfile?.postal_code:'')
    }

  }, []);

  const handleCardNumberChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    // Format the input with 4-digit groups separated by spaces
    const formattedText = cleanedText.replace(/(\d{4})/g, "$1 ").trim();
    setNumber(formattedText);
  };
  const handleExpiryDateChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, '');
    // Format the input with a forward slash after the second digit
    let formattedText = '';
    if (cleanedText.length > 0) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpDate(formattedText);
  };
  const Submit = async () => {
    // setErrorString('')
    if (number=='') {
      _toast('Card number is required!')
      return false
    }else if (expDate=='') {
      _toast('Expiry date is required!')
      return false
    }else if (cvc=='') {
      _toast('CVV is required!')
      return false
    }
    else if (b_name === "") {
      _toast("Name is required");
      return false;
    } else if (billingAddress === "") {
      _toast("Address is required");
      return false;
    }
    else if (B_city === "") {
      _toast("City is required");
      return false;
    }
    else if (b_PostCode === "") {
      _toast("PostCode is required");
      return false;
    }
    else if ( B_country=== "") {
      _toast("Country is required");
      return false;
    }
    else if (B_countryCode === "") {
      _toast("Country Code is required");
      return false;
    }
    const parts = expDate.split('/');

    const formdata = new FormData();
    formdata.append("number", number.replace(/\s/g, ''));
    formdata.append("exp_month", parts[0]);
    formdata.append("exp_year",'20'+parts[1]);
    formdata.append("cvc", cvc);
     //Billing
    //  formdata.append(
    //   "billing_flag",
    //   MyProfile?.billingaddresses?.length == 0 ? "new" : "old"
    // );
    // formdata.append(
    //   "billing_id",
    //   MyProfile?.billingaddresses?.length == 0
    //     ? null
    //     : MyProfile?.billingaddresses[0].id
    // );


    formdata.append(
      "billing_address",
      JSON.stringify({
        name: b_name,
        address: billingAddress,
        country_code: B_countryCode,
        postal_code: b_PostCode,
        country: B_country,
        phone: BillingphoneNumber,
        city: B_city,
      })
    );
    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_CARD, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getAllCards());
        _toast(res.message);
        navigation.goBack();
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
    <SafeAreaView style={styles.container}>
      <MainHeader navigation={navigation} title="Add Card" cartIcon={false} />
        <ScrollView showsVerticalScrollIndicator={false} >
      <View style={{ margin: wp(10) }}>
        <Dots />
        <ResponsiveText
          margin={[hp(3), 0, hp(3), 0]}
          color={colors.primary}
          size={4}
          weight="bold"
        >
          Add new card
        </ResponsiveText>
        <InputText
          marginHorizontal={1}
          Text={"Name of Card Holder"}
          value={name}
          onChangeText={(text) => setName(text)}

        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Card Number"}
          keyboardType="numeric"
          value={number}
          onChangeText={(text) => handleCardNumberChange(text)}
          cardIcon={globalPath.mastercard}
          maxLength={19}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: hp(3),
          }}
        >
          <InputText
            width={wp(38)}
            marginHorizontal={1}
            Text={"Expiry Date"}
            keyboardType="numeric"
            placeholder="MM/YY"
            maxLength={5} // MM/YY format
            value={expDate}
            onChangeText={handleExpiryDateChange}
          />
          <InputText
            width={wp(38)}
            marginHorizontal={1}
          keyboardType="numeric"
            Text={"CVV"}
            value={cvc}
            maxLength={3}
            secureTextEntry
            onChangeText={(text) => setCvc(text)}
          />
        </View>
        <ResponsiveText
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
        {/* {errorString ? (
          <ResponsiveText margin={[wp(2),0,0,0]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null} */}
        <View style={{height:hp(8)}} />
        <RnButton
          width={wp(80)}
          margin={[hp(3), 0, hp(3), 0]}
          title={"Add card"}
          onPress={() => Submit()}
        />
      </View>
        </ScrollView>
      {loading ? <Loader /> : undefined}  
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
