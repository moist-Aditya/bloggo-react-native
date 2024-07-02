import { View, Text, ScrollView, Image, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "@/components/CustomButton"
import { Link, router } from "expo-router"
import FormField from "@/components/FormField"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import signInSchema from "@/schemas/signInSchema"
import { getCurrentUser, signInUser } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"
import { toast } from "@/lib/toast"
import { MaterialIcons } from "@expo/vector-icons"

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  })

  const { setUser, setIsLoggedIn, isDark } = useGlobalContext()

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true)
    try {
      await signInUser(data.email, data.password)

      // set to global state
      const session = await getCurrentUser()

      setUser(session)
      setIsLoggedIn(true)
      toast("Signed in successfully")
      router.replace("/home")
    } catch (error: any) {
      Alert.alert("Error", error?.message)
      console.log("SignIn error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView
      className={`h-full ${isDark ? "bg-stone-900" : "bg-stone-200"}`}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="w-full min-h-screen px-4 py-6 justify-center">
          {/* Logo */}
          <View className="flex-row gap-1 justify-start items-center">
            <Image
              source={images.logoSmall}
              resizeMode="contain"
              className="w-[64px] h-[64px]"
            />
            <Text
              className={`text-3xl font-pblack ${isDark && "text-stone-50"}`}
            >
              Bloggo
            </Text>
          </View>

          <Text
            className={`mt-7 font-psemibold text-lg ${
              isDark && "text-stone-50"
            }`}
          >
            Log in to Bloggo
          </Text>

          {/* Form */}
          <View className="mt-7">
            <Controller
              control={control}
              name={"email"}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormField
                  title="Email"
                  placeholder="putin@russia.com"
                  containerStyles="mt-4"
                  value={value}
                  handleChangeText={onChange}
                  textInputProps={onBlur}
                  fieldError={errors?.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={"password"}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormField
                  title="Password"
                  placeholder="••••••••••"
                  containerStyles="mt-4"
                  value={value}
                  handleChangeText={onChange}
                  textInputProps={onBlur}
                  fieldError={errors?.password?.message}
                />
              )}
            />
          </View>

          {/* Login Button */}
          <View className="mt-14">
            <CustomButton
              title="Login"
              icon={
                <MaterialIcons
                  name="login"
                  size={24}
                  color={isDark ? "black" : "white"}
                />
              }
              handlePress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              isSubmitting={isSubmitting}
            />
            <Text
              className={`text-right mt-7 ${
                isDark ? "text-stone-400" : "text-stone-500"
              } text-base font-pregular`}
            >
              Don't have an account?{" "}
              <Link
                href={"/sign-up"}
                className={`${
                  isDark ? "text-stone-100" : "text-stone-950"
                } font-psemibold`}
              >
                Register
              </Link>{" "}
              now
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
