import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View ,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import RnButton from "../../components/RnButton";
import { _toast } from "../../constants/Index";
import Dots from "../../components/Dots";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Loader from "../../components/Loader";

const BankDetails = ({ navigation }) => {

    const [errorString, setErrorString] = useState("");
    const [BankName, setBankName] = useState("");
    const [AccountTitle, setAccountTitle] = useState("");
    const [SORTcode, setSORTcode] = useState("");
    const [AccountNumber, setAccountNumber] = useState("");
    const [BankAddress, setBankAddress] = useState("");
const [loading, setLoading] = useState(false)

    const addBankDetail = async () => {
    
        var formdata = new FormData();
        formdata.append("bank_name", BankName);
        formdata.append("account_title", AccountTitle);
        formdata.append("iban_number", SORTcode);
    
        formdata.append("swift_code", AccountNumber);
        // formdata.append("bank_address", BankAddress);
    
        try {
          setLoading(true);
          const res = await Api.post(urls.BANK_DETAIL, formdata);
          console.log("res", res);
          if (res && res.status == 200) {
    
         
            setLoading(false);
            _toast(res.message);
            navigation.goBack();
          } else {
            setLoading(false);
            _toast(res.message);
          }
        } catch (error) {
          setLoading(false);
          _toast(error);

        }
      };

    const validations = () => {
        // console.log('SORTcode.length', SORTcode.length)
        setErrorString('')
        if (BankName == '') {
            setErrorString('The Bank name field is required.')
            return false
        } else if (AccountTitle == '') {
            setErrorString('The Account Title field is required.')
            return false
        } else if (SORTcode =='') {
            setErrorString('The  SORT code field is required.')
            return false
        } else if (SORTcode.length < 5) {
            setErrorString('The  SORT code should be at least 5 characters long')
            return false
        } else if (AccountNumber == '') {
            setErrorString('The Account Number field is required.')
            return false
        } 
        // else if (BankAddress == '') {
        //     setErrorString('The Bank Address field is required.')
        //     return false
        // }
        else {
            addBankDetail()
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <ScrollView>
                <MainHeader navigation={navigation} title={"Bank Details"} />
                <View
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(2),
                        marginHorizontal: wp(6),
                    }}
                >
                    <Dots style={{ marginVertical: hp(3) }} />
                    {/* <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <ResponsiveText margin={[0,5,0,0]}>Edit</ResponsiveText>
                    </TouchableOpacity> */}
                    <InputText
                        margin={[hp(3), 0, 0, 0]}
                        marginHorizontal={1}
                        Text={"Bank Name"}
                        value={BankName}
                        onChangeText={(text) => setBankName(text)}
                    />
                    <InputText
                        margin={[hp(3), 0, 0, 0]}
                        marginHorizontal={1}
                        Text={"Account Title"}
                        value={AccountTitle}
                        onChangeText={(text) => setAccountTitle(text)}
                    />
                    <InputText
                        margin={[hp(3), 0, 0, 0]}
                        marginHorizontal={1}
                        Text={"SORT code"}
                        value={SORTcode}
                        onChangeText={(text) => setSORTcode(text)}
                    />
                    <InputText
                        margin={[hp(3), 0, 0, 0]}
                        marginHorizontal={1}
                        Text={"Account number"}
                        value={AccountNumber}
                        onChangeText={(text) => setAccountNumber(text)}
                    />
                    {/* <InputText
                        margin={[hp(3), 0, 0, 0]}
                        marginHorizontal={1}
                        Text={"Bank Address"}
                        value={BankAddress}
                        onChangeText={(text) => setBankAddress(text)}
                    /> */}


                    {errorString ? (
                        <ResponsiveText margin={[wp(6)]} color={colors.red}>
                            {errorString}
                        </ResponsiveText>
                    ) : null}
                    <RnButton
                        margin={[hp(4), 0, 0, 0]}
                        title={"Save"}
                        onPress={validations}
                    />
                </View>
                <View style={{ height: hp(10) }}></View>
            </ScrollView>
      {loading ? <Loader /> : null}

        </SafeAreaView>
    );
};

export default BankDetails;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { height: hp(20), marginTop: 15 },
});
