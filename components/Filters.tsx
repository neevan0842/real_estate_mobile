import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filters?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params?.filters || "All"
  );

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("All");
      router.setParams({ filters: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filters: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="my-4"
    >
      {categories.map((item, category) => (
        <TouchableOpacity
          key={category}
          onPress={() => handleCategoryChange(item.category)}
          className={`flex flex-col items-start px-4 py-2 rounded-full bg-white mx-1 ${
            selectedCategory === item.category
              ? "bg-blue-600"
              : "border bg-primary-100 border-primary-200"
          }`}
        >
          <Text
            className={
              selectedCategory === item.category
                ? "text-white font-rubik-bold "
                : "text-black-300 font-rubik"
            }
          >
            {item.category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
