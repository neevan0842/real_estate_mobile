import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ filters?: string; query?: string }>();
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filters,
      query: params.query,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({ filter: params.filters, query: params.query, limit: 20 });
  }, [params.filters, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <Animated.FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size={"large"}
              className="my-5 text-primary-300"
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex items-center justify-center bg-primary-200 size-11 rounded-full"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base text-center font-medium text-black-200">
                Search for your dream home
              </Text>
              <Image source={icons.bell} className="size-5 mr-1" />
            </View>
            <Search />
            <Filters />
            <View className="mt-4">
              <Text className="text-xl font-rubik-bold text-black-300 mb-1">
                {`Found ${properties?.length} ${properties?.length === 1 ? "property" : "properties"} for you`}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
