import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "@/components/HomeHeader"
import CustomButton from "@/components/CustomButton"
import { useGlobalContext } from "@/context/GlobalProvider"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { logoutUser, updateUserAvatar } from "@/lib/appwrite"
import { toast } from "@/lib/toast"
import { Link, router } from "expo-router"
import ProfileOptionsModal from "@/components/ProfileOptionsModal"

const Profile = () => {
  const { user, setUser, setIsLoggedIn, refetchContext } = useGlobalContext()
  const [customAvatar, setCustomAvatar] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    })

    if (!result.canceled) {
      setCustomAvatar(result.assets[0])
    }
  }

  const uploadAvatar = async (avatarFile: string) => {
    try {
      setIsUpdating(true)
      const result = await updateUserAvatar(user.$id, avatarFile)
      toast("Avatar updated successfully")
      refetchContext()
      setCustomAvatar(null)
    } catch (error: any) {
      Alert.alert("Error updating Avatar", error?.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const onLogout = async () => {
    try {
      const result = await logoutUser()
      toast("Logged out")
      router.replace("/")
      setIsLoggedIn(false)
      setUser(null)
    } catch (error) {
      toast("Could not log out")
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        stickyHeaderIndices={[0]}
      >
        <HomeHeader hideSearch />

        <View className="flex-1 justify-between items-center mx-6 py-14">
          {/* Profile section */}
          <View className="space-y-10 w-full items-center">
            <Text className="text-3xl font-pbold">Profile</Text>

            {/* Avatar editor */}
            <View className="items-center space-y-1">
              <Image
                source={{ uri: customAvatar?.uri || user.avatar }}
                resizeMode="contain"
                className="w-[33vw] h-[33vw] rounded-full"
              />

              {/* TODO: Add file picker functionality */}
              <TouchableOpacity
                className="flex-row items-center space-x-1"
                onPress={pickAvatar}
              >
                <MaterialIcons name="edit" size={18} color="rgb(120 113 108)" />
                <Text className="font-pregular text-sm text-stone-500">
                  Edit
                </Text>
              </TouchableOpacity>

              {customAvatar && (
                <View className="flex-row items-center space-x-4">
                  <CustomButton
                    isLoading={isUpdating}
                    title="X"
                    containerStyles="bg-red-600 py-2"
                    handlePress={() => setCustomAvatar(null)}
                  />
                  <CustomButton
                    isLoading={isUpdating}
                    title="Upload"
                    containerStyles="py-2"
                    handlePress={() => uploadAvatar(customAvatar)}
                  />
                  {isUpdating && <ActivityIndicator />}
                </View>
              )}
            </View>

            {/* User options */}
            <View className="w-full flex-row justify-between items-center">
              <Text className="text-xl font-semibold">
                Welcome, <Text className="underline">{user.username}</Text>.
              </Text>

              {/* TODO: Open account options MODAL */}
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <MaterialCommunityIcons
                  name="account-cog"
                  size={32}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full">
              <CustomButton
                title="Your Posts"
                icon={
                  <MaterialCommunityIcons
                    name="post-outline"
                    size={32}
                    color="black"
                  />
                }
                containerStyles="w-full bg-white shadow-sm shadow-black"
                textStyles="text-black"
                handlePress={() => router.push("/profile/user-blogs")}
              />
            </View>
          </View>

          {/* Logout button */}
          <CustomButton
            title="Logout"
            icon={<MaterialIcons name="logout" size={24} color="white" />}
            containerStyles="w-full"
            handlePress={onLogout}
          />
        </View>
      </ScrollView>

      <ProfileOptionsModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  )
}

export default Profile
