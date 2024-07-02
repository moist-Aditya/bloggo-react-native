import { useGlobalContext } from "@/context/GlobalProvider"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Redirect, Tabs } from "expo-router"
import { Text, View } from "react-native"

const TabIcon = ({
  icon,
  title,
  size,
  color,
  focused,
}: {
  icon: string
  title: string
  size: number
  color: string
  focused: boolean
}) => {
  return (
    <View className="items-center justify-center gap-1">
      <MaterialCommunityIcons name={icon as any} size={size} color={color} />
      <Text style={{ color }} className={`text-xs font-psemibold`}>
        {title}
      </Text>
    </View>
  )
}

export default function TabLayout() {
  const { isLoggedIn, isDark } = useGlobalContext()

  if (!isLoggedIn) return Redirect({ href: "/" })

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "white" : "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          minHeight: 60,
          backgroundColor: isDark ? "#0c0a09" : "#fafaf9",
          borderTopWidth: 1,
          borderColor: isDark ? "#44403c" : "white",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              title="Home"
              size={size}
              icon="home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              title="Create"
              size={size}
              icon="plus-circle"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              title="Profile"
              size={size}
              icon="account"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}
