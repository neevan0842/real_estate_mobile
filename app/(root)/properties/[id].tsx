import Comment from "@/components/Comments";
import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const windowHeight = Dimensions.get("window").height;
  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  // console.log("Property data:", property);

  return (
    <View className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
            resizeMode="cover"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity onPress={() => router.back()}>
                <Image source={icons.backArrow} className="size-8" />
              </TouchableOpacity>
              <View className="flex flex-row gap-4">
                <Image
                  source={icons.heart}
                  className="size-8"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-8" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 mb-8">
          <View className="mt-4">
            <Text className="text-3xl font-rubik-bold my-1">
              {property?.name}
            </Text>
          </View>

          <View className="flex flex-row items-center mt-2 gap-3">
            <View className="bg-primary-200 px-2 py-1 rounded-full">
              <Text className="text-primary-300 font-rubik-bold text-sm">
                {property?.type}
              </Text>
            </View>
            <View className="flex flex-row items-center ml-2">
              <Image source={icons.star} className="size-4 mr-1" />
              <Text className="text-black-300 font-rubik text-base">
                {`${property?.rating} (${property?.review?.length || 0} reviews)`}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center justify-between mt-4 mr-2">
            <View className="flex flex-row items-center">
              <View className="bg-primary-200 p-3 rounded-full">
                <Image source={icons.bed} className="size-3" />
              </View>
              <Text className="font-rubik-medium text-sm ml-2">
                {property?.bedrooms} Beds
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <View className="bg-primary-200 p-3 rounded-full">
                <Image source={icons.bath} className="size-3" />
              </View>
              <Text className="font-rubik-medium text-sm ml-2">
                {property?.bathrooms} bath
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <View className="bg-primary-200 p-3 rounded-full">
                <Image source={icons.area} className="size-3" />
              </View>
              <Text className="font-rubik-medium text-sm ml-2">
                {property?.area} sqft
              </Text>
            </View>
          </View>

          <View className="border-b border-primary-200 my-7" />

          <View>
            <Text className="font-rubik-bold text-black-300 text-2xl">
              Agent
            </Text>
            <View className="flex flex-row items-center justify-between mr-2 mt-2">
              <View className="flex flex-row items-center gap-3">
                <Image
                  source={images.avatar}
                  className="size-16 rounded-full"
                />
                <View>
                  <Text className="font-rubik-semibold text-black-300">
                    {property?.agent?.name}
                  </Text>
                  <Text className="font-rubik text-black-100">Owner</Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4">
                <Image source={icons.chat} className="size-8" />
                <Image source={icons.phone} className="size-8" />
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="font-rubik-semibold text-black-300 text-2xl">
              Overview
            </Text>
            <Text className="font-rubik text-black-200 text-lg mt-2">
              {property?.description} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Quam, non autem. Vero, ducimus porro quas
              aspernatur debitis in tempora culpa earum eos quis fugit illo
              libero corrupti ipsam consequuntur cupiditate?
            </Text>
          </View>

          <View className="mt-7">
            <Text className="font-rubik-bold text-black-300 text-2xl">
              Facilities
            </Text>
            <View className="flex flex-row flex-wrap mt-2">
              {property?.facilities.map((item: string, index: number) => {
                const facility = facilities.find((f) => f.title === item);
                return (
                  <View
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <View className=" bg-primary-200 rounded-full p-3">
                      <Image
                        source={facility ? facility.icon : icons.info}
                        className="size-6"
                        tintColor={"#191D31"}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-black-300 text-sm text-center font-rubik mt-1.5"
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-2xl font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7 mb-10">
            <Text className="font-rubik-bold text-black-300 text-2xl">
              Location
            </Text>
            <View className="flex flex-row items-center mt-1">
              <Image source={icons.location} className="size-5 mr-1" />
              <Text className="font-rubik text-black-200 text-lg">
                {property?.address}
              </Text>
            </View>
            <Image
              source={images.map}
              className="w-full h-52 rounded-xl mt-5"
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className="mt-3">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 text-base font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="flex flex-row items-center pt-6 pb-8 px-5 bg-white justify-between border border-primary-200 rounded-3xl">
        <View className="flex flex-col justify-center">
          <Text className="uppercase text-black-100 font-rubik-semibold text-lg">
            Price
          </Text>
          <Text className="text-primary-300 font-rubik-bold text-3xl">
            ${property?.price}{" "}
          </Text>
        </View>
        <TouchableOpacity className="bg-primary-300 px-10 py-4 rounded-full ml-auto">
          <Text className="text-white font-rubik-bold text-xl">
            Booking Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Property {
  $id: string;
  name: string;
  address: string;
  type: string;
  image: string;
  price: number;
  description: string;
  facilities: string[];
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  geolocation: string;
  createdAt: string;
  agent: {
    $id: string;
    name: string;
    email: string;
    avatar: string;
  };
  gallery: { image: string }[];
  review: {
    name: string;
    avatar: string;
    review: string;
    rating: number;
    $id: string;
    createdAt: string;
  }[];
}

export default Property;
