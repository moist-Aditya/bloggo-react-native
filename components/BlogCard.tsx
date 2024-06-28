import { View, Text, Image, Pressable } from "react-native"
import React from "react"
import { Link, router } from "expo-router"

const BlogCard = ({
  blog,
  containerStyles,
}: {
  blog: any
  containerStyles?: string
}) => {
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
          className={`w-full border border-stone-500 rounded-xl overflow-hidden bg-stone-300 ${containerStyles}`}
        >
          <View className="flex-1 px-2 pt-4 pb-6 gap-2">
            <Text className="text-xl font-pbold text-stone-950">
              {blog.title}
            </Text>
            <Text
              className="text-sm font-pregular text-stone-800"
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {blog.content}
            </Text>
          </View>
          <View className="flex-row justify-between items-center bg-stone-100 px-2 py-1">
            <View className="flex-row gap-1 items-center justify-start">
              <Text className="font-pregular text-sm text-stone-500">
                By {blog.author?.username}
              </Text>
              <Image
                source={{ uri: blog.author?.avatar }}
                resizeMode="contain"
                className="w-5 h-5 rounded-full"
              />
            </View>
            <Text className="font-plight text-xs text-stone-500">
              {formattedDate}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default BlogCard
