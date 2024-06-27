import { View, Text } from "react-native"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import FormField from "./FormField"
import CustomButton from "./CustomButton"
import { toast } from "@/lib/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import updatePasswordSchema from "@/schemas/updatePasswordSchema"
import { router } from "expo-router"
import { logoutUserAllDevices, updatePassword } from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider"

const UpdatePasswordForm = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    },
    mode: "all",
  })

  const onLogout = async () => {
    try {
      const result = await logoutUserAllDevices()
      toast("Logged out from all sessions")
      router.replace("/")
      setIsLoggedIn(false)
      setUser(null)
    } catch (error) {
      toast("Could not log out")
    }
  }

  const onSubmit = async (data: {
    oldPassword: string
    newPassword1: string
    newPassword2: string
  }) => {
    try {
      setIsSubmitting(true)

      const result = await updatePassword(data.newPassword1, data.oldPassword)

      toast("Password updated successfully")
      onLogout()
    } catch (error) {
      toast("Invalid credentials")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="w-full h-full px-6 justify-center">
      <Text className="font-pbold text-5xl pt-2">Update Password</Text>

      {/* Form */}
      <View className="mt-7">
        <Controller
          control={control}
          name={"oldPassword"}
          render={({ field: { value, onChange, onBlur } }) => (
            <FormField
              title="Old Password"
              placeholder="Enter your current password"
              containerStyles="mt-4"
              value={value}
              handleChangeText={onChange}
              textInputProps={onBlur}
              fieldError={errors?.oldPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={"newPassword1"}
          render={({ field: { value, onChange, onBlur } }) => (
            <FormField
              title="New Password"
              placeholder="Enter new password"
              containerStyles="mt-4"
              value={value}
              handleChangeText={onChange}
              textInputProps={onBlur}
              fieldError={errors?.newPassword1?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={"newPassword2"}
          render={({ field: { value, onChange, onBlur } }) => (
            <FormField
              title="Confirm Password"
              placeholder="Enter new password again"
              containerStyles="mt-4"
              value={value}
              handleChangeText={onChange}
              textInputProps={onBlur}
              fieldError={errors?.newPassword2?.message}
            />
          )}
        />
      </View>

      {/* Login Button */}
      <View className="mt-14">
        <CustomButton
          title="Submit"
          handlePress={handleSubmit(onSubmit)}
          isLoading={!isValid || isSubmitting}
        />
      </View>
    </View>
  )
}

export default UpdatePasswordForm
