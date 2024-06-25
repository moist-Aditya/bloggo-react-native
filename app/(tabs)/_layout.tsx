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
      <Text
        className={`text-xs font-psemibold ${focused ? "" : "text-stone-500"}`}
      >
        {title}
      </Text>
    </View>
  )
}

export default function TabLayout() {
  const { isLoggedIn } = useGlobalContext()

  if (!isLoggedIn) return Redirect({ href: "/" })

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          minHeight: 60,
          backgroundColor: "#fafaf9",
          borderTopWidth: 1,
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
