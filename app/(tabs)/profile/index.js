import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";

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
          `http://192.168.29.31:8000/users/${userId}`
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
        const response = await axios.get(`http://192.168.29.31:8000/profiles`, {
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
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
