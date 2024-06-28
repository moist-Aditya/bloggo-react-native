import { View, Text, Image } from "react-native"
import React from "react"
import { images } from "@/constants"

const EmptyList = () => {
  return (
    <View className="flex-1 justify-center items-center py-10">
      <Image
        source={images.empty}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text className="text-lg font-psemibold text-stone-600 mt-4">
        No blogs found
      </Text>
      <Text className="text-base font-plight text-stone-500 mt-2">
        Please check back later.
      </Text>
    </View>
  )
}

export default EmptyList
