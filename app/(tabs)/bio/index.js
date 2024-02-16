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
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from 'react-native-virtualized-view'
import { Entypo } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

const index = () => {
  const [options, setOptions] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);
  //test data
  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
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
  const renderImageCarousel = ({ item }) => (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{
          width: "85%",
          resizeMode: "cover",
          height: 290,
          borderRadius: 10,
          // transform: [{ rotate: "-5deg" }],
        }}
        source={{ uri: item?.image }}
      />
      <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>
        {activeSlide + 1}/{profileImages.length}
      </Text>
    </View>
  );
  return (
    <ScrollView>
      <View>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/018/977/074/original/animated-backgrounds-with-liquid-motion-graphic-background-cool-moving-animation-for-your-background-free-video.jpg",
          }}
        />
        <View>
          <View>
            <Pressable
              style={{
                padding: 10,
                backgroundColor: "#DDA0DD",
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                // position: "absolute",
                top: -60,
                // left: "50%",
                // transform: [{ translateY: -150 }],
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
                source={{
                  uri: "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                Bangalore
              </Text>
              <Text style={{ marginTop: 4, fontSize: 15 }}>
                22 years 110 days
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
              fontSize: 16,
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
              fontSize: 16,
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
              fontSize: 16,
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
              fontSize: 16,
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
          <View
            style={{
              borderColor: "#202020",
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              height: 300,
              alignItems: "center",
            }}
          >
            <TextInput
              multiline
              style={{ fontSize: 17 }}
              placeholder="Write your AD for people to like you "
              onChangeText={(text) => setDescription(text)}
            />
            <Pressable
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
        )}
      </View>

      <View style={{ marginHorizontal: 14, top: -30 }}>
        {options == "Photos" && (
          <View style={{ top: 30 }}>
            <Carousel
              data={profileImages}
              renderItem={renderImageCarousel}
              sliderWidth={350}
              itemWidth={300}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Text style={{ left: "40%" }}>Swipe left</Text>
            <View style={{ marginTop: 25, gap: 10 }}>
              <Text>Add a picture of yourself</Text>
              <View
                style={{
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
                  style={{ color: "gray", marginVertical: 10, width: 200 }}
                  placeholder="enter your image url"
                />
              </View>
              <Button style={{}} title="Add Image" />
              <View></View>
            </View>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14, top: -30 }}>
        {options == "Turn-ons" && (
        <View>
          {turnons?.map((item, index) => (
              <Pressable
                style={{
                  backgroundColor: "#FFFDD0",
                  padding: 10,
                  marginVertical: 10,
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
                      fontSize: 15,
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {item?.name}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 15,
                    color: "gray",
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

      <View style={{ marginHorizontal: 14, top: -30  }}>
        {options == "Looking for" && (
          <>
            <View>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      padding: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 150,
                      margin: 10,
                      borderRadius: 5,
                      borderColor: "#fd5c63",
                      borderWidth: 0.7,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: 13,
                        color: "black",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 13,
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
