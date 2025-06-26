import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const Filters = () => {
  const params = useLocalSearchParams<{ filters?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params?.filters || "All"
  );

  // Sync state with router param
  useEffect(() => {
    setSelectedCategory(params?.filters || "All");
  }, [params?.filters]);

  const handleCategoryChange = (category: string) => {
    if (category.toLowerCase() === selectedCategory.toLowerCase()) {
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
      {categories.map((item, category) => {
        const isSelected =
          selectedCategory.toLowerCase() === item.category.toLowerCase();
        return (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryChange(item.category)}
            className={`flex flex-col items-start px-4 py-2 rounded-full mx-1 ${
              isSelected
                ? "bg-primary-300" // Use a reliable color
                : "border bg-primary-100 border-primary-200"
            }`}
          >
            <Text
              className={
                isSelected
                  ? "text-white font-rubik-bold "
                  : "text-black-300 font-rubik"
              }
            >
              {item.category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Filters;
