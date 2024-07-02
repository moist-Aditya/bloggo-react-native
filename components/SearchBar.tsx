import { View, Text, TextInput, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { router, usePathname } from "expo-router"
import { useGlobalContext } from "@/context/GlobalProvider"

const SearchBar = ({
  placeholder,
  value,
}: {
  placeholder?: string
  value?: string
}) => {
  const [query, setQuery] = useState(value ?? "")
  const pathname = usePathname()
  const { isDark } = useGlobalContext()

  return (
    <View
      className={`flex-row justify-center items-center px-4 space-x-4 h-12 rounded-xl ${
        isDark ? "bg-stone-800" : "bg-stone-300"
      }`}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#a8a29e"}
        textAlignVertical="center"
        value={query}
        onChangeText={setQuery}
        className={`text-base mt-0.5 ${
          isDark ? "text-stone-100" : "text-stone-600"
        } flex-1 font-pregular`}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) return

          if (pathname.startsWith("/search")) {
            router.setParams({ query })
          } else {
            router.push(`/search/${query}`)
          }
        }}
      >
        <Feather name="search" size={24} className="flex" color="#78716c" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar
