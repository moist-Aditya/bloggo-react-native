import { View, Text, TextInput, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { router, usePathname } from "expo-router"

const SearchBar = ({
  placeholder,
  value,
}: {
  placeholder?: string
  value?: string
}) => {
  const [query, setQuery] = useState(value ?? "")
  const pathname = usePathname()

  return (
    <View className="flex-row justify-center items-center px-4 space-x-4 h-12 rounded-xl bg-stone-300">
      <TextInput
        placeholder={placeholder}
        textAlignVertical="center"
        value={query}
        onChangeText={setQuery}
        className="text-base mt-0.5 text-stone-600 flex-1 font-pregular"
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
