import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect,useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const UserChat = ({ item, userId }) => {
    const router = useRouter();
    const [messages,setMessages] = useState([]);
    const getLastMessage = () => {
      const n = messages.length;
      return messages[n-1];
    }
    const lastMessage = getLastMessage();

    useEffect(() => {
        fetchMessages();
    }, []);
    
    const fetchMessages = async () => {
      try {
        const senderId = userId;
        const receiverId = item?._id;
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/messages`, {
          params: { senderId, receiverId },
        });
  
        // Assuming messages are stored in state to display in the UI
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Handle error scenarios
      }
    };
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/chat/chatroom",
          params: {
            image: item?.profileImages[0],
            name: item?.name,
            receiverId: item?._id,
            senderId: userId,
          },
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 12,
      }}
    >
      <View>
        <Image
          style={{ width: 60, height: 60, borderRadius: 35 }}
          source={{ uri: item?.profileImages[0] }}
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: "500",
            color: "#DE3163",
            fontSize: 15,
          }}
        >
          {item?.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginTop: 6,
          }}
        >
          {lastMessage ? lastMessage?.message : `Start Chat with ${item?.name}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
