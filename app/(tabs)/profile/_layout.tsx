import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "dark",
        statusBarColor: "#fafaf9",
        headerStyle: { backgroundColor: "#fafaf9" },
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
