import React from "react";
import {
  View,
  StyleSheet, Image,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import ResponsiveText from "../../../components/RnText";


const Splash = ({ navigation }) => {
  const [Token, setToken] = React.useState(null);

  const fetchAndSetUser = async () => {
    // await AsyncStorage.clear()
    const token = await AsyncStorage.getItem("@token");
    const id = await AsyncStorage.getItem("@userId");
    const user_type = await AsyncStorage.getItem("user_type");
    setToken(token);
    if (token === null) {
    await AsyncStorage.clear()

      //  if(user_type == "Guest"){
      //   navigation.replace(routeName.BOTTOM_TABS);
      //   return false;
      // }
      setTimeout(() => {
        setTimeout(() => {
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: routeName.ON_BORDING }],
              })
            );
          }, 2000);
        }, 2000);
      }, 0);
    } else {
      navigation.replace(routeName.HOME_STACK);
      
    }
  };

  React.useEffect(() => {
    fetchAndSetUser();
  }, []);

  return (
    <View style={styles.container}>
        <Image  style={styles.logo} source={globalPath.logo} />  
        <ResponsiveText  margin={[-30,0,0,0]} size={4.5} >SERVICES</ResponsiveText>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
    height: hp(20), width: wp(40), resizeMode: 'contain',
  }
});
export default Splash;
