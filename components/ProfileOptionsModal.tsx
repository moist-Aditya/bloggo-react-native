import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native"
import React from "react"
import CustomButton from "./CustomButton"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"

const ProfileOptionsModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="bg-stone-50 border border-b-0 border-stone-300 absolute bottom-0 w-full h-1/3 rounded-t-xl overflow-hidden space-y-0">
        <View className="bg-stone-50 shadow-md shadow-black items-center flex-row justify-between py-2 px-6">
          <Text className="text-stone-900 font-psemibold text-sm">
            Profile options
          </Text>

          <TouchableOpacity onPress={onClose} className="p-2">
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="justify-center gap-6 px-6 py-2">
          <CustomButton
            title="Change Password"
            icon={<MaterialIcons name="lock" size={24} color="white" />}
            textStyles="text-white"
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
