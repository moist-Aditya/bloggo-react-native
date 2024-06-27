import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import UpdatePasswordForm from "@/components/UpdatePasswordForm"

const UpdatePasswordScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Change Password" }} />
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{ minHeight: "100%" }}
          keyboardShouldPersistTaps="handled"
        >
          <UpdatePasswordForm />
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default UpdatePasswordScreen
