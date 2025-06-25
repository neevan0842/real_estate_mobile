import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-52 h-72 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.whiteGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row absolute top-4 right-3 bg-white/90 px-3 py-1.5 items-center rounded-full">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.4
        </Text>
      </View>
      <View className="flex flex-col items-center absolute bottom-5 inset-x-0 px-3">
        <Text
          className="font-rubik-extrabold text-white text-xl"
          numberOfLines={1}
        >
          apartment name
        </Text>
        <Text className="font-rubik-bold text-white text-base">
          aparment address
        </Text>
        <View className="flex flex-row items-center justify-between w-full mt-2 px-2">
          <Text className="font-rubik-extrabold text-white text-xl">2500</Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-2 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          4.4
        </Text>
      </View>
      <Image source={images.japan} className="w-full h-40 rounded-lg" />
      <View className="flex flex-col mt-2">
        <Text className="font-rubik-extrabold text-black-300 text-lg">
          apartment name
        </Text>
        <Text className="font-rubik-bold text-black-100 text-xs">
          aparment address
        </Text>
        <View className="flex flex-row items-center justify-between w-full mt-2 px-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            2500
          </Text>
          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor={"#191D31"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
