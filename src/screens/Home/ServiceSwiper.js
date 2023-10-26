import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import Swiper from "react-native-swiper";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";

const ServiceSwiper = ({ data }) => {
  return (
    <>
      {data.length === undefined ? undefined : (
        <Swiper
          style={{}}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={2.5}
          autoplayDirection={true}
          removeClippedSubviews={true}
          showsPagination={true}
          dotColor={colors.white}
          key={data.length} //For fix auto play issue
        >
          {data.map((item, index) => {
            return (
              <>
                <Image
                  source={item.url}
                />
              </>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default ServiceSwiper;

const styles = StyleSheet.create({
 
});
