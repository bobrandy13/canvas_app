import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Theme } from "tamagui";
import CourseCard from "./Components/CourseCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import card from "./card";
import { NavigationContainer } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchCourses from "./utils/fetchCourses";
import { ScrollView } from "react-native-gesture-handler";
const BASE_URL =
  "https://cths.instructure.com/api/v1/courses?enrollment_type=student&enrollment_state=active&per_page=100&";

const fetchCoursesTemp = async () => {
  let return_obj = {};
  const data = await fetch(
    BASE_URL + "access_token=" + process.env.CANVAS_API_TOKEN,
  );
  const response = await data.json();
  return response;
};
const Stack = createNativeStackNavigator();

export default function CoursesPage({ navigation }) {
  const [showAllCourses, setShowCoursesState] = useState<boolean>(true);
  const [wantedCourses, setCourses] = useState([
    "12IPT242",
    "12ISC243",
    "12SDD242",
    "12MTZ241",
    "12ENA2411",
    "12YR241",
  ]);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCoursesTemp,
  });
  if (isError)
    return (
      <View>
        <Text>Request failed</Text>
      </View>
    );
  if (isLoading) {
    console.log("LOADING LOADING LOADING");
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isSuccess) {
    console.log("LOTS OF SUCESS");
    console.log("dat");
  }

  // const [isLoading, setLoadingState] = useState(true);
  // const [data, setData] = useState([]);

  //TOOD: Get id of this use effect
  // useEffect(() => {
  //   fetchCourses("pdotdato");
  // }, []);

  return (
    // <View style={{ width: "100%", height: "100%" }}>

    <ScrollView>
      <View style={styles.container}>
        {data.length > 0 && (
          // <Stack.Navigator>
          <View
            style={{
              flex: 1,
              // gap: 100,
              backgroundColor: "black",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              height: "100%",
              // position: "relative",
              width: "100%",
              alignContent: "center",
              // gap: 10,
              // backgroundColor: "black",
            }}
          >
            {data.map((value, key) => {
              // return <Stack.Screen name={value.name} component={card} />;
              return (
                <CourseCard
                  route={value.name}
                  routeData={value}
                  key={key}
                  navigate={navigation}
                />
              );
            })}
          </View>
          // </Stack.Navigator>
        )}
      </View>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  text_color: {
    color: "white",
  },
  course_card: {
    color: "white",
  },
  container: {
    // display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "white",
  },
});
