import images from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-11/12 h-80"
        resizeMode="contain"
      />
      <Text className="font-rubik-bold text-black-300 text-2xl mt-3">
        No Results
      </Text>
      <Text className="font-rubik text-black-100 text-base mt-1 text-center">
        We couldn't find any results for your search.
      </Text>
    </View>
  );
};

export default NoResults;
