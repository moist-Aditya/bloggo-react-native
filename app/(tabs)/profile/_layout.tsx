import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

const ProfileLayout = () => {
  const { isDark } = useGlobalContext()
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "inverted",
        statusBarColor: isDark ? "#222" : "#fafaf9",
        headerStyle: { backgroundColor: isDark ? "#222" : "#fafaf9" },
        headerTintColor: isDark ? "#fafaf9" : "#222",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user-blogs"
        options={{
          title: "Your Blogs",
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
