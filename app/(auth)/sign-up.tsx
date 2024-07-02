import { View, Text, ScrollView, Image, Alert } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "@/constants"
import CustomButton from "@/components/CustomButton"
import { Link, router } from "expo-router"
import FormField from "@/components/FormField"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import signUpSchema from "@/schemas/signUpSchema"
import { createUser } from "@/lib/appwrite"
import { z } from "zod"
import { useGlobalContext } from "@/context/GlobalProvider"
import { toast } from "@/lib/toast"
import { FontAwesome } from "@expo/vector-icons"

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isDark } = useGlobalContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
  })

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const onSubmit = async (data: {
    username: string
    email: string
    password: string
  }) => {
    setIsSubmitting(true)
    try {
      const result = await createUser(data.email, data.password, data.username)

      // set to global state
      setUser(result)
      setIsLoggedIn(true)
      toast("Registered successfully. Please log in.")
      router.replace("/home")
    } catch (error: any) {
      Alert.alert("Error", error?.message)
      console.log(error)
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
            Create a new account
          </Text>

          {/* Form */}
          <View className="mt-7">
            <Controller
              control={control}
              name={"username"}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormField
                  title="Username"
                  placeholder="putinRox01"
                  containerStyles="mt-4"
                  value={value}
                  handleChangeText={onChange}
                  textInputProps={onBlur}
                  fieldError={errors?.username?.message}
                />
              )}
            />
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
              title="Register"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              icon={
                <FontAwesome
                  name="user-plus"
                  size={24}
                  color={isDark ? "black" : "white"}
                />
              }
            />
            <Text
              className={`text-right mt-7 ${
                isDark ? "text-stone-400" : "text-stone-500"
              } text-base font-pregular`}
            >
              Already have an account?{" "}
              <Link
                href={"/sign-in"}
                className={`${
                  isDark ? "text-stone-100" : "text-stone-950"
                } font-psemibold`}
              >
                Login
              </Link>{" "}
              now
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
