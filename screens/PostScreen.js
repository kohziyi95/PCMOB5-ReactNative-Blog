import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LOGIN_SCREEN, PROFILE_SCREEN, ADD_SCREEN } from "../constants";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const API = "https://pcmob5-blog-api.kohziyi95.repl.co";
const API_WHOAMI = "/whoami";
const API_GET_ALL_POSTS = "/posts";

export default function PostScreen() {
  const navigation = useNavigation();
  // const [username, setUsername] = useState("loading...");
  const [errorText, setErrorText] = useState("");
  const [posts, setPosts] = useState([]);

  // async function loadUsername() {
  //   const token = await AsyncStorage.getItem("token");
  //   try {
  //     const response = await axios.get(API + API_WHOAMI, {
  //       headers: { Authorization: `JWT ${token}` },
  //     });
  //     setUsername(response.data.username);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  async function loadPosts() {
    try {
      const response = await axios.get(API + API_GET_ALL_POSTS, {}); 
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      setErrorText(error.response.data);
    }
  }

  useEffect(() => {
    const removeListener = navigation.addListener("focus", loadPosts);
    loadPosts();
    return () => {
      removeListener();
    };
  }, []);

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ fontSize: 20, marginTop: 5, }}>{item.content}</Text>
        {/* <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={20} color="#944" />
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      <FlatList data={posts} renderItem={renderItem} keyExtractor={item=>item.id}/>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ADD_SCREEN);
        }}
      >
        <Text style={styles.buttonText}>Add a New Post!</Text>
      </TouchableOpacity>
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

export const POST_SCREEN = "POST_SCREEN";

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
