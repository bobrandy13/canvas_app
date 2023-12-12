import { useEffect, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Card, H2, H3, H5 } from "tamagui";
import Annoucements from "./Components/Annoucements";
import { ScrollView } from "react-native-gesture-handler";
import AssignemntModal from "./Components/AssignmentModal";
import { CanvasModules } from "./CanvasModules";
import { useQueryClient, useQuery } from "@tanstack/react-query";
// https://cths.instructure.com/api/v1/courses/14480/preview_html&access_token=11644~TKNjsGpTONBSrszQ3hbh34K9L5iYfwEJW4KqrbFHt6cs51BGWmmQ0mFUwByuvyh1
const fetchAssignments = async (course_id) => {
  const url = `https://cths.instructure.com/api/v1/courses/${course_id}/assignments?access_token=11644~TKNjsGpTONBSrszQ3hbh34K9L5iYfwEJW4KqrbFHt6cs51BGWmmQ0mFUwByuvyh1&per_page=100`;
  const data = await fetch(url);
  const resopnse = await data.json();
  return resopnse;
};

function CourseLandingPage({ route, navigation }) {
  const { courseData, courseName } = route.params;
  console.log(courseData["id"]);
  const [openPage, setOpenPage] = useState("annoucements");
  const queryClient = useQueryClient();
  const [assignemnts, setAssignemnts] = useState<Array<Object>>();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignments(courseData["id"]),
  });
  if (isSuccess) console.log(data);

  // replace all the use effects with react query so that it doesnt render on every single page load but instead after a while
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        flex: 1,
        flexDirection: "row",
      }}
    >
      {/* <Text style={{ color: "white" }}>{courseName}</Text> */}
      <View
        style={{
          height: "100%",
          // flexGrow: 1,
          flexBasis: "25%",
          backgroundColor: "#202020",
          padding: 10,
        }}
      >
        {["annoucements", "assignments", "modules", "pages"].map(
          (value, key) => {
            return (
              <Pressable
                onPress={() => {
                  setOpenPage(value);
                  console.log(openPage);
                }}
                style={{
                  width: "100%",
                  height: "10%",
                  margin: 4,
                  backgroundColor: "black",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>{value}</Text>
              </Pressable>
            );
          },
        )}
      </View>
      <View
        style={{
          height: "100%",
          // flexGrow: 4,
          flexBasis: "75%",
          backgroundColor: "black",
          padding: 3,
        }}
      >
        <ScrollView>
          {data && openPage == "assignments" ? (
            data.map((assignment, key) => {
              return (
                <Card key={key} style={{ margin: 3 }}>
                  <Card.Header>
                    <AssignemntModal
                      assignment={assignment}
                      name={assignment.name}
                    />
                  </Card.Header>
                </Card>
              );
            })
          ) : openPage == "annoucements" ? (
            <Annoucements course_id={courseData["id"]} />
          ) : openPage == "modules" ? (
            <CanvasModules course_id={courseData["id"]} />
          ) : (
            <Text>Loading</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default CourseLandingPage;
