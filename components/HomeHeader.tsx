import { View, Text, Image } from "react-native"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { useGlobalContext } from "@/context/GlobalProvider"
import SearchBar from "./SearchBar"
import { Link } from "expo-router"

const HomeHeader = ({ hideSearch }: { hideSearch?: boolean }) => {
  const { user } = useGlobalContext()

  return (
    <View
      className={`bg-stone-50 w-full sticky space-y-2 px-6 py-4 border-b border-stone-300`}
    >
      <Text className="font-pblack text-4xl text-center pt-2">Bloggo</Text>

      <View className="flex-row justify-between items-center">
        <Text className="font-pregular text-base">
          Welcome,{" "}
          <Link href="/profile" className="underline font-psemibold">
            {user.username}
          </Link>
        </Text>

        <Image
          source={{ uri: user.avatar }}
          resizeMode="contain"
          className="w-8 h-8 rounded-full"
        />
      </View>

      {!hideSearch && (
        <View className="w-full">
          <SearchBar placeholder="Search..." />
        </View>
      )}
    </View>
  )
}

export default HomeHeader
