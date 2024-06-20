import { View, Text, ActivityIndicator, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { searchBlogs } from "@/lib/appwrite"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import HomeHeader from "@/components/HomeHeader"
import SearchBar from "@/components/SearchBar"
import { StatusBar } from "expo-status-bar"

const Search = () => {
  const { query } = useLocalSearchParams<{ query?: string }>()

  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogs = async () => {
    if (isLoading || !query) return

    setIsLoading(true)
    console.log("Fetching blogs")

    try {
      const result = await searchBlogs(query)
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
  }, [query])

  if (isLoading) {
    return <ActivityIndicator className="flex-1 justify-center" />
  }

  return (
    <SafeAreaView className="h-full bg-stone-200">
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={blogs || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => <BlogCard blog={item} key={index} />}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
        }}
        ListHeaderComponent={() => {
          return (
            <View className="bg-stone-50 w-full sticky space-y-2 px-6 py-4 border-b border-stone-300">
              <Text className="font-pblack text-4xl text-center pt-2">
                Bloggo
              </Text>

              <Text className="text-base">
                Search results:{" "}
                <Text className="text-lg font-psemibold">{query}</Text>
              </Text>

              <View className="w-full">
                <SearchBar placeholder="Search..." value={query} />
              </View>
            </View>
          )
        }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}

export default Search
