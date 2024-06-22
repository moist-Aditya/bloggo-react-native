import { View, Text, TouchableOpacity, Alert } from "react-native"
import React from "react"

const CustomButton = ({
  title,
  icon,
  isLoading,
  handlePress,
  containerStyles,
  textStyles,
  ...props
}: {
  title: string
  icon?: React.ReactNode
  isLoading?: boolean
  containerStyles?: string
  textStyles?: string
  handlePress?: () => void
}) => {
  return (
    <TouchableOpacity
      className={`p-4 bg-zinc-950 rounded-lg ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className="flex-row gap-2 items-center justify-center">
        <Text
          className={`text-zinc-200 font-psemibold text-center text-lg ${textStyles}`}
        >
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
