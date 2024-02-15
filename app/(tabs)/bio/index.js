import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

const index = () => {
  const [options, setOptions] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide,setActiveSlide] = React.useState(0);
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
      <Text
        style={{ color: "black" , fontSize:17,fontWeight:"500"}}
      >
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
        {
          options == "Photos" && (
          <View style={{top:30}}>
            <Carousel
              data={profileImages}
              renderItem={renderImageCarousel}
              sliderWidth={350}
              itemWidth={300}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Text style={{left:"40%"}}>Swipe left</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
