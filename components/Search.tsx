import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between px-3 py-1 rounded-full border border-primary-100 bg-accent-100 my-4">
      <View className="flex flex-row items-center flex-1">
        <Image source={icons.search} className="size-6" />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          className="font-rubik text-black-300 ml-1 text-lg flex-1"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
