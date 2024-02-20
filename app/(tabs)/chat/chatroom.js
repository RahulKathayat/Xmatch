import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";
import {io} from "socket.io-client";

const chatroom = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    const socket = io("http://192.168.29.31:3000");
    setSocket(socket);

    socket.on("connect" , ()=>{
      console.log("connected to the Socket.IO server");
    });

    socket.on("receiveMessage", (newMessage)=>{
      console.log("received message",newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.emit('setUserID', params?.senderId);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };

  },[params?.senderId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{ uri: params?.image }}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {params?.name}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
          <Ionicons name="videocam-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const sendMessage = async (senderId,receiverId) =>{
    if (socket && message.trim() !== '') {
        socket.emit('sendMessage',{senderId,receiverId,message});
        setMessage("");
        //call the fetch message function to see the ui being updated
        setTimeout(() => {
          fetchMessages();
        },200);
    }
  }
  const fetchMessages = async () => {
    try{
      const senderId = params?.senderId;
      const receiverId = params?.receiverId;

      const response = await axios.get("http://192.168.29.31:8000/messages",{
        params:{
          senderId,receiverId
        }
      });
      setMessages(response.data);

    }catch(e){
      console.log("Failed to fetch messagess",e);
    }
  };
  useEffect(() =>{
    fetchMessages();
  },[]);
  
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {messages?.map((item, index) => (
          <Pressable
            style={[
              item?.senderId === params?.senderId
                ? {
                    alignSelf: "flex-end",
                    backgroundColor: "#F08080",
                    padding: 8,
                    maxWidth: "60%",
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: "flex-start",
                    backgroundColor: "#DB7093",
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: "60%",
                  },
            ]}
          >
            <Text style={{ fontSize: 13, textAlign: "left", color: "white",fontWeight:"500" }}>
              {item?.message}
            </Text>
            <Text style={{fontSize:9,textAlign:"right",color:"#F0F0F0",marginTop:5}}>
              {formatTime(item?.timestamp)}
            </Text>

          </Pressable>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: 1,
        }}
      >
        <Entypo
          style={{ marginRight: 7 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 8,
          }}
        >
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <TouchableOpacity
          onPress={() => sendMessage(params?.senderId, params?.receiverId)}
          style={{
            backgroundColor: "#007bff",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default chatroom;

const styles = StyleSheet.create({});
