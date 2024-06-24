import { FlatList, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import HomeHeader from "@/components/HomeHeader"
import BlogCardSkeleton from "@/components/BlogCardSkeleton"
import { getUserBlogs } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"

const UserBlogs = () => {
  const { user } = useGlobalContext()
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

  // if (isLoading) {
  //   return <ActivityIndicator className="flex-1 justify-center" />
  // }

  return (
    <SafeAreaView className="h-full bg-stone-200" edges={["bottom"]}>
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
          paddingBottom: 20,
        }}
        ListHeaderComponent={() => (
          <View className="px-6 py-2 bg-stone-50 justify-center items-center">
            <Text className="text-sm font-pregular">
              Showing blogs by{" "}
              <Text className="font-psemibold">{user.username}</Text>
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
