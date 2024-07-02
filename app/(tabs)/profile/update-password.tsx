import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import UpdatePasswordForm from "@/components/UpdatePasswordForm"
import { useGlobalContext } from "@/context/GlobalProvider"

const UpdatePasswordScreen = () => {
  const { isDark } = useGlobalContext()
  return (
    <>
      <Stack.Screen options={{ title: "Change Password" }} />
      <SafeAreaView
        className={`h-full ${isDark ? "bg-stone-900" : "bg-stone-200"}`}
      >
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
