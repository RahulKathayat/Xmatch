import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";
import Profile from "../../../components/Profile";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserDescription = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`
        );
        const user = response.data;
        setUser(user?.user);
      } catch (error) {
        console.log("Error fetching user description", error);
      }
    };
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/profiles`, {
          params: {
            userId: userId,
            gender: user?.gender,
            turnOns: user?.turnOns,
            lookingFor: user?.lookingFor,
          },
        });
        setProfiles(response.data.profiles);
      } catch (error) {
        console.log("Error fetching profiles", error);
      }
    };
    if (userId && user) {
      fetchProfiles();
    }
  }, [user, userId]);

  console.log(profiles);
  return (
    <View style={{ flex: 1 ,marginTop:30}}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Profile
            key={userId}
            item={item}
            userId={userId}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
