import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { LOGIN_SCREEN } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://pcmob5-blog-api.kohziyi95.repl.co";
const API_SIGNUP = "/newuser";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function signup() {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await axios.post(API + API_SIGNUP, {
        username,
        password,
      });
      console.log(response.data.Success);
      setMessage(response.data.Success);
      // navigation.navigate(LOGIN_SCREEN);
    } catch (error) {
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up as a new user!</Text>
      <TextInput
        style={styles.inputView}
        placeholder="Email"
        value={username}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={styles.inputView}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await signup();
        }}
      >
        {loading ? (
          <ActivityIndicator style={styles.buttonText} />
        ) : (
          <Text style={styles.buttonText}>Sign Up!</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.errorText}>{errorText}</Text>
      <Text style={{ fontWeight: "400", fontSize: 17, padding: 5}}>{message}</Text>
      <TouchableOpacity>
        <Text
          style={{ fontWeight: "400", fontSize: 17, padding: 5, color: "blue" }}
          onPress={() => {
            navigation.navigate(LOGIN_SCREEN);
            
          }}
        >
          Already have an account? Click here to login!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const SIGNUP_SCREEN = "SIGNUP_SCREEN";

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
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red",
  },
});
