import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={()=>({
      tabBarStyle:{
        backgroundColor:"#F3F8FF",
      }
    })}>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profiles",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye" size={24} color="gray" />
            ),
            tabBarActiveTintColor:"black",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="gray"
              />
            ),
            tabBarActiveTintColor:"black",
        }}
      />
      <Tabs.Screen
        name="bio"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Octicons name="person" size={24} color="black" />
            ) : (
              <Octicons name="person" size={24} color="gray" />
            ),
            tabBarActiveTintColor:"black",
        }}
      />
    </Tabs>
  );
}
