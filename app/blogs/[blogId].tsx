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
    return <ActivityIndicator />
  }

  return (
    <>
      <Stack.Screen options={{ title: blog.title }} />
      <SafeAreaView className="min-h-screen">
        <ScrollView>
          <SingleBlog blog={blog} />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default BlogScreen
