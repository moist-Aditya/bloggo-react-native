import { View, Text, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import { Feather, Ionicons } from "@expo/vector-icons"

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyles,
  fieldError,
  ...textInputProps
}: {
  title: string
  value: string
  placeholder?: string
  handleChangeText: (e: any) => void
  containerStyles?: string
  fieldError?: string
  textInputProps?: any
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`${containerStyles} space-y-2 pb-5 relative`}>
      <Text className="text-base font-pmedium text-stone-900">{title}</Text>
      <View className="bg-stone-300 rounded-2xl h-16 w-full px-4 flex-row justify-center items-center border-2 border-stone-300 focus:border-stone-700">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          className="flex-1 text-base font-psemibold text-stone-900"
          secureTextEntry={title === "Password" && !showPassword}
          autoCorrect={false}
          {...textInputProps}
        />

        {title === "Password" && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Feather name="eye-off" size={24} color="black" />
            ) : (
              // <Ionicons name="eye" size={32} />
              <Feather name="eye" size={24} color="black" />
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
