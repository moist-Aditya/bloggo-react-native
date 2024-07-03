import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

const ProfileLayout = () => {
  const { isDark } = useGlobalContext()
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? "#0c0a09" : "#fafaf9" },
        headerTintColor: isDark ? "#fafaf9" : "#0c0a09",
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
