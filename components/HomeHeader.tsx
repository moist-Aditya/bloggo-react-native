import { View, Text, Image, Pressable } from "react-native"
import React from "react"
import { useGlobalContext } from "@/context/GlobalProvider"
import SearchBar from "./SearchBar"
import { Link } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

const HomeHeader = ({ hideSearch }: { hideSearch?: boolean }) => {
  const { user, isDark, toggleColorScheme } = useGlobalContext()

  return (
    <View
      className={`${
        isDark
          ? "bg-stone-950 border-stone-700"
          : "bg-stone-50 border-stone-300"
      } w-full space-y-4 px-6 py-4 border-b z-50 relative`}
    >
      {/* TODO: Add dark mode toggle switch with absolute position */}
      <View className="absolute h-fit right-6 top-6 z-50">
        <Pressable onPress={toggleColorScheme} hitSlop={10}>
          {isDark ? (
            <MaterialIcons name="light-mode" size={32} color="white" />
          ) : (
            <MaterialIcons name="dark-mode" size={32} color="black" />
          )}
        </Pressable>
      </View>

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
