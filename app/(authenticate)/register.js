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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.1.103:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registered Successfully",
          "You have been registered successfully",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("Error registering the user ", error);
        Alert.alert(
          "Registration Failes",
          "An error occured while registering",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
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
            Register your Account
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
            <Ionicons
              style={{ marginLeft: 8 }}
              name="person-sharp"
              size={24}
              color="black"
            />
            <TextInput
              value={name}
              onChangeText={(val) => setName(val)}
              placeholder="Enter your name"
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

          <View style={{ marginTop: 30 }} />
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              width: 130,
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
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 12 }}
            onPress={() => {
              router.replace("/login");
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center", color: "gray" }}>
              Already have an account ? Log In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
