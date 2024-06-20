import { View, Text, TouchableOpacity, Alert } from "react-native"
import React from "react"

const CustomButton = ({
  title,
  isLoading,
  handlePress,
  containerStyles,
  ...props
}: {
  title: string
  isLoading?: boolean
  containerStyles?: string
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
      <Text className="text-zinc-200 font-psemibold text-center text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
