import { ActivityIndicator, FlatList, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import HomeHeader from "@/components/HomeHeader"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import { getUserBlogs } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"
import EmptyList from "@/components/EmptyList"

const UserBlogs = () => {
  const { user, isDark } = useGlobalContext()
  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogs = async () => {
    if (isLoading) return

    setIsLoading(true)

    console.log("Fetching user blogs")

    try {
      const result = await getUserBlogs(user.$id)
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

  if (blogs.length === 0 && !isLoading) {
    return <EmptyList />
  }

  return (
    <SafeAreaView
      className={`h-full ${isDark ? "bg-stone-900" : "bg-stone-200"}`}
    >
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={blogs}
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
        }}
        ListHeaderComponent={() => (
          <View
            className={`px-6 py-2 ${
              isDark ? "bg-stone-950" : "bg-stone-50"
            } justify-center items-center`}
          >
            <Text
              className={`text-sm font-pregular ${
                isDark ? "text-stone-300" : "text-stone-900"
              }`}
            >
              Showing blogs by{" "}
              <Text
                className={`font-psemibold ${
                  isDark ? "text-stone-100" : "text-stone-700"
                }`}
              >
                {user.username}
              </Text>
            </Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}

export default UserBlogs
