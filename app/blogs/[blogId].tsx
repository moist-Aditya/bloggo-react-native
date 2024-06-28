import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getBlog } from "@/lib/appwrite"
import { toast } from "@/lib/toast"
import SingleBlog from "@/components/SingleBlog"

const BlogScreen = () => {
  const { blogId } = useLocalSearchParams<{ blogId: string }>()
  const [blog, setBlog] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const result = await getBlog(blogId as string)
        setBlog(result)
      } catch (error: any) {
        toast(error?.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [])

  if (isLoading || !blog) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"black"} />
        <Text className="text-lg font-pregular text-stone-600">
          Please wait...
        </Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: blog.title,
          headerStyle: { backgroundColor: "#fafaf9" },
        }}
      />
      <SafeAreaView className="min-h-screen bg-stone">
        <ScrollView>
          <View className="mt-14 bg-st">
            <SingleBlog blog={blog} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BlogScreen
