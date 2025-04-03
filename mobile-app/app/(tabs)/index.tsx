import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useBLE from "@/services/useBLE"; // Import your BLE hook

export default function Index() {
  const router = useRouter();
  const { scanForDevices, allDevices } = useBLE();

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-b mx-auto" />
        {/* replace with my own logo image later */}

        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/history")}
            placeholder="Search for a match"
          />
        </View>

        {/* BLE Scanning Button */}
        <TouchableOpacity
          onPress={scanForDevices}
          className="bg-blue-500 p-3 rounded-lg mt-5"
        >
          <Text className="text-white text-center font-bold">Scan for Devices</Text>
        </TouchableOpacity>

        {/* Show discovered devices */}
        {allDevices.length > 0 && (
          <View className="mt-5 p-3 bg-white rounded-lg">
            <Text className="text-black text-lg font-bold mb-2">Discovered Devices:</Text>
            {allDevices.map((device) => (
              <Text key={device.id} className="text-black">
                {device.name || "Unknown Device"} ({device.id})
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
