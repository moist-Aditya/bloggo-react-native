import { View, Text, ActivityIndicator, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { searchBlogs } from "@/lib/appwrite"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import SearchBar from "@/components/SearchBar"
import { useGlobalContext } from "@/context/GlobalProvider"
import EmptyList from "@/components/EmptyList"

const Search = () => {
  const { query } = useLocalSearchParams<{ query?: string }>()
  const { isDark } = useGlobalContext()

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

  return (
    <SafeAreaView
      className={`h-full ${isDark ? "bg-stone-900" : "bg-stone-200"}`}
    >
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={blogs || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => <BlogCard blog={item} />}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
        }}
        ListHeaderComponent={() => {
          return (
            <View
              className={`${
                isDark
                  ? "bg-stone-950 border-stone-700"
                  : "bg-stone-50 border-stone-300"
              } w-full sticky space-y-4 px-6 py-4 border-b `}
            >
              <Text
                className={`${
                  isDark && "text-stone-50"
                } font-pblack text-4xl text-center pt-2`}
              >
                Bloggo
              </Text>

              <Text
                className={`${
                  isDark && "text-stone-50"
                } font-pregular text-base`}
              >
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
        ListEmptyComponent={isLoading ? <ActivityIndicator /> : EmptyList}
        stickyHeaderHiddenOnScroll
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}

export default Search
