import { StyleSheet, Text, View, Image ,Pressable} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const Profile = ({ item, isEven, userId, setProfiles }) => {
  const colors = ["#F0F8FF", "#FFFFFF"];
  const [liked, setLiked] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleLike = async (selectedUserId) => {
    try {
      setLiked(true);
      await axios.post("http://192.168.29.31:8000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setLiked(false);
      }, 200);
    } catch (error) {
      console.log("error liking", error);
    }
  };
  const handleLikeOther = async (selectedUserId) => {
    try {
      setSelected(true);
      await axios.post("http://192.168.29.31:8000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setSelected(false);
      }, 200);

      // Handle success: Perform any UI updates or navigate to another screen
    } catch (error) {
      console.error("Error liking user:", error);
      // Handle error scenarios
    }
  };
  if (isEven) {
    return (
      <View style={{ padding: 12, backgroundColor: "#F0F8FF" }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={{flexDirection:"row",alignItems:"center",gap:50}}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  width: 200,
                  marginBottom: 8,
                  marginTop: 15,
                  fontSize: 18,
                  lineHeight: 24,
                }}
              >
                {item?.description?.length > 160
                  ? item?.description
                  : item?.description.substr(0, 160)}
              </Text>
            </View>
            {item?.profileImages?.slice(0,1).map((item, index) => (
              <Image
                key={index}
                style={{
                  width: 280,
                  height: 280,
                  resizeMode: "cover",
                  borderRadius: 5,
                }}
                source={{ uri: item }}
              />
            ))}
          </View>
        </ScrollView>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Entypo name="dots-three-vertical" size={26} color="black" />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="diamond" size={27} color="#DE3163" />
              </Pressable>

              {liked ? (
                <Pressable
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animatable.View
                    animation="swing"
                    easing={"ease-in-out-circ"}
                    iterationCount={1}
                  >
                    <AntDesign name="heart" size={27} color="red" />
                  </Animatable.View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleLike(item?._id)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="hearto" size={27} color="#FF033E" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 15 }} />
      </View>
    );
  } else {
    return (
        <View style={{ padding: 12, backgroundColor: "#FFFFFF" }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={{flexDirection:"row",alignItems:"center",gap:50}}>
            {item?.profileImages?.slice(0,1).map((item, index) => (
                <Image
                    key={index}
                    style={{
                    width: 280,
                    height: 280,
                    resizeMode: "cover",
                    borderRadius: 5,
                    }}
                    source={{ uri: item }}
                />
                ))}
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  width: 200,
                  marginBottom: 8,
                  marginTop: 15,
                  fontSize: 18,
                  lineHeight: 24,
                }}
              >
                {item?.description?.length > 160
                  ? item?.description
                  : item?.description.substr(0, 160)}
              </Text>
            </View>
            
          </View>
        </ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Entypo name="dots-three-vertical" size={26} color="black" />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Pressable
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="diamond" size={27} color="#DE3163" />
              </Pressable>

              {liked ? (
                <Pressable
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animatable.View
                    animation="swing"
                    easing={"ease-in-out-circ"}
                    iterationCount={1}
                  >
                    <AntDesign name="heart" size={27} color="red" />
                  </Animatable.View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleLike(item?._id)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="hearto" size={27} color="#FF033E" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 15 }} />
      </View>
    );
  }
};

export default Profile;

const styles = StyleSheet.create({});