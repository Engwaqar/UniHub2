import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView} from "react-native";
import React,{useState}from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { routeName } from "../../constants/routeName";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
const BarcodeReader = ({ navigation }) => {
  const [scan, setScan] = useState(true);
  const [result, setResult] = useState();
  const [Loading, setLoading] = useState(false);
  const onSuccess = (e) => {
    console.log('first', e.data)
    Submit(e.data);
    setScan(false);
  };
  const onReset = () => {
    setResult();
    setScan(true);
  };
  const Submit = async (data) => {
    setLoading(true);
    const res = await Api.get(urls.VERIFY_QR+data);
    console.log("VERIFY_QR", res);
    if (res && res.success == true) {
      setLoading(false);
      _toast(res.message);
      navigation.goBack()
    } else {
      _toast(res.message);
      setLoading(false);
      navigation.goBack()

    }
  };
  return (
    <View style={{ flex: 1, backgroundColor:colors.black3  }} >
      {
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 7,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 20,
                marginTop:hp(4)
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon source={globalPath.backarrow} />
            </TouchableOpacity>
          </View>
      }
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', paddingBottom: 30, backgroundColor:colors.black3}}>
        <ResponsiveText size={7} color={colors.primary} >{scan ? "Ticket Scanner" : "QR Data"}</ResponsiveText>
      </View>
      <SafeAreaView>
        <View >
          {result &&
            <View style={{ alignItems: 'center', margin: 30 }}>
              <ResponsiveText color={colors.primary} textAlign={'center'} size={3.5} >{'Reset for scan again'}</ResponsiveText>
              <TouchableOpacity
                onPress={() => {
                  onReset()
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(60),
                  marginBottom: 40,
                  marginTop: 20,
                  height: hp(4),
                  alignSelf: 'center',
                  borderRadius: 7,
                  backgroundColor: colors.primary,
                }}>
                <ResponsiveText color={colors.black} size={3.5}>
                  Reset
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          }

          {scan &&
            <View>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}

                //   ref={(node) => { this.scanner = node }}
                onRead={onSuccess}

              />
            </View>
          }
        </View>

      </SafeAreaView>
    </View>
  );
};

export default BarcodeReader;

const styles = StyleSheet.create({});
