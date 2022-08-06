import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LOGIN_SCREEN, POST_SCREEN } from "../constants";
import axios from "axios";

const API = "https://pcmob5-blog-api.kohziyi95.repl.co";
const API_WHOAMI = "/whoami";
const API_CREATE_POST = "/create";

export default function PostScreen() {
  const navigation = useNavigation();
  // const [username, setUsername] = useState("loading...");  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorText, setErrorText] = useState("");

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

  // useEffect(() => {
  //   const removeListener = navigation.addListener("focus", loadUsername);
  //   loadUsername();
  //   return () => {
  //     removeListener();
  //   };
  // }, []);

  async function create() {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await axios.post(API + API_CREATE_POST, {
        title,
        content,
      });
      navigation.navigate(POST_SCREEN);
    } catch (error) {
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Post!</Text>
      <TextInput
        style={styles.inputView}
        placeholder="Title"
        value={title}
        onChangeText={(title) => setTitle(title)}
      />
      <TextInput
        style={styles.inputView}
        placeholder="Content"
        value={content}
        onChangeText={(content) => setContent(content)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={async () => {
            await create();
          }}
        >
          {loading ? (
            <ActivityIndicator style={styles.buttonText} />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              navigation.navigate(POST_SCREEN);
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
}

export const ADD_SCREEN = "ADD_SCREEN";

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
  addButton: {
    backgroundColor: "#42F74C",
    borderRadius: 15,
    width: "40%",
    marginStart: 10,
    marginEnd: 10,
    // paddingStart: 30,
    // paddingEnd: 30,
  },
  backButton: {
    backgroundColor: "#F74242",
    borderRadius: 15,
    width: "40%",
    marginStart: 10,
    marginEnd: 10,
    // paddingStart: 30,
    // paddingEnd: 30,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  }
});
