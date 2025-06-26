import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
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

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filters?: string; query?: string }>();
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filters,
      query: params.query,
      limit: 10,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({ filter: params.filters, query: params.query, limit: 10 });
  }, [params.filters, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button title="Seed" onPress={seed} /> */}
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
            <View className="flex flex-row items-center justify-between my-3 mx-1">
              <View className="flex flex-row items-center ">
                <Image
                  source={{ uri: user!.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col ml-3 justify-center">
                  <Text className="font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="font-rubik-bold text-black-300">
                    {user!.name}
                  </Text>
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
            {latestPropertiesLoading ? (
              <ActivityIndicator
                size={"large"}
                className="my-5 text-primary-300"
              />
            ) : latestProperties && latestProperties.length > 0 ? (
              <Animated.FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-3"
              />
            ) : (
              <NoResults />
            )}
            <Filters />
            <View className="mt-4">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="font-rubik-bold text-black-300 text-xl">
                  Our Recommendation
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
