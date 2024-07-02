import { View, Text, Image } from "react-native"
import React from "react"
import { formatDate, capitalize } from "@/lib/format"
import { useGlobalContext } from "@/context/GlobalProvider"

const SingleBlog = ({ blog }: { blog: any }) => {
  const { isDark } = useGlobalContext()
  return (
    <View className={`px-6 ${isDark ? "text-stone-100" : "text-stone-900"}`}>
      <Text
        className={`text-3xl font-pbold tracking-tight ${
          isDark ? "text-white" : "text-stone-900"
        }`}
      >
        {blog.title}
      </Text>
      <View className="flex-row space-x-2 items-center justify-start mt-2">
        <Text
          className={`font-pregular text-base ${
            isDark ? "text-stone-200" : "text-stone-600"
          }`}
        >
          By {capitalize(blog.author?.username)}
        </Text>
        <Image
          source={{ uri: blog.author?.avatar }}
          resizeMode="contain"
          className="w-8 h-8 rounded-full"
        />
      </View>
      <Text
        className={`font-plight text-sm mt-2 ${
          isDark ? "text-stone-300" : "text-stone-500"
        }`}
      >
        Created on{" "}
        <Text
          className={`font-pregular ${
            isDark ? "text-stone-300" : "text-stone-500"
          }`}
        >
          {formatDate(blog.$createdAt)}{" "}
        </Text>
      </Text>

      <Text
        className={`text-lg mt-14 font-pregular leading-6 ${
          isDark ? "text-stone-100" : "text-stone-900"
        }`}
      >
        {blog.content}
      </Text>

      {/* Add likes counter */}
    </View>
  )
}

export default SingleBlog
