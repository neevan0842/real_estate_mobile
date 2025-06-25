import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  GestureResponderEvent,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { refetch, isLogged, loading } = useGlobalContext();

  if (!loading && isLogged) {
    return <Redirect href="/" />;
  }

  async function handleLogin(event: GestureResponderEvent) {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Login failed.");
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-8">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to restate
          </Text>
          <Text className="text-center text-3xl font-rubik-bold text-black-300 my-2">
            Let's Get You Closer to {"\n"}
            <Text className="text-primary-300">Your Dream Home</Text>
          </Text>
          <Text className="text-center text-base font-rubik-medium text-black-200 mt-8">
            Login to ReState with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-400 rounded-full w-full py-4 mt-4"
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-center font-rubik-medium text-black-200 text-lg ml-2">
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
