import { View } from "react-native"
import React from "react"

const BlogCardSkeleton = () => {
  return (
    <View className="px-6">
      <View
        className={`w-full border border-stone-500 rounded-xl overflow-hidden bg-stone-300`}
      >
        <View className="flex-1 px-2 pt-4 pb-6 gap-2">
          <View className="h-6 w-3/4 bg-stone-400 rounded animate-pulse mb-2"></View>
          <View className="h-4 w-full bg-stone-400 rounded animate-pulse mb-1"></View>
          <View className="h-4 w-full bg-stone-400 rounded animate-pulse mb-1"></View>
          <View className="h-4 w-2/3 bg-stone-400 rounded animate-pulse mb-2"></View>
        </View>
        <View className="flex-row justify-between items-center bg-stone-100 px-2 py-1">
          <View className="flex-row gap-1 items-center justify-start">
            <View className="h-5 w-20 bg-stone-400 rounded animate-pulse"></View>
            <View className="w-5 h-5 rounded-full bg-stone-400 animate-pulse ml-2"></View>
          </View>
          <View className="h-4 w-20 bg-stone-400 rounded animate-pulse"></View>
        </View>
      </View>
    </View>
  )
}

export default BlogCardSkeleton
