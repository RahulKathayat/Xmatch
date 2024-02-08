import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";

const index = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Feather name="eye" size={24} color="black" />
    </View>
  )
}

export default index

const styles = StyleSheet.create({})