import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native"
import React from "react"
import CustomButton from "./CustomButton"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

const ProfileOptionsModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const { isDark } = useGlobalContext()
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        className={`absolute bottom-0 w-full h-1/3 rounded-t-xl overflow-hidden space-y-0 ${
          isDark
            ? "bg-stone-800 border-stone-700"
            : "bg-stone-50 border-stone-300"
        }`}
      >
        <View
          className={`shadow-md items-center flex-row justify-between py-2 px-6 ${
            isDark ? "bg-stone-800 shadow-black" : "bg-stone-50 shadow-black"
          }`}
        >
          <Text
            className={`font-psemibold text-sm ${
              isDark ? "text-stone-100" : "text-stone-900"
            }`}
          >
            Profile options
          </Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <MaterialIcons
              name="close"
              size={24}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View className="justify-center gap-6 px-6 py-2">
          <CustomButton
            title="Change Password"
            icon={
              <MaterialIcons
                name="lock"
                size={24}
                color={isDark ? "black" : "white"}
              />
            }
            // textStyles="text-white"
            handlePress={() => {
              onClose()
              router.push("/profile/update-password")
            }}
          />
          <CustomButton
            title="Delete Account"
            icon={
              <MaterialCommunityIcons name="alert" size={24} color="white" />
            }
            containerStyles="bg-red-800"
            textStyles="text-white"
            handlePress={() => {
              onClose()
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ProfileOptionsModal
