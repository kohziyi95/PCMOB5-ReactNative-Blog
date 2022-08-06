import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LOGIN_SCREEN } from "../constants";
import axios from "axios";

const API = "https://pcmob5-blog-api.kohziyi95.repl.co";
const API_WHOAMI = "/whoami";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("loading...");

  async function loadUsername() {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const removeListener = navigation.addListener("focus", loadUsername);
    loadUsername();
    return () => {
      removeListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
        Your Username: {username}
      </Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(LOGIN_SCREEN);
          AsyncStorage.removeItem("token");
          setUsername("loading...");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export const PROFILE_SCREEN = "PROFILE_SCREEN";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
    padding: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
  outlinedButtonText: {
    textAlign: "center",
    fontWeight: "6400",
    fontSize: 12,
    padding: 15,
    color: "black",
  },
});
