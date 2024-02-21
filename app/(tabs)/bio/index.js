import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  const [options, setOptions] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [userId, setUserId] = useState("");
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  //test data
  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];
  const turnons = [
    {
      id: "0",
      name: "Music",
      description: "Pop Rock-Indie pick our sound track",
    },
    {
      id: "10",
      name: "Kissing",
      description:
        " It's a feeling of closeness, where every touch of lips creates a symphony of emotions.",
    },
    {
      id: "1",
      name: "Fantasies",
      description:
        "Fantasies can be deeply personal, encompassing diverse elements such as romance",
    },
    {
      id: "2",
      name: "Nibbling",
      description:
        "playful form of biting or taking small, gentle bites, typically done with the teeth",
    },
    {
      id: "3",
      name: "Desire",
      description: "powerful emotion or attainment of a particular person.",
    },
  ];
  const data = [
    {
      id: "0",
      name: "Casual",
      description: "Let's keep it easy and see where it goes",
    },
    {
      id: "1",
      name: "Long Term",
      description: "How about a one life stand",
    },
    {
      id: "2",
      name: "Virtual",
      description: "Let's have some virtual fun",
    },
    {
      id: "3",
      name: "Open for Anything",
      description: "Let's Vibe and see where it goes",
    },
  ];
  const updateUserDescription = async () => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/description`,
        { description: description }
      );
      console.log(response.data);
      if (response.status === 200) {
        Alert.alert("Success", "User description updated successfully");
      }
    } catch (e) {
      console.log("error updating the user description", e);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`
      );
      const user = response.data;

      setDescription(user?.user?.description);
      setSelectedTurnOns(user.user?.turnOns);
      setImages(user?.user.profileImages);
      setLookingOptions(user?.user.lookingFor);
      setName(user?.user?.name);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
  const handleAddImage = async () => {
    try {
      if (imageUrl.length > 0) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/profile-images`,
          {
            imageUrl: imageUrl,
          }
        );
        console.log(response);
        setImageUrl("");
      }
      else{

        console.log("imageurl is empty");
      }
    } catch (error) {
      console.log("error aya h", error);
    }
  };
  const addLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/looking-for`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setLookingOptions([...lookingOptions, lookingFor]);
      }
    } catch (error) {
      console.log("Error addding looking for", error);
    }
  };
  const removeLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/looking-for/remove`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data); // Log the response for confirmation

      // Handle success or update your app state accordingly
      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
      // Handle error scenarios
    }
  };
  const handleOption = (lookingFor) => {
    if (lookingOptions.includes(lookingFor)) {
      removeLookingFor(lookingFor);
    } else {
      addLookingFor(lookingFor);
    }
  };
  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn on", error);
    }
  };
  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn on", error);
    }
  };
  const handleToggleTurnOn = (turnOn) => {
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  };
  const renderImageCarousel = ({ item, index }) => (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{
          width: "85%",
          resizeMode: "cover",
          height: 290,
          borderRadius: 20,
          // transform: [{ rotate: "-5deg" }],
        }}
        source={{ uri: item }}
      />
      <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>
        {index + 1}/{images.length}
      </Text>
    </View>
  );
  return (
    <ScrollView style={{ backgroundColor: "#EDF1FF" }}>
      <View>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg",
          }}
        />
        <View>
          <View>
            <Pressable
              // onPress={() => {
              //   AsyncStorage.clear();
              //   router.replace("/(authenticate)/login");
              // }}
              style={{
                padding: 10,
                backgroundColor: "#BCB4F6",
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
                top: -60,
                borderWidth: 1,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "black",
                  resizeMode: "cover",
                }}
                source={{
                  uri: images[0],
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 6,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {name.toUpperCase()}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          top: -40,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 25,
        }}
      >
        <Pressable onPress={() => setOptions("AD")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: options == "AD" ? "#007FFF" : "gray",
            }}
          >
            AD
          </Text>
        </Pressable>
        <Pressable onPress={() => setOptions("Photos")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: options == "Photos" ? "#007FFF" : "gray",
            }}
          >
            Photos
          </Text>
        </Pressable>
        <Pressable onPress={() => setOptions("Turn-ons")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: options == "Turn-ons" ? "#007FFF" : "gray",
            }}
          >
            Turn-ons
          </Text>
        </Pressable>
        <Pressable onPress={() => setOptions("Looking for")}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: options == "Looking for" ? "#007FFF" : "gray",
            }}
          >
            Looking for
          </Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 14, top: -30 }}>
        {options == "AD" && (
          <View style={{ alignItems: "center", justifyContent: "center" ,flex:1}}>
            <View
              style={{
                borderColor: "#202020",
                padding: 10,
                borderWidth: 1,
                borderRadius: 30,
                height: 400,
                alignItems: "center",
                backgroundColor: "#F8E8F3",
              }}
            >
              <TextInput
                value={description}
                multiline
                style={{ fontSize: 17 }}
                placeholder="Write your AD for people to like you "
                onChangeText={(text) => setDescription(text)}
              />
              <Pressable
                onPress={updateUserDescription}
                style={{
                  marginTop: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: "black",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 5,
                  width: 250,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Publish in Feed
                </Text>
                <Entypo name="mask" size={24} color="white" />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                AsyncStorage.clear();
                router.replace("/(authenticate)/login");
              }}
              style={{ width: 100, height: 40, backgroundColor: "#EB455F" ,marginTop:15,borderRadius:20,alignItems:"center",justifyContent:"center"}}
            >
              <Text style={{fontWeight:"bold",fontSize:15,color:"white"}}>Log Out</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14, top: -30 }}>
        {options == "Photos" && (
          <View style={{ top: 30 }}>
            <Carousel
              data={images}
              renderItem={renderImageCarousel}
              sliderWidth={400}
              itemWidth={300}
              // onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={{ marginTop: 25, gap: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Add a picture of yourself
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  backgroundColor: "#DCDCDC",
                }}
              >
                <Entypo
                  style={{ marginLeft: 8 }}
                  name="image"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={imageUrl}
                  onChangeText={(val) => setImageUrl(val)}
                  style={{ color: "gray", marginVertical: 10, width: 200 }}
                  placeholder="enter your image url"
                />
              </View>
              <TouchableOpacity
                onPress={handleAddImage}
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor: "#b9936c",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                >
                  Add Image
                </Text>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14, top: -30, alignItems: "center" }}>
        {options == "Turn-ons" && (
          <View>
            {turnons?.map((item, index) => (
              <Pressable
                onPress={() => handleToggleTurnOn(item?.name)}
                style={{
                  backgroundColor: "#f9d5e5",
                  padding: 10,
                  marginVertical: 10,
                  width: 380,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "brown",
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {item?.name.toUpperCase()}
                  </Text>
                  {selectedTurnOns.includes(item?.name) && (
                    <AntDesign name="checkcircle" size={24} color="#17B169" />
                  )}
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 16,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {item?.description}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14, top: -30 }}>
        {options == "Looking for" && (
          <>
            <View>
              <FlatList
                columnWrapperStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleOption(item?.name)}
                    style={{
                      backgroundColor: lookingOptions.includes(item?.name)
                        ? "#C979AC"
                        : "white",
                      padding: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 180,
                      margin: 10,
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 0.7,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: 15,
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item?.name.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "gray",
                        textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.description}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
