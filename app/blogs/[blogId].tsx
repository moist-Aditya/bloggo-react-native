import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getBlog } from "@/lib/appwrite"
import { toast } from "@/lib/toast"
import SingleBlog from "@/components/SingleBlog"
import { useGlobalContext } from "@/context/GlobalProvider"

const BlogScreen = () => {
  const { isDark } = useGlobalContext()
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
      <SafeAreaView
        className={`${
          isDark ? "bg-stone-900" : "bg-stone-200"
        } h-full items-center justify-center`}
      >
        <ActivityIndicator size={"large"} color={isDark ? "white" : "black"} />
        <Text
          className={`text-lg font-pregular ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          Please wait...
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: blog.title,
          headerStyle: { backgroundColor: isDark ? "#222" : "#fafaf9" },
          headerTintColor: isDark ? "#fafaf9" : "#222",
        }}
      />
      <SafeAreaView
        className={`${isDark ? "bg-stone-900" : "bg-stone-200"} h-full`}
      >
        <ScrollView>
          <View className="mt-14">
            <SingleBlog blog={blog} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BlogScreen
