import { View, Text, Image, TextInput, Alert } from "react-native"
import React, { useState } from "react"
import { useGlobalContext } from "@/context/GlobalProvider"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createBlogSchema } from "@/schemas/createBlogSchema"
import FormField from "./FormField"
import CustomButton from "./CustomButton"
import { createBlog } from "@/lib/appwrite"
import { router } from "expo-router"
import { toast } from "@/lib/toast"

const CreateBlogForm = () => {
  const { user } = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: { title: string; content: string }) => {
    setIsSubmitting(true)
    try {
      const result = await createBlog({
        ...data,
        userId: user.$id,
      })

      toast("Bloggo published!")
      router.push("/home")
    } catch (error: any) {
      Alert.alert("Error", error?.message)
      console.log("SignIn error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="p-6">
      <View
        className={`w-full border border-stone-500 rounded-xl overflow-hidden bg-stone-300`}
      >
        <View className="flex-1 px-2 py-6">
          <Controller
            control={control}
            name={"title"}
            render={({ field: { value, onChange, onBlur } }) => (
              <View className="gap-2 mb-7 relative">
                <Text className="text-2xl font-psemibold">Title</Text>
                <View className="bg-stone-100 px-2 h-16 rounded-xl">
                  <TextInput
                    multiline
                    numberOfLines={2}
                    className="text-lg font-psemibold flex-1 mt-0.5 rounded-xl"
                    placeholder="Enter a title for your Blog.."
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                </View>
                <Text className="text-red-500 absolute right-0 text-sm font-pregular text-center">
                  {errors.title?.message}
                </Text>
              </View>
            )}
          />

          <Controller
            control={control}
            name={"content"}
            render={({ field: { value, onChange, onBlur } }) => (
              <View className="gap-2 mb-7 relative">
                <Text className="text-2xl font-psemibold">Body</Text>
                <View className="bg-stone-100 px-2 py-4 rounded-xl">
                  <TextInput
                    multiline
                    numberOfLines={15}
                    textAlignVertical="top"
                    className="text-base font-pregular flex-1 mt-0.5 rounded-xl"
                    placeholder="Enter a title for your Blog.."
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                </View>
                <Text className="text-red-500 absolute right-0 text-sm font-pregular text-center">
                  {errors.content?.message}
                </Text>
              </View>
            )}
          />
          <View>
            <CustomButton
              title="Post"
              handlePress={handleSubmit(onSubmit)}
              isLoading={!isValid || isSubmitting}
            />
          </View>
        </View>
        <View className="flex-row justify-between items-center bg-stone-100 px-2 py-1">
          <View className="flex-row gap-1 items-center justify-start">
            <Text className="font-pregular text-sm text-stone-500">
              By {user.username}
            </Text>
            <Image
              source={{ uri: user.avatar }}
              resizeMode="contain"
              className="w-5 h-5 rounded-full"
            />
          </View>
          <Text className="font-plight text-xs text-stone-500">
            Now editing...
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CreateBlogForm
