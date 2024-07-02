import { View, Text, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "@/components/HomeHeader"
import CreateBlogForm from "@/components/CreateBlogForm"
import { useGlobalContext } from "@/context/GlobalProvider"

const Create = () => {
  const { isDark } = useGlobalContext()
  return (
    <SafeAreaView
      className={`h-full ${isDark ? "bg-stone-900" : "bg-stone-200"}`}
    >
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        keyboardShouldPersistTaps="handled"
      >
        <HomeHeader hideSearch />

        <CreateBlogForm />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
