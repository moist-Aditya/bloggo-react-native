import { View } from "react-native"
import React from "react"
import { useGlobalContext } from "@/context/GlobalProvider"

const BlogCardSkeleton = () => {
  const { isDark } = useGlobalContext()
  return (
    <View className="px-6">
      <View
        className={`w-full border ${
          isDark
            ? "border-stone-700 bg-stone-800"
            : "border-stone-500 bg-stone-300"
        } rounded-xl overflow-hidden`}
      >
        <View className="flex-1 px-2 pt-4 pb-6 gap-2">
          <View
            className={`h-6 w-3/4 ${
              isDark ? "bg-stone-700" : "bg-stone-400"
            } rounded animate-pulse mb-2`}
          ></View>
          <View
            className={`h-4 w-full ${
              isDark ? "bg-stone-700" : "bg-stone-400"
            } rounded animate-pulse mb-1`}
          ></View>
          <View
            className={`h-4 w-full ${
              isDark ? "bg-stone-700" : "bg-stone-400"
            } rounded animate-pulse mb-1`}
          ></View>
          <View
            className={`h-4 w-2/3 ${
              isDark ? "bg-stone-700" : "bg-stone-400"
            } rounded animate-pulse mb-2`}
          ></View>
        </View>
        <View
          className={`flex-row justify-between items-center ${
            isDark ? "bg-stone-700" : "bg-stone-100"
          } px-2 py-1`}
        >
          <View className="flex-row gap-1 items-center justify-start">
            <View
              className={`h-5 w-20 ${
                isDark ? "bg-stone-700" : "bg-stone-400"
              } rounded animate-pulse`}
            ></View>
            <View
              className={`w-5 h-5 rounded-full ${
                isDark ? "bg-stone-700" : "bg-stone-400"
              } animate-pulse ml-2`}
            ></View>
          </View>
          <View
            className={`h-4 w-20 ${
              isDark ? "bg-stone-700" : "bg-stone-400"
            } rounded animate-pulse`}
          ></View>
        </View>
      </View>
    </View>
  )
}

export default BlogCardSkeleton
