import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchCourses from "./utils/fetchCourses";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { Button, SafeAreaView, Alert } from "react-native";
import config from "./tamagui.config";
import CoursesPage from "./Courses";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import CourseLandingPage from "./CourseLandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CourseCard from "./Components/CourseCard";
// import ClassScreen from "./ClassScreen";

// function HomeScreen({ navigation }) {
//   console.log(navigation);
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "black",
//       }}
//     >
//       <Button title="Press me" onPress={() => navigation.navigate("Class")} />
//     </View>
//   );
// }

const queryClient = new QueryClient();

function HomeScreen({ navigation }) {
  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        {/* <SafeAreaView style={styles.container}> */}
        {/* <CoursesPage /> */}
        {/* <Button
            title="Go to courses"
            onPress={() => navigation.navigate("Class")}
          /> */}
        <View
          style={{ backgroundColor: "black", width: "100%", height: "100%" }}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Not Home"
                component={CoursesPage}
                options={{
                  headerTintColor: "purple",
                  headerStyle: {
                    backgroundColor: "black",
                    shadowColor: "black",
                  },
                  headerTitleStyle: {
                    color: "white",
                  },
                }}
              />
              <Stack.Screen
                name="landingPage"
                component={CourseLandingPage}
                options={{
                  headerStyle: {
                    backgroundColor: "#101010",
                    borderTopWidth: 0,
                    shadowColor: "transparent",
                  },
                  headerTitleStyle: {
                    color: "white",
                  },
                  headerTintColor: "white",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <StatusBar style="auto" />
        {/* </SafeAreaView> */}
      </Theme>
    </TamaguiProvider>
  );
}

function ClassScreen({ navigation }) {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/Inter-Regular.ttf"),
    Inter: require("./assets/Inter-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <HomeScreen />
        {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Class" component={ClassScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  course_View: {
    backgroundColor: "black",
    flex: 1,
  },
});
