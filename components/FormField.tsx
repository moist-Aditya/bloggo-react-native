import { View, Text, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useGlobalContext } from "@/context/GlobalProvider"

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  fieldError,
  ...textInputProps
}: {
  title?: string
  value: string
  placeholder?: string
  handleChangeText: (e: any) => void
  containerStyles?: string
  fieldError?: string
  textInputProps?: any
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const { isDark } = useGlobalContext()

  return (
    <View className={`${containerStyles} space-y-2 pb-5 relative`}>
      <Text
        className={`text-base font-pmedium ${
          isDark ? "text-stone-100" : "text-stone-900"
        }`}
      >
        {title}
      </Text>
      <View
        className={` rounded-2xl h-16 w-full px-4 flex-row justify-center items-center border-2 ${
          isDark
            ? "bg-stone-700 border-stone-900 focus:border-stone-300"
            : "bg-stone-300 border-stone-300 focus:border-stone-700"
        } `}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#a8a29e"}
          value={value}
          onChangeText={handleChangeText}
          className={`flex-1 text-base font-psemibold ${
            isDark ? "text-stone-50" : "text-stone-900"
          } `}
          secureTextEntry={title === "Password" && !showPassword}
          autoCorrect={false}
          {...textInputProps}
        />

        {title === "Password" && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Feather
                name="eye-off"
                size={24}
                color={isDark ? "white" : "black"}
              />
            ) : (
              // <Ionicons name="eye" size={32} />
              <Feather
                name="eye"
                size={24}
                color={isDark ? "white" : "black"}
              />
            )}
          </Pressable>
        )}
      </View>

      {!!fieldError && (
        <Text className="absolute bottom-0 right-0 text-base font-pregular text-red-700">
          {fieldError}
        </Text>
      )}
    </View>
  )
}

export default FormField
