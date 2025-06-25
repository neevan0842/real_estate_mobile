import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <Animated.FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <Card />}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between my-3 mx-1">
              <View className="flex flex-row items-center ">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col ml-3 justify-center">
                  <Text className="font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="font-rubik-bold text-black-300">John</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-2">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="font-rubik-bold text-black-300 text-xl">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Animated.FlatList
              data={[1, 2, 3]}
              renderItem={() => <FeaturedCard />}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-3"
            />
            <Filters />
            <View className="mt-4">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="font-rubik-bold text-black-300 text-xl">
                  Our Recommentation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
