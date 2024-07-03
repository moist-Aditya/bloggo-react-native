import { View, Text, Image, Pressable } from "react-native"
import React, { useEffect } from "react"
import { router } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

const BlogCard = ({
  blog,
  containerStyles,
}: {
  blog: any
  containerStyles?: string
}) => {
  const { isDark } = useGlobalContext()
  const date = new Date(blog.$createdAt)

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const formattedDate = date.toLocaleDateString("en-GB", options)

  return (
    <View className="px-6">
      <Pressable onPress={() => router.push(`/blogs/${blog.$id}`)}>
        <View
          className={`w-full border ${
            isDark
              ? "border-stone-700 bg-stone-800"
              : "border-stone-500 bg-stone-300"
          } rounded-xl overflow-hidden ${containerStyles}`}
        >
          <View className="px-2 pt-4 pb-6 space-y-2">
            <Text
              className={`text-xl font-pbold ${
                isDark ? "text-stone-200" : "text-stone-950"
              }`}
            >
              {blog.title}
            </Text>
            <Text
              className={`text-sm font-pregular ${
                isDark ? "text-stone-300" : "text-stone-800"
              }`}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {blog.content}
            </Text>
          </View>

          <View
            className={`flex-row justify-between items-center ${
              isDark ? "bg-stone-700" : "bg-stone-100"
            } px-2 py-1`}
          >
            <View className="flex-row gap-1 items-center justify-start">
              <Text
                className={`font-pregular text-sm ${
                  isDark ? "text-stone-400" : "text-stone-500"
                }`}
              >
                By {blog.author?.username}
              </Text>
              <Image
                source={{ uri: blog.author?.avatar }}
                resizeMode="contain"
                className="w-5 h-5 rounded-full"
              />
            </View>
            <Text
              className={`font-plight text-xs ${
                isDark ? "text-stone-400" : "text-stone-500"
              }`}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default BlogCard
