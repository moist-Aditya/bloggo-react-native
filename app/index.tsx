import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { images } from "@/constants"
import CustomButton from "@/components/CustomButton"
import { Redirect, router } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

export default function Index() {
  const { isLoggedIn, isLoading } = useGlobalContext()

  if (isLoading) {
    return (
      <SafeAreaView className="bg-stone-100 h-full justify-center items-center">
        <ActivityIndicator size={"large"} color={"black"} />
        <Text className="text-lg font-pregular text-stone-600">
          Hold your horses...
        </Text>
      </SafeAreaView>
    )
  }

  if (isLoggedIn && !isLoading) {
    return <Redirect href={"/home"} />
  }

  return (
    <SafeAreaView className="bg-stone-200 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center h-full p-4">
          <Text className="text-center text-5xl font-pblack p-2 text-stone-950">
            Bloggo
          </Text>

          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-full h-1/4 mt-4"
          />

          <View className="mt-14 items-center">
            <Text className="text-3xl text-center font-pbold text-stone-950">
              Discover endless possibilities with Bloggo!
            </Text>
            <Text className="mt-7 text-center font-pregular text-stone-600">
              Join our community of passionate bloggers and start your journey
              today!
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            containerStyles="mt-14 w-full"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
