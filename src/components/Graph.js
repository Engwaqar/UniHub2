import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../constants/colorsPallet";

const Graph = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
          },
        ],
      };
  return (
    <LineChart
      data={data}
      width={300}
      height={170}
      yAxisLabel="$"
      yAxisSuffix="k"
      withInnerLines={false}
      withOuterLines={false}
      chartConfig={{
        backgroundColor: colors.white,
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        decimalPlaces: 2,
        color: (opacity = 1) => (colors.primary),
        labelColor: (opacity = 1) =>  (colors.black),
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default Graph;

const styles = StyleSheet.create({});
