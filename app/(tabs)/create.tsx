import { View, Text, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "@/components/HomeHeader"
import CreateBlogForm from "@/components/CreateBlogForm"

const Create = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <HomeHeader hideSearch />

        <CreateBlogForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
