import { StyleSheet, TouchableOpacity } from "react-native";
import CourseCard from "./Components/CourseCard";

const CourseCardView = ({ navigation, route }) => {
  console.log(route);
  return (
    <TouchableOpacity
    // key={key}
    //   style={styles.course_card}
    // onPress={() => hideCourse(value.name)}
    >
      {/* <Text key={key} style={styles.text_color}>
                    {value.name}
                  </Text> */}
      <CourseCard route={route} />
    </TouchableOpacity>
  );
};
export default CourseCardView;

const styles = StyleSheet.create({
  text_color: {
    color: "white",
  },
  course_card: {
    color: "white",
  },
  container: {
    display: "flex",
    justifycontent: "center",
    alignitems: "center",
    flexWrap: "wrap",
    backgroundColor: "black",
  },
});
