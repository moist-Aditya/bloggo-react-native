import { View, Text, Image, useColorScheme } from "react-native"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { useGlobalContext } from "@/context/GlobalProvider"
import SearchBar from "./SearchBar"
import { Link } from "expo-router"

const HomeHeader = ({ hideSearch }: { hideSearch?: boolean }) => {
  const { isDark } = useGlobalContext()
  const { user } = useGlobalContext()

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

      <View className="flex-row justify-between items-center">
        <Text
          className={`${isDark && "text-stone-50"} font-pregular text-base`}
        >
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
