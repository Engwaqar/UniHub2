import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";
import RecordNotFound from "../../components/RecordnotFound";
import { currency } from "../../constants/constantVeriable";
const CartList = ({ navigation }) => {
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  console.log("cartList", cartList);

  const totalPrice = () => {
    if (cartList.length > 0) {
      let total = cartList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.pivot.quantity;
      }, 0);
      return total;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Checkout"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          {cartList.length > 0 ? (
            <>
              <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                Order Summary{" "}
              </ResponsiveText>
              <ResponsiveText size={3} color={colors.grey1}>
                Confirm your booking details
              </ResponsiveText>
              <FlatList
                data={cartList}
                renderItem={({ item }) => {
                  return (
                    <>
                      <ResponsiveText
                        margin={[hp(3), 0, 0, 0]}
                        fontFamily={"bold"}
                        size={3}
                        color={colors.black}
                      >
                        {item.name}
                      </ResponsiveText>
                      <ResponsiveText
                        margin={[hp(2), 0, 0, 0]}
                        size={3}
                        color={colors.black}
                      >
                        Quantity {item?.pivot?.quantity}
                      </ResponsiveText>
                      <ResponsiveText
                        margin={[hp(2), 0, 0, 0]}
                        size={3}
                        color={colors.primary}
                      >
                        Price: {currency}
                        {item.price}
                      </ResponsiveText>
                      <ResponsiveText margin={[hp(2), 0, hp(2), 0]} size={3}>
                        Sub Total Price: {currency}
                        {item.price * item.pivot?.quantity}
                      </ResponsiveText>
                      <View
                        style={{
                          height: 3,
                          width: wp(80),
                          backgroundColor: colors.lightGrey,
                        }}
                      />
                    </>
                  );
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: wp(0),
                }}
              >
                <ResponsiveText
                  margin={[hp(2), 0, 0, 0]}
                  size={4}
                  //   weight={"bold"}
                  color={colors.black}
                >
                  Total:
                </ResponsiveText>
                <ResponsiveText
                  margin={[hp(2), 0, 0, 0]}
                  size={4}
                  //  weight={"bold"}
                  color={colors.primary}
                >
                  {currency}
                  {totalPrice()}
                </ResponsiveText>
              </View>
              <RnButton
                width={"100%"}
                margin={[hp(3), 0, 0, 0]}
                title={"Next"}
                onPress={() =>
                  navigation.navigate(routeName.BUYER_CHECKOUT, {
                    // itemDetail: itemDetail,
                    totalPrice: totalPrice(),
                  })
                }
              />
            </>
          ) : (
            <RecordNotFound verbiage="Your cart is Empty!" />
          )}
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartList;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
