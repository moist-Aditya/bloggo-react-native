import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import React from "react"
import { useGlobalContext } from "@/context/GlobalProvider"

const CustomButton = ({
  title,
  icon,
  isLoading,
  isSubmitting,
  handlePress,
  containerStyles,
  textStyles,
  ...props
}: {
  title: string
  icon?: React.ReactNode
  isLoading?: boolean
  isSubmitting?: boolean
  containerStyles?: string
  textStyles?: string
  handlePress?: () => void
}) => {
  const { isDark } = useGlobalContext()
  return (
    <TouchableOpacity
      className={`p-4 ${
        isDark ? "bg-zinc-100" : "bg-zinc-950"
      } rounded-lg ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      {...props}
    >
      <View className="flex-row gap-2 items-center justify-center">
        <Text
          className={`${
            isDark ? "text-zinc-950" : "text-zinc-200"
          } font-psemibold text-center text-lg ${textStyles}`}
        >
          {title}
        </Text>
        {isSubmitting ? (
          <ActivityIndicator color={isDark ? "black" : "white"} />
        ) : (
          icon
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
