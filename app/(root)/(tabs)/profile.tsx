import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && (
        <View>
          <Image source={icons.rightArrow} className="size-6" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  async function handleLogout(): Promise<void> {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "You have been logged out successfully.");
      refetch();
    } else {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="h-full pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-6" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center">
            <Image
              source={images.avatar}
              resizeMode="cover"
              className="size-44 rounded-full relative"
            />
            <TouchableOpacity className="absolute bottom-11 right-3">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-3 ">{user?.name}</Text>
          </View>
        </View>
        <View className="mt-10">
          {settings.map((item, index) => (
            <SettingsItem key={index} icon={item.icon} title={item.title} />
          ))}
        </View>
        <View>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            onPress={handleLogout}
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
