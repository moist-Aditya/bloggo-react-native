import { View, Text, Image } from "react-native"
import React from "react"
import { images } from "@/constants"
import { useGlobalContext } from "@/context/GlobalProvider"

const EmptyList = () => {
  const { isDark } = useGlobalContext()
  return (
    <View className="flex-1 justify-center items-center py-10">
      <Image
        source={images.empty}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text
        className={`text-lg font-psemibold mt-4 ${
          isDark ? "text-stone-300" : "text-stone-600"
        }`}
      >
        No blogs found
      </Text>
      <Text
        className={`text-base font-plight mt-2 ${
          isDark ? "text-stone-400" : "text-stone-500"
        }`}
      >
        Please check back later.
      </Text>
    </View>
  )
}

export default EmptyList
