import { useGlobalContext } from "@/context/GlobalProvider"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { Redirect, Stack, Tabs } from "expo-router"
import { Text, View } from "react-native"

const TabIcon = ({
  icon,
  title,
  color,
  focused,
}: {
  icon: string
  title: string
  color: string
  focused: boolean
}) => {
  return (
    <View className="items-center justify-center gap-1">
      <Feather name={icon as any} size={32} color={color} />
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
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon title="Home" icon="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title="Create"
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
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              title="Profile"
              icon="user"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  )
}
