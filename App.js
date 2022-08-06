import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, ActivityIndicator, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import AddScreen from "./screens/AddScreen";
import { LOGIN_SCREEN, PROFILE_SCREEN , SIGNUP_SCREEN, POST_SCREEN, ADD_SCREEN} from "./constants";
const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  async function setToken() {
    const token = await AsyncStorage.getItem("token");
    setLoggedIn(token);
    setLoading(false);
  }

  useEffect(() => {
    setToken();
  }, []);

  const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );

  const AppScreen = () => (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={loggedIn ? PROFILE_SCREEN : LOGIN_SCREEN}
        screenOptions={{ animationEnabled: false, headerShown: false }}
      >
        <Stack.Screen component={LoginScreen} name={LOGIN_SCREEN} />
        <Stack.Screen component={SignupScreen} name={SIGNUP_SCREEN} />
        <Stack.Screen component={ProfileScreen} name={PROFILE_SCREEN} />
        <Stack.Screen component={PostScreen} name={POST_SCREEN} />
        <Stack.Screen component={AddScreen} name={ADD_SCREEN} />

      </Stack.Navigator>
    </NavigationContainer>
  );

  return loading ? <LoadingScreen /> : <AppScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
