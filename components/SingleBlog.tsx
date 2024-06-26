import { View, Text, Image } from "react-native"
import React from "react"
import { formatDate, capitalize } from "@/lib/format"

const SingleBlog = ({ blog }: { blog: any }) => {
  return (
    <View className={`px-6`}>
      <Text className="text-3xl font-pbold tracking-tight text-left font">
        {blog.title}
      </Text>
      <View className="flex-row space-x-2 items-center justify-start mt-2">
        <Text className="font-pregular text-base text-stone-500">
          By {capitalize(blog.author?.username)}
        </Text>
        <Image
          source={{ uri: blog.author?.avatar }}
          resizeMode="contain"
          className="w-8 h-8 rounded-full"
        />
      </View>
      <Text className="font-plight text-sm mt-2 text-stone-500">
        Created on{" "}
        <Text className="font-pregular">{formatDate(blog.$createdAt)} </Text>
      </Text>

      <Text className="text-lg mt-14 font-pregular leading-6">
        {blog.content}
      </Text>

      <Text className="text-red-600 mt-14">(TODO) Likes: {0}</Text>
    </View>
  )
}

export default SingleBlog
