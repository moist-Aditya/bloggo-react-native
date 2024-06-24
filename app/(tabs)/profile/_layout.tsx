import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const ProfileLayout = () => {
  return (
    <Stack>
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
