import { FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import HomeHeader from "@/components/HomeHeader"
import { getBlogs } from "@/lib/appwrite"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"

const Home = () => {
  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogs = async () => {
    if (isLoading) return

    setIsLoading(true)

    console.log("Fetching blogs")

    try {
      const result = await getBlogs()
      setBlogs(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    fetchBlogs()
  }
  useEffect(() => {
    fetchBlogs()
  }, [])

  // if (isLoading) {
  //   return <ActivityIndicator className="flex-1 justify-center" />
  // }

  return (
    <SafeAreaView className="h-full bg-stone-200">
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={blogs || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => {
          return isLoading ? (
            <BlogCardSkeleton key={index} />
          ) : (
            <BlogCard blog={item} key={index} />
          )
        }}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
        }}
        ListHeaderComponent={<HomeHeader />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}

export default Home
