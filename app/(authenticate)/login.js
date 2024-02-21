import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try{
        const token = await AsyncStorage.getItem("auth");
        if(token){
          router.replace("/(tabs)/bio")
        }
      }catch(e){
        console.log("Error asyncstorage",e);
      }
    };
    checkLoginStatus();
  },[]);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/login`, user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        const gender = response.data.gender;
        AsyncStorage.setItem("auth", token);
        if(gender){
          router.replace("/(tabs)/bio");
        }else{
          router.replace("/select");
        }
      })
      .catch((e) => {
        console.log(e);
        console.log("Invalid email or password");
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ width: "100%", height: 200, backgroundColor: "pink" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Image
            style={{
              width: 150,
              height: 80,
              resizeMode: "contain",
              marginTop: 10,
            }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/6655/6655045.png",
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 20,
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          XMATCH
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 25,
              color: "#F9629F",
            }}
          >
            Log in to your Account
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 100, height: 80, resizeMode: "cover" }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2509/2509078.png",
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFC0CB",
              paddingVertical: 5,
              borderRadius: 20,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(val) => setEmail(val)}
              placeholder="Enter your Email"
              placeholderTextColor={"black"}
              style={{
                color: "black",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
            />
          </View>
        </View>
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFC0CB",
              paddingVertical: 5,
              borderRadius: 20,
              marginTop: 30,
            }}
          >
            <Entypo
              style={{ marginLeft: 8 }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChangeText={(val) => setPassword(val)}
              placeholder="Enter your Password"
              secureTextEntry={true}
              placeholderTextColor={"black"}
              style={{
                color: "black",
                marginVertical: 10,
                width: 300,
                fontSize: 17,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
          <View style={{ marginTop: 30 }} />
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 100,
              backgroundColor: "pink",
              padding: 15,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                color: "black",
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 12 }}
            onPress={() => {
              router.replace("/register");
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center", color: "gray" }}>
              Don't have an account ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
