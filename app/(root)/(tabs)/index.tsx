import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex items-center justify-center h-full">
        <Text className="text-3xl font-rubik-extrabold ">
          Welcome to restate
        </Text>
      </View>
    </SafeAreaView>
  );
}
